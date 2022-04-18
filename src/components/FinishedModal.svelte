<script>

    export let open = false;
    export let showBackdrop = true;
    export let onClosed;
    export let wpm;

    const modalClose = () => {

        open = false;
        if (onClosed) {
            onClosed();
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
        <div class="modal-body">You typed {wpm} WPM.</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" on:click={modalClose}>Try again</button>
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" on:click={modalClose}>Next Race</button>
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
    height: 60%;
    width: 80%;
  }
  .modal-dialog {
    height: 60%;
    width: 80%;
    max-width: 80%;
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