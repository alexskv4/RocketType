<script>

    let showLoginModal = false;
    let loggedIn = false;

    import LoginModal from "./LoginModal.svelte";
    // Make it so if you are logged in, it shows your account name and stuff, and doesnt show login button.
    // If you arent logged in, then show the login button.

    function handleLoginModal () {
        showLoginModal = !showLoginModal;
    }

    function setLoggedIn () {
        loggedIn = true;
    }

</script>

{#if (!loggedIn)}
    <button on:click={() => handleLoginModal()} class="btn btn-primary col loginButton">Login</button>
    <LoginModal setLoggedIn={() => setLoggedIn()} open={showLoginModal} handleModalClose={() => handleLoginModal()}></LoginModal>
{/if}

{#if (loggedIn)}

    <p class="accName">Account Name Placeholder</p>

{/if}

<style>
    .accName {
        color: white;
    }
    .loginButton {
        margin: 10px;
}</style>