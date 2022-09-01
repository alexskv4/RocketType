<script>
	import NavBar from "./components/NavBar.svelte";
	import TypingText from "./components/TypingText.svelte";

	let loggedIn;
	let username;
	let userStats;
</script>

<NavBar bind:userStats={userStats} bind:username={username} bind:loggedIn={loggedIn}/>
<TypingText bind:userStats={userStats} bind:username={username} bind:loggedIn={loggedIn}/>



<style>
	
</style>