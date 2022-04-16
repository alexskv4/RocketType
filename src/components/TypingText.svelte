<script>
    import FinishedModal from "./FinishedModal.svelte";

    //export let quote = "We all get lost once in a while, sometimes by choice, sometimes due to forces beyond our control. When we learn what it is our soul needs to learn, the path presents itself. Sometimes we see the way out but wander further and deeper despite ourselves; the fear, the anger or the sadness preventing us returning. Sometimes we prefer to be lost and wandering, sometimes it's easier. Sometimes we find our own way out. But regardless, always, we are found."
    export let quote = "The quick brown fox jumped over the lazy dog."
    //export let quote = "They don't know that we know they know we know.";
    //export let quote = "abc";

    let showPopup = false;
    let startTime;
    let endTime;
    let totalTime;
    let wpm;
    let currentText;
    let inputClass= "valid";
    let validText="";
    let invalidText="";
    let untypedText=quote;

    function onPopupClose () {
        showPopup = false;
        reset();
    }
    
    function reset () {

        currentText = "";
        validText = "";
        invalidText = "";
        untypedText = quote;

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
                break;
            }
            untypedText = quote.substring(i+1);
        }


        // else if ( currentText != quote.substring(0, currentText.length)) {
        //     inputClass = "invalid";
        //     invalidText += untypedText.substring(0, 1);
        // }
        // else {
        //     inputClass = "valid";
        //     validText += untypedText.substring(0, 1);
        // }
        // untypedText = untypedText.substring(1);
    }

</script>

<main class="container typingBox">
	<div class="col">
		<div class="row">
            <p><span class="valid">{validText}</span><span class="invalid">{invalidText}</span>{untypedText}</p>
        </div>
		<div class="row">
            <input class={inputClass} id="typingInput" bind:value={currentText} on:input={(e) => checkValid()}/>
        </div>
	</div>
</main>
<FinishedModal wpm={wpm} open={showPopup} onClosed={() => onPopupClose()}/>

<style>
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