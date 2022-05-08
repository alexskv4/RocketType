
<script>

    export let open = false;
    export let showBackdrop = true;
    export let handleModalClose;
    export let setLoggedIn;

    const login = () => {
      setLoggedIn();  
    };


    const modalClose = () => {
        login();
        console.log("closing modal")
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
          <h1 class="modal-title">Login</h1>
        </div>
        <div class="modal-body">

          <form>
            <div class="form-group">
              <input type="email" class="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="Enter username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="passwordInput" placeholder="Password">
            </div>
          </form>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal" on:click={() => modalClose()}>Login</button>
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .form-group {
    margin: 10px;
  }
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
    justify-content: right;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    font-size: xx-large;
  }

</style>