<script>

    export let loggedIn;
    export let races; //use to store array of race objects.

</script>

{#if !loggedIn}

    <div class="raceHistoryBox col">

        Login to see previous races

    </div>

{/if}
{#if (loggedIn && races[0])}

    <div class="raceHistoryBox col">
        {#each races as race}
            <div class="row raceInfo">
                <div class="col">{race.wpm} WPM</div>
                <div class="col">{race.percentageAccuracy} % Accuracy</div>
                <div class="col">{race.errorCount} mistakes</div>
            </div>     
        {/each}
    </div>

{/if}
{#if (loggedIn && !races[0])}
    <div class="raceHistoryBox col">

        Complete a race to see it here.

    </div>
{/if}
<style>
    .raceInfo {
        font-size:medium;
    }
    .raceHistoryBox {
        border: 2px solid black;
        border-radius: 5px;
        text-align: center;
        margin-top: 5%;
        padding: 5px;
        font-size: x-large;
    }

</style>