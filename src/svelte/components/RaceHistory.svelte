<script>

    export let loggedIn;
    export let races; //use to store array of race objects.

    let avgWPM = 0;
    let avgAcc = 0;

    function getAvgWPM () {
        avgWPM = 0;

        for (let i = 0; i < races.length; i++) {
            avgWPM += races[i].wpm;
        }

        avgWPM = ((avgWPM + 0.5) / races.length).toFixed(2);
        return (avgWPM)
    }
    
    function getAvgAcc () {
        avgAcc = 0;

        for (let i = 0; i < races.length; i++) {
            avgAcc += races[i].percentageAccuracy;
        }

        avgAcc = ((avgAcc + 0.5) / races.length).toFixed(2);
        return (avgAcc)
    }

    function formatDateTime (dateTimeString) {

        let date = new Date(dateTimeString);

        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
        let hours;
        let amPm;
        let minutes;
        
        if (date.getHours() > 12) {
            hours = date.getHours() - 12;
            amPm = "PM";
        }
        else if(date.getHours() == 0) {
            hours = 12;
            amPm = "AM";
        }
        else if(date.getHours() == 12) {
            hours = 12;
            amPm = "PM"
        }
        else {
            hours = date.getHours();
            amPm = "AM";
        }

        if (date.getMinutes() < 10) {
            minutes = "0" + date.getMinutes().toString();
        }
        else {
            minutes = date.getMinutes();
        }

        let formattedDate = month + " " + date.getDate() + ", " + hours + ":" + minutes + " " + amPm;

        return(formattedDate);
    }

</script>

{#if !loggedIn}

    <div class="raceHistoryBox notLogged col">

        Login to see your race history

    </div>

{/if}
{#if (loggedIn && races[0])}
    <div class="row headerRow">
        <div class="col">Past 10 Races</div>
    </div>
    <div class="raceHistoryBox col">
        <div class="row avgRow">
            <div class="col">
                Average WPM: {getAvgWPM()}
            </div>
            <div class="col">
                Average Accuracy: {getAvgAcc()}%
            </div>
        </div>
        {#each races as race}
            <div class="row raceInfo">
                <div class="col">{race.wpm} WPM</div>
                <div class="col">{race.percentageAccuracy} % Accuracy</div>
                <div class="col">{race.errorCount} mistakes</div>
                <div class="col">{formatDateTime(race.endTime)}</div>
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
        font-size: x-large;
    }
    .headerRow {
        text-align: center;
        font-size: xx-large;
    }
    .avgRow {
        border-bottom: 2px solid black;
        padding: 2px
    }
    .notLogged {
        padding: 10px
    }

</style>