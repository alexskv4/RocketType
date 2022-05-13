<script>
    import FinishedModal from "./FinishedModal.svelte";

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


    let inputClass= "valid";
    let validText="";
    let invalidText="";
    let untypedText="";
    let quote = "";
    let currentText;
    let percentageTyped = 0;
    let hasError = false;
    let inputElement;



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
            quote = json[0].quoteText;
            untypedText = quote;
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

    function checkValid() {
        if (currentText.length == 1) {
            startTime = new Date().getTime();
        }
        if (currentText == quote) {
            endTime = new Date().getTime();
            totalTime = endTime - startTime;
            millisecToWpm();
            percentageAccuracy = (100 - errorCount / quote.length * 100).toFixed(1);
            showPopup = true;
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
	</div>
</main>
<FinishedModal percentageAccuracy={percentageAccuracy} errorCount={errorCount} wpm={wpm} open={showPopup} onClosed={(retry) => onPopupClose(retry)}/>

<style>
    .quote {
        margin-top: 10px;
    }
    .buttonRow {
        justify-content: center;
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
		padding-top: 10%;
	}
    #typingInput {
        font-size: larger;       
    }
    p {
        font-size: x-large;
    }
</style>