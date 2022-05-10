<script>

    import LoginModal from "./LoginModal.svelte";
    import RegisterModal from "./RegisterModal.svelte";

    let showRegisterModal = false;
    let showLoginModal = false;
    let loggedIn = false;
    let username;

    
    // Make it so if you are logged in, it shows your account name and stuff, and doesnt show login button.
    // If you arent logged in, then show the login button.

    function handleRegisterModal () {
        showRegisterModal = !showRegisterModal;
    }

    function handleLoginModal () {
        showLoginModal = !showLoginModal;
    }

    function setLoggedIn (accName) {
        username = accName;
        loggedIn = true;
    }

</script>

{#if (!loggedIn)}
    <button on:click={() => handleRegisterModal()} class = "btn btn-primary col registerButton">Register</button>
    <button on:click={() => handleLoginModal()} class="btn btn-primary col loginButton">Login</button>
    <LoginModal username={username} setLoggedIn={(accName) => setLoggedIn(accName)} open={showLoginModal} handleModalClose={() => handleLoginModal()}></LoginModal>
    <RegisterModal username={username} setLoggedIn={(accName) => setLoggedIn(accName)} open={showRegisterModal} handleModalClose={() => handleRegisterModal()}></RegisterModal>
{/if}

{#if (loggedIn)}

    <p class="accName">Logged in as: {username}</p>

{/if}

<style>
    .accName {
        color: white;
    }
    .loginButton {
        margin: 10px;
    }
    .registerButton {
        margin:10px;
    }
</style>