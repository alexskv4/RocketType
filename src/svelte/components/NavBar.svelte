<script>
	import Login from "./Login.svelte"

	export let loggedIn;
	export let username;
</script>

<nav class="navbar navbar-dark bg-dark">
	<div class="container-fluid">
		<div class="row leftNav">
				<div class="col imageCol">
					<img class="navIcon" src="/rocketIcon.png" alt="RocketIcon"/>
				</div>
				<div class="col">
					<h1 class="headerText">RocketType</h1>
				</div>
		</div>
		<div class="row">
			<Login bind:username={username} bind:loggedIn={loggedIn}/>
		</div>
	</div>
</nav>

<style>
	.leftNav {
		align-items: center;
	}
	.imageCol {
		max-width: 80px;
	}
	.navIcon {
		max-width: 85%;
	}
	.headerText {
		color: white;
	}
</style>