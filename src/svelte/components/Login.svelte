<script>
    import { Styles, Button, Icon, Popover, Badge } from "sveltestrap";
    import AccountStatsModal from "./AccountStatsModal.svelte";
    import LoginModal from "./LoginModal.svelte";
    import RegisterModal from "./RegisterModal.svelte";

    let showRegisterModal = false;
    let showLoginModal = false;
    let showAccountStatsModal = false;
    export let loggedIn = false;
    export let username;
    export let userStats;

    
    // Make it so if you are logged in, it shows your account name and stuff, and doesnt show login button.
    // If you arent logged in, then show the login button.

    function handleRegisterModal () {
        showRegisterModal = !showRegisterModal;
    }

    function handleLoginModal () {
        showLoginModal = !showLoginModal;
    }

    function handleAccountStatsModal () {
        showAccountStatsModal = !showAccountStatsModal;
    }

    function setLoggedIn (accName) {
        username = accName;
        loggedIn = true;
    }

    function logOut() {
        username=null;
        loggedIn = false;
    }

</script>
<Styles/>
<div class="helpButtonDiv col"><Button outline id={"btn-trigger"} color={"light"}><Icon name={'question'}></Icon></Button></div>
<Popover trigger={'hover'} placement={'bottom'} target={'btn-trigger'} title={"Help"}>
    <div class="helpDiv"><Badge>Tab</Badge>  Next quote</div>
</Popover>

{#if (!loggedIn)}
    <button on:click={() => handleRegisterModal()} class = "btn btn-primary col registerButton">Register</button>
    <button on:click={() => handleLoginModal()} class="btn btn-primary col loginButton">Login</button>
    <LoginModal username={username} setLoggedIn={(accName) => setLoggedIn(accName)} open={showLoginModal} handleModalClose={() => handleLoginModal()}></LoginModal>
    <RegisterModal username={username} setLoggedIn={(accName) => setLoggedIn(accName)} open={showRegisterModal} handleModalClose={() => handleRegisterModal()}></RegisterModal>
{/if}

{#if (loggedIn)}
    <button on:click={() => logOut()} class="btn btn-primary col logoutButton">Logout</button>
    <div class="accNameDiv col"><button on:click={() => handleAccountStatsModal()} class="btn btn-outline-light accButton" outline><Icon name={"person-circle"}/>     {username}</button></div>
    <AccountStatsModal userStats={userStats} open={showAccountStatsModal} handleModalClose={() => handleAccountStatsModal()}></AccountStatsModal>
{/if}

<style>
    .accButton {
        white-space: nowrap;
    }
    .accNameDiv {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loginButton {
        margin: 10px;
    }
    .registerButton {
        margin: 10px;
    }
    .logoutButton {
        margin: 10px;
    }
    .helpButtonDiv {
        margin: 10px;
        padding: 0px;
    }
    .helpDiv {
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0px;
        padding: 0px;
        font-size: large;
    }
</style>