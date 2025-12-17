<script lang="ts">
	import Navbar from '$lib/sections/common/Navbar.svelte';
	import SEO from '$lib/SEO.svelte';
	import '$lib/styles/App.css';
	let { children } = $props();
</script>

<main>
	<SEO />
	<Navbar />
	{@render children()}

	<div class="screen-warning-container">
		<h2>Screen size is not compatible</h2>
		<p>Please open the Admin panel on desktop</p>
	</div>
</main>

<style>
	main {
		background-color: var(--color-background);
	}

	.screen-warning-container {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		display: none;
		color: rgb(52, 52, 52);
		background-color: white;
		position: fixed;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 900px) {
		.screen-warning-container {
			display: flex;
		}

		main {
			overflow: hidden;
		}
	}
</style>
