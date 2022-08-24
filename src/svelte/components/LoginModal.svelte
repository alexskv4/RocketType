<script>

  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

  export let open = false;
  export let handleModalClose;
  export let setLoggedIn;
  let loggedIn = false;

  export let username;
  let password;
  let incorrectLogin = false;

  const login = () => {

    let data = {username: username, password: password}
    let strData = JSON.stringify(data);

    fetch("/users/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: strData})
    .then((res) => {
      if(res.status == "200"){
        res.json();
      }
      else {
        incorrectLogin = true;
        throw new Error("Login Failed.")
      }
    })
    .then((json) => {
      
      loggedIn = true;
      setLoggedIn(username);
      modalClose();
    
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const modalClose = () => {
      open = false;
      if (handleModalClose) {
          handleModalClose();
      }
  };

</script>

<Modal isOpen={open} {modalClose}>
  <ModalHeader {modalClose}>Login</ModalHeader>
  <ModalBody>
    <form>
      <div class="form-group">
        <input bind:value={username} type="text" class="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter username">
      </div>
      <div class="form-group">
        <input bind:value={password} type="password" class="form-control" id="passwordInput" placeholder="Password">
      </div>
      {#if incorrectLogin}
        <div class="alert alert-danger form-group" role="alert">
          <p class="alertText">Incorrect Username or password.</p>
        </div>
      {/if}
    </form>
  </ModalBody>
  <ModalFooter>
    <button type="button" class="btn btn-secondary btn-lg" on:click={() => modalClose()}>Cancel</button>
    <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" on:click={() => login()}>Login</button>
  </ModalFooter>
</Modal>

<style>

.alertText {
  font-size: medium;
  margin: 0%;
}
.form-group {
  margin: 10px;
}

</style>