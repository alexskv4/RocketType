<script>
  import { tick } from 'svelte';
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

  export let open = false;
  // export let showBackdrop = true;
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
  async function focusEl (element) {
    await tick();
    element.focus();
  }

</script>

<Modal size={'lg'} isOpen={open} {modalClose}>
  <ModalHeader {modalClose}>
    <div class="headerText">Race results</div>
  </ModalHeader>
  <ModalBody>
    <div class="col textCol">
      <div class="row">
        Speed: {wpm} WPM
      </div>
      <div class="row">
        Number of errors: {errorCount}
      </div>
      <div class="row">
        Accuracy: {percentageAccuracy}%
      </div>
    </div>
  </ModalBody>
  <ModalFooter>
    <button type="button" class="btn btn-secondary btn-lg" on:click={() => modalClose(true)}>Try again</button>
    <button use:focusEl type="button" class="btn btn-primary btn-lg" on:click={() => modalClose(false)}>Next Race</button>
  </ModalFooter>
</Modal>

<style>
  .textCol {
    margin-left: 1em;
    font-size: xx-large;
  }
  .headerText {
    font-size: xx-large;
  }
</style>