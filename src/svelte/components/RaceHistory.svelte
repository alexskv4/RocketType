<script>

    import { Table } from 'sveltestrap';

    export let loggedIn;
    export let races; //use to store array of race objects.

    export let avgWPM;
    export let avgAcc;

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
        <!-- <div class="row avgRow">
            <div class="col">
                Average WPM: {avgWPM}
            </div>
            <div class="col">
                Average Accuracy: {avgAcc}%
            </div>
        </div> -->
        <Table>
            <thead>
                <tr>
                    <th>WPM</th>
                    <th>% Accuracy</th>
                    <th>Mistakes</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody class="tableBody">
                {#each races as race}
                    <tr>
                        <td>{race.wpm} WPM</td>
                        <td>{race.percentageAccuracy} % Accuracy</td>
                        <td>{race.errorCount}</td>
                        <td>{formatDateTime(race.endTime)}</td>
                    </tr>     
                {/each}
            </tbody>
        </Table>
    </div>

{/if}
{#if (loggedIn && !races[0])}
    <div class="raceHistoryBox col">

        Complete a race to see it here.

    </div>
{/if}
<style>
    .raceHistoryBox {
        border: 2px solid black;
        border-radius: 5px;
        text-align: center;
        font-size: x-large;
        padding: 0px;
        margin-bottom: 10%;
    }
    .headerRow {
        text-align: center;
        font-size: xx-large;
    }
    .notLogged {
        padding: 10px
    }
    .tableBody {
        font-size: medium;
    }
    .tableBody td {
        padding-top: 2px;
        padding-bottom: 2px;
    }

</style>