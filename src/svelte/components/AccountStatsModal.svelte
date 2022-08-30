<script>
    import { Modal, ModalBody, ModalHeader, Row, Col } from 'sveltestrap';

    export let open = false;
    export let handleModalClose;
    export let username;
    
    let userStats;


    const modalClose = () => {
        open = false;
        if (handleModalClose) {
            handleModalClose();
        }
    }

    // $: if (open) {
    //     let data = {
    //         username: username
    //     }
    //     let strData = JSON.stringify(data);

    //     fetch("users/userStats", {method: "POST", headers:{"Content-Type": "application/json"}, body:strData})
    //     .then(res => res.json())
    //     .then((data) => {
    //         userStats = data;
    //     })
    // }
</script>

<Modal isOpen={open} {modalClose}>
    <ModalHeader {modalClose}>
        <div class="headerText">User Statistics</div>
    </ModalHeader>
    <ModalBody>
        <div>HELLO!</div>
    </ModalBody>
</Modal>