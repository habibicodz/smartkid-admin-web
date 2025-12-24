<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import '$lib/styles/App.css';
	import { AppStateClass, getAppContext, setAppContext } from '$lib/state/AppState.svelte';
	import { onMount } from 'svelte';
	import Navbar from '$lib/sections/common/Navbar.svelte';
	let { children } = $props();

	// Initialize App State
	setAppContext(new AppStateClass());
	const appContext = getAppContext();

	const prepareAppState = async () => {
		await appContext.loadInitialData();
		appContext.gradesChanges.subscribe();
	};

	onMount(() => {
		console.log('On Mount is called');
		prepareAppState();
		return () => appContext.gradesChanges.unsubscribe();
	});
</script>

<SEO />

<div class="app-layout">
	<Navbar />

	<main class="main-container">
		<div class="content-container">
			{@render children()}
		</div>

		<div class="screen-warning-container">
			<h2>Screen size is not compatible</h2>
			<p>Please open the Admin panel on desktop</p>
		</div>
	</main>
</div>

<style>
	:root {
		--navbar-height: 64px; /* Adjust if your navbar height changes */
	}

	/* Full page flex layout */
	.app-layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}

	/* Navbar stays at top naturally */
	/* main takes remaining space */
	.main-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}

	/* Scrollable content */
	.content-container {
		flex: 1;
		overflow-y: auto;
		padding: 40px;
	}

	/* Screen warning overlay */
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
		z-index: 9999;
	}

	/* Responsive screen warning for small screens */
	@media (max-width: 900px) {
		.screen-warning-container {
			display: flex;
		}

		main {
			overflow: hidden;
		}
	}

	main {
		background-color: var(--color-background);
	}
</style>
