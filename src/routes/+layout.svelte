<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import '$lib/styles/App.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { AppStateClass, getAppContext, setAppContext } from '$lib/state/AppState.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Navbar from '$lib/sections/common/Navbar.svelte';
	let { children } = $props();

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

<main class="main-container">

	<Sidebar />

	<div class="content-container">
		{@render children()}
	</div>

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

	/* Entire page layout */
	.main-container {
		width: 100%;
		height: calc(100vh);
		display: flex;
		overflow: hidden; /* prevents double scrollbar */
	}

	/* Main content */
	.content-container {
		flex: 1;
		overflow-y: auto;
		padding: 40px;
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
