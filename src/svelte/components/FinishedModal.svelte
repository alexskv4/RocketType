<script>
  import { tick } from 'svelte';
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'sveltestrap';

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

<Modal isOpen={open} {modalClose}>
  <ModalHeader {modalClose}>
    <div class="headerText">Race results</div>
  </ModalHeader>
  <ModalBody>
    <div class="modalBody">
      <div class="raceStats">
        <Row>
          <Col>Speed:</Col><Col>{wpm} WPM</Col>
        </Row>
        <Row>
          <Col>Accuracy:</Col><Col>{percentageAccuracy}%</Col>
        </Row>
        <Row>
          <Col>Typos:</Col><Col>{errorCount}</Col>
        </Row>
      </div>
    </div>
  </ModalBody>
  <ModalFooter>
    <button type="button" class="btn btn-secondary btn-lg" on:click={() => modalClose(true)}>Try again</button>
    <button use:focusEl type="button" class="btn btn-primary btn-lg" on:click={() => modalClose(false)}>Next Race</button>
  </ModalFooter>
</Modal>

<style>
  .headerText {
    font-size: xx-large;
  }
  .raceStats {
    font-size: x-large;
  }
</style>