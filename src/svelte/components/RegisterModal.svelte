<script>

  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

  export let open = false;
  export let handleModalClose;
  export let setLoggedIn;
  let loggedIn = false;

  export let username;
  let password;
  let password2;
  let usernameTaken = false;
  let passwordsDontMatch = false;
  let passwordTooShort = false;


  const register = () => {

    usernameTaken = false;
    passwordsDontMatch = false;
    passwordTooShort = false
    

    if (password != password2) {
        passwordsDontMatch = true;
        console.log("Passwords do not match.");
        return;
    }
    if (password == null || password.length < 4) {
      passwordTooShort = true;
      console.log("Password is too short");
      return;
    }
    let data = {username: username, password: password};

    let strData = JSON.stringify(data);

    fetch("/users/register", {method: "POST", headers: {"Content-Type" : "application/json"}, body: strData})
    .then((res) => {
        
        if(res.status == "201") { 
            res.json();
        }
        else if (res.status == "409") {
          usernameTaken = true;
          throw new Error("username already in use")
        }
        else {
          throw new Error("Failed to post.")
        }
    
    })
    .then((json) => {
    
        loggedIn = true;
        setLoggedIn(username);
        modalClose();
    
    
    })
    .catch((error) => {
        console.error(error)
    })
  };

  const modalClose = () => {
      open = false;
      if (handleModalClose) {
          handleModalClose();
      }
  };


</script>

<Modal isOpen={open} {modalClose}>
  <ModalHeader {modalClose}>Register</ModalHeader>
  <ModalBody>
    <form>
      <div class="form-group">
        <input bind:value={username} type="text" class="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter Username">
      </div>
      {#if usernameTaken}
        <div class="alert alert-danger form-group" role="alert">
          <p class="alertText">This username is already in use</p>
        </div>
      {/if}
      <div class="form-group">
        <input bind:value={password} type="password" class="form-control" id="passwordInput" placeholder="Enter Password">
      </div>
      <div class="form-group">
          <input bind:value={password2} type="password" class="form-control" id="ConfirmPasswordInput" placeholder="Confirm Password">
      </div>
      {#if passwordsDontMatch}
        <div class="alert alert-danger form-group" role="alert">
          <p class="alertText">The passwords do not match!</p>
        </div>
      {/if}
      {#if passwordTooShort}
        <div class="alert alert-danger form-group" role="alert">
          <p class="alertText">Password must be at least 4 characters.</p>
        </div>
      {/if}
    </form>
  </ModalBody>
  <ModalFooter>
    <button type="button" class="btn btn-secondary btn-lg" on:click={() => modalClose()}>Cancel</button>
    <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" on:click={() => register()}>Create Account</button>
  </ModalFooter>
</Modal>

<style>
  .alert-danger {
    align-items: center;
    justify-content: center;
  }
  .form-group {
    margin: 10px;
  }
  .alertText {
    font-size: medium;
    margin: 0%;
  }

</style>