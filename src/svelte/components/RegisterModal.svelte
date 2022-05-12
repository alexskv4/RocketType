<script>

    export let open = false;
    export let showBackdrop = true;
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

    //  console.log(username)
    //  console.log(password)
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
      //console.log(json)
      
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

{#if open}
  <div class="modal" tabindex="-1" role="dialog" aria-hidden={false}>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">Register</h1>
        </div>
        <div class="modal-body">

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


        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-lg" on:click={() => modalClose()}>Cancel</button>
            <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" on:click={() => register()}>Create Account</button>
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .alert-danger {
    align-items: center;
    justify-content: center;
  }
  .form-group {
    margin: 10px;
  }
  .modal {
    display: block;
    justify-content: center;
  }
  .modal-content {
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
    justify-content: right;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    font-size: xx-large;
  }
  .alertText {
    font-size: medium;
    margin: 0%;
  }

</style>