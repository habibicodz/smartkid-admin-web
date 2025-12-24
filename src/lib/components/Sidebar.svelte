<script lang="ts">
	import addicon from '$lib/assets/add.svg';
	import { goto } from '$app/navigation';
	import SideMenuButton from './buttons/SideMenuButton.svelte';
	import AddGradeDialog from './dialogs/AddGradeDialog.svelte';
	import { getAppContext } from '$lib/state/AppState.svelte';
	import { page } from '$app/state';

	let appContext = getAppContext();
	let showAddDialog = $state(false);
	let selectedGradeId = $derived(page.params.gradeId);

	const navigateTo = (path: string) => goto(path);
</script>

{#if showAddDialog}
	<AddGradeDialog grade={null} onclose={() => (showAddDialog = false)} />
{/if}

<div class="sidebar">
	<div class="sidebar-header">
		<h1 class="title">SmartKid</h1>
		<p class="subtitle">Your learning dashboard</p>
	</div>

	<div class="sidebar-scroll">
		<SideMenuButton
			title="Dashboard"
			isSelected={page.url.pathname == '/'}
			onclick={() => navigateTo('/')}
		/>

		{#if appContext.gradesLoading}
			<div class="loading-wrapper">
				<div class="loader"></div>
				<p>Loading grades...</p>
			</div>
		{/if}

		{#each appContext.grades as grade}
			<SideMenuButton
				isSelected={grade.id == selectedGradeId}
				title={grade.name}
				onclick={() => navigateTo(`/subjects/${grade.id}`)}
			/>
		{/each}

		<SideMenuButton
			icon={addicon}
			border="stripped"
			isSelected={false}
			title="Add Grade"
			onclick={() => (showAddDialog = true)}
		/>
	</div>
</div>

<style>
	/* Sidebar container */
	.sidebar {
		width: 280px;
		background-color: white;
		border-right: 1px solid #eee;
		display: flex;
		flex-direction: column;
		padding: 24px 16px;
		box-sizing: border-box;
		font-family: 'Inter', sans-serif;
	}

	/* Header */
	.sidebar-header {
		margin-bottom: 24px;
		text-align: center;
	}

	.title {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: 1px;
		color: rgb(50, 50, 50);
		margin: 0;
	}

	.subtitle {
		font-size: 0.95rem;
		color: rgb(120, 120, 120);
		margin-top: 4px;
		font-weight: 400;
	}

	/* Scrollable sidebar content */
	.sidebar-scroll {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		overflow-y: auto;
		padding-right: 4px;
	}

	/* Loading state */
	.loading-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 0;
		color: #888;
	}

	.loader {
		width: 24px;
		height: 24px;
		border: 3px solid rgba(0,0,0,0.1);
		border-top-color: rgb(50,50,50);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
		margin-bottom: 6px;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.loading-wrapper p {
		font-size: 0.9rem;
	}

	/* Custom scrollbar */
	.sidebar-scroll::-webkit-scrollbar {
		width: 6px;
	}

	.sidebar-scroll::-webkit-scrollbar-thumb {
		background-color: rgba(0,0,0,0.1);
		border-radius: 3px;
	}

	.sidebar-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
</style>
