<script>
    import { Modal, ModalBody, ModalHeader, Row, Col, ModalFooter } from 'sveltestrap';

    export let open = false;
    export let handleModalClose;
    
    export let userStats;

    function padTo2Digits (num) {
        return num.toString().padStart(2, '0');
    }

    function formatMilliseconds (ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor(ms  / 1000 / 3600 );

        const formatted = [
            padTo2Digits(hours.toString(), 2),
            padTo2Digits(minutes.toString(), 2),
            padTo2Digits(seconds.toString(), 2),
        ].join(':');
        return formatted;
    }

    const modalClose = () => {
        open = false;
        if (handleModalClose) {
            handleModalClose();
        }
    }

</script>

<Modal isOpen={open} {modalClose} backdrop={true}>
    <ModalHeader {modalClose}>
        <div class="headerText">User Statistics</div>
    </ModalHeader>
    <ModalBody>
        <Col>
            <Row><h3>Average</h3></Row>
            <Row><Col><p>All-time average WPM:</p></Col><Col><p>{userStats.averageWpm}</p></Col></Row>
            <Row><Col><p>All-time average accuracy:</p></Col><Col><p>{userStats.averageAccuracy}</p></Col></Row>
            <Row><Col><p>Recent average WPM:</p></Col><Col><p>{userStats.recentAverageWpm}</p></Col></Row>
            <Row><Col><p>Recent average accuracy:</p></Col><Col><p>{userStats.averageWpm}</p></Col></Row>
            <Row><Col><p>Races Completed:</p></Col><Col><p>{userStats.racesCompleted}</p></Col></Row>
            <Row><Col><p>Time spent typing:</p></Col><Col><p>{formatMilliseconds(userStats.timeTyping)}</p></Col></Row>
        </Col>
    </ModalBody>
    <ModalFooter>
        <button class="btn btn-secondary" on:click={modalClose}>Close</button>
    </ModalFooter>
</Modal>