<script>
	import NavBar from "./components/NavBar.svelte";
	import TypingText from "./components/TypingText.svelte";

	let loggedIn;
	let username;
</script>

<NavBar bind:username={username} bind:loggedIn={loggedIn}/>
<TypingText bind:username={username} bind:loggedIn={loggedIn}/>



<style>
	
</style>