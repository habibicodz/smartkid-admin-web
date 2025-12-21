<script lang="ts">
	import addicon from '$lib/assets/add.svg';
	import { goto } from '$app/navigation';
	import SideMenuButton from './buttons/SideMenuButton.svelte';
	import AddGradeDialog from './dialogs/AddGradeDialog.svelte';
	import { getAppContext } from '$lib/state/AppState.svelte';
	
	let appContext = getAppContext();
	let showAddDialog = $state(false);

	const navigateTo = (path: string) => {
		goto(path);
	};
</script>

{#if showAddDialog}
	<AddGradeDialog grade={null} onclose={() => (showAddDialog = false)} />
{/if}

<div class="sidebar">
	<h1 class="title">Smartkid</h1>
	<div class="sidebar-scroll">
		<SideMenuButton
			title="Dashboard"
			isSelected={false}
			onclick={() => {
				navigateTo('/');
			}}
		/>
		{#if appContext.gradesLoading}
			<p>Loading data...</p>
		{/if}
		{#each appContext.grades as grade}
			<SideMenuButton
				isSelected={false}
				title={grade.name}
				onclick={() => navigateTo(`/grades/${grade.id}`)}
			/>
		{/each}
		<SideMenuButton
			icon={addicon}
			border={'stripped'}
			isSelected={false}
			title="Add Grade"
			onclick={() => (showAddDialog = true)}
		/>
	</div>
</div>

<style>
	/* Sidebar container */
	.sidebar {
		width: 300px;
		background-color: white;
		border-right: 1px solid #ddd;
		display: flex;
		flex-direction: column;
		padding: 20px;
	}

	.title {
		margin-bottom: 20px;
	}

	/* Scrollable portion of sidebar */
	.sidebar-scroll {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		gap: 10px;
		/* padding-right: 5px; for smoother scrolling */
	}
</style>
