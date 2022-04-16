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
  <div class="modal" tabindex="-1"
    role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false}
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">Race Results</h5>
        </div>
        <div class="modal-body">You typed {wpm} WPM.</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={modalClose}>Try again</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" on:click={modalClose}>Next Race</button>
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
  }
</style>