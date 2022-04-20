<script>

    export let open = false;
    export let showBackdrop = true;
    export let onClosed;
    export let wpm;
    export let errorCount;
    export let percentageAccuracy;

    const modalClose = (retry) => {

        open = false;
        if (onClosed) {
            onClosed(retry);
        }
    }

</script>


{#if open}
  <div class="modal" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false}>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="sampleModalLabel">Race Results</h1>
        </div>
        <div class="modal-body">

        <div class="col">
          <div class="row">
            You typed {wpm} WPM.
          </div>
          <div class="row">
            # of errors: {errorCount}
          </div>
          <div class="row">
            Accuracy: {percentageAccuracy}%
          </div>
        </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" on:click={() => modalClose(true)}>Try again</button>
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" on:click={() => modalClose(false)}>Next Race</button>
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .modal {
    display: block;
    justify-content: center;
  }
  .modal-content {
    height: 50%;
    width: 70%;
  }
  .modal-dialog {
    height: 50%;
    width: 70%;
    max-width: 70%;
    align-content: center;
    justify-content: center;
  }
  .modal-footer {
    justify-content: space-between;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    font-size: xx-large;
  }
</style>