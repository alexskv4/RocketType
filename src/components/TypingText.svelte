<script>
    import FinishedModal from "./FinishedModal.svelte";

    //export let quote = "We all get lost once in a while, sometimes by choice, sometimes due to forces beyond our control. When we learn what it is our soul needs to learn, the path presents itself. Sometimes we see the way out but wander further and deeper despite ourselves; the fear, the anger or the sadness preventing us returning. Sometimes we prefer to be lost and wandering, sometimes it's easier. Sometimes we find our own way out. But regardless, always, we are found."
    //export let quote = "The quick brown fox jumped over the lazy dog."
    export let quote = "They don't know that we know they know we know.";

    let showPopup = false;
    let startTime;
    let endTime;
    let totalTime;
    let wpm;


    function onPopupClose () {
        showPopup = false;
        var inputBox = document.getElementById("typingInput");
        inputBox.value = "";
    }
    
    function millisecToWpm () {
        console.log(totalTime);
        var secs = totalTime / 1000;
        var mins = secs / 60.0;

        wpm = (quote.length / 5.0 / mins).toFixed(1);
        console.log(wpm);
    }

    function checkValid() {
        var inputBox = document.getElementById("typingInput");
        console.log(inputBox.value)
        if (inputBox.value.length == 1) {
            startTime = new Date().getTime();
        }
        if (inputBox.value == quote) {
            endTime = new Date().getTime();
            totalTime = endTime - startTime;
            millisecToWpm();
            showPopup = true;
            
        }
        else if ( inputBox.value != quote.substring(0, inputBox.value.length)) {
            inputBox.style.backgroundColor = "coral";
        }
        else {
            inputBox.style.backgroundColor = "white";
        }
    }



</script>

<main class="container typingBox">
	<div class="col">
		<div class="row">
            <p>{quote}</p>
        </div>
		<div class="row">
            <input id="typingInput" on:input={(e) => checkValid()}/>
        </div>
	</div>
</main>
<FinishedModal wpm={wpm} open={showPopup} onClosed={() => onPopupClose()}/>

<style>
    .typingBox {
		padding-top: 50px;
	}
    #typingInput {
        font-size: larger;
    }
    p {
        font-size: x-large;
    }
</style>