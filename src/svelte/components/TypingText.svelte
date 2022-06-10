<script>
    import FinishedModal from "./FinishedModal.svelte";
    import RaceHistory from "./RaceHistory.svelte";

    //let quote = "We all get lost once in a while, sometimes by choice, sometimes due to forces beyond our control. When we learn what it is our soul needs to learn, the path presents itself. Sometimes we see the way out but wander further and deeper despite ourselves; the fear, the anger or the sadness preventing us returning. Sometimes we prefer to be lost and wandering, sometimes it's easier. Sometimes we find our own way out. But regardless, always, we are found."
    //let quote = "The quick brown fox jumped over the lazy dog."
    //let quote = "They don't know that we know they know we know.";
    //let quote = "abc";

    let showPopup = false;
   
    let startTime;
    let endTime;
    let totalTime;
    let wpm;
    let errorCount = 0;
    let percentageAccuracy;
    let quoteId;

    let recentRaces=[];

    let avgWPM;
    let avgAcc;

    let inputClass= "valid";
    let validText="";
    let invalidText="";
    let untypedText="";
    let quote = "";
    let currentText;
    let percentageTyped = 0;
    let hasError = false;
    
    let inputElement;
    
    export let username;
    export let loggedIn;

    $: if (loggedIn) {
        updateRecentRaces();
    }
    else {
        //username = "";
        recentRaces=[];
    }

    function getAverages () {
        avgAcc = 0;
        avgWPM = 0;
        for (let i = 0; i < recentRaces.length; i++) {
            avgAcc += parseInt(recentRaces[i].percentageAccuracy);
            avgWPM += parseInt(recentRaces[i].wpm);
        }
        avgWPM = ((avgWPM + 0.5) / recentRaces.length).toFixed(2);
        avgAcc = ((avgAcc + 0.5) / recentRaces.length).toFixed(2);
    }

    function updateRecentRaces () {
        let data = {
            username: username
        }
        let strData = JSON.stringify(data);

        fetch("users/recentRaces", {method: "POST", headers:{"Content-Type": "application/json"}, body:strData})
        .then(res => res.json())
        .then((data) => {
            recentRaces = data;
        })
        .then(() => getAverages());
    }

    function postRaceResult () {

        let data = {
            username: username, 
            wpm: wpm, 
            percentageAccuracy: percentageAccuracy, 
            startTime: startTime, 
            endTime: endTime,
            errorCount: errorCount,
            quoteId: quoteId,

        }
        let strData = JSON.stringify(data);

        fetch("/users/postRace", {method: "POST", headers:{"Content-Type": "application/json"}, body: strData})
        .then((res) => {
            if (res.status == "200") {
                console.log("Race post OK")
            }
            else {
                console.error("something went wrong posting race" + res.status)
            }
        })
    }

    function focusEl (element) {
        element.focus();
    }

    function checkForTab(e) {
        if (e.key == "Tab") {
            e.preventDefault();
            reset();
            randomQuote();
        }
    }

    function randomQuote () {
        fetch("quotes/random")
        .then(res => res.json())
        .then((json) => {
            quote = json[0].text;
            untypedText = quote;
            quoteId = json[0]._id;
        })
    }

    function onPopupClose (retry) {
        showPopup = false;
        if(!retry){
            randomQuote();
        }
        reset();
    }
    
    function reset () {
        currentText = "";
        validText = "";
        invalidText = "";
        untypedText = quote;
        inputClass = "valid";
        percentageTyped = 0;
        errorCount = 0;
        percentageAccuracy = 0;
        inputElement.focus();
    }

    function millisecToWpm () {
        console.log(totalTime);
        var secs = totalTime / 1000;
        var mins = secs / 60.0;

        wpm = (quote.length / 5.0 / mins).toFixed(1);
        console.log(wpm);
    }

    async function checkValid() {
        if (currentText.length == 0) {
            reset();
        }
        if (currentText.length == 1) {
            startTime = new Date().getTime();
        }
        if (currentText == quote) {
            endTime = new Date().getTime();
            totalTime = endTime - startTime;
            millisecToWpm();
            percentageAccuracy = (100 - errorCount / quote.length * 100).toFixed(1);
            showPopup = true;
            if(loggedIn) {
                await (postRaceResult());
                updateRecentRaces();
            }
        }

        validText = "";
        invalidText = "";
        untypedText = quote;
        for (var i = 0; i < currentText.length; i++) {

            if (currentText.charAt(i) == quote.charAt(i)) {
                validText += quote.charAt(i);
                inputClass = "valid";
            }
            else {
                invalidText += quote.substring(i, currentText.length);
                untypedText = quote.substring(currentText.length )
                inputClass = "invalid";
                if(!hasError) {
                    errorCount += 1;
                }
                hasError = true;
                break;
            }
            untypedText = quote.substring(i+1);
        }
        percentageTyped = parseInt(validText.length / quote.length * 100);
        
        if (invalidText.length == 0) {
            hasError = false;
        }
    }
    randomQuote();
</script>

<main class="container typingBox">
	<div class="col">
        <div class="row progress">
            <div class="progress-bar" style="width: {percentageTyped}%" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
		<div class="row quote">
            <p><span class="valid">{validText}</span><span class="invalid">{invalidText}</span>{untypedText}</p>
        </div>
		<div class="row">
            <input use:focusEl bind:this={inputElement} class={inputClass} id="typingInput" bind:value={currentText} on:paste={(e) => e.preventDefault()} on:keydown={(e) => checkForTab(e)} on:input={() => checkValid()}/>
        </div>
        <div class="row buttonRow">
            <button class="btn btn-primary btn-lg nextButton" on:click={() => {reset(); randomQuote();}}>Next Quote</button>
        </div>
        <div class="row raceHistoryRow">
            <RaceHistory avgAcc={avgAcc} avgWPM={avgWPM} bind:races={recentRaces} bind:loggedIn={loggedIn}/>
        </div>
	</div>
</main>
<FinishedModal percentageAccuracy={percentageAccuracy} errorCount={errorCount} wpm={wpm} open={showPopup} onClosed={(retry) => onPopupClose(retry)}/>

<style>
    .raceHistoryRow {
        align-content: center;
        justify-content: center;
    }
    .quote {
        margin-top: 10px;
    }
    .buttonRow {
        justify-content: center;
        margin-bottom: 5%;
    }
    .nextButton {
        margin-top: 10px;
        max-width: 20%;
    }
    span.invalid {
        color: red;
        background-color: pink;
    }
    span.valid {
        color: green;
        background-color: lightgreen;
    }
    input.invalid {
        background-color: coral;
    }
    input.valid {
        background-color: white;
    }
    .typingBox {
		padding-top: 5%;
	}
    #typingInput {
        font-size: larger;       
    }
    p {
        font-size: x-large;
    }
</style>