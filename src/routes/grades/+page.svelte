<script lang="ts">
	import { goto } from '$app/navigation';
	import SideMenuButton from '$lib/components/buttons/SideMenuButton.svelte';
	import AddContentNodeDialog from '$lib/components/dialogs/AddContentNodeDialog.svelte';

	let { data } = $props();

	let showAddDialog = $state(false);

	const navigateTo = (path: string) => {
		goto(path);
	};

	function openDialog() {
		showAddDialog = true;
	}

	function closeDialog() {
		showAddDialog = false;
	}
</script>

{#if showAddDialog}
	<AddContentNodeDialog grade={null} onclose={closeDialog} />
{/if}

<section class="main-container">
	<div class="sidebar">
		<h1 class="title">Grades</h1>

		<div class="sidebar-scroll">
			{#each data.grades as grade}
				<SideMenuButton
					isSelected={false}
					title={grade.name}
					onclick={() => navigateTo(`/grades/${grade.id}`)}
				/>
			{/each}
			<SideMenuButton isSelected={false} title="Add Grade" onclick={openDialog} />
		</div>
	</div>

	<div class="content-container"></div>
</section>

<style>
	/* Entire page layout */
	.main-container {
		width: 100%;
		height: calc(100vh - var(--navbar-height));
		display: flex;
		overflow: hidden; /* prevents double scrollbar */
	}

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

	/* Main content */
	.content-container {
		flex: 1;
		overflow-y: auto;
		padding: 40px;
	}
</style>
