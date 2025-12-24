<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getAppContext } from '$lib/state/AppState.svelte';
	import AddGradeDialog from '$lib/components/dialogs/AddGradeDialog.svelte';
	import EntityCard from '$lib/components/cards/EntityCard.svelte';
	import type { Tables } from '$lib/supabase_db/database.types';
	import GridCard from '$lib/components/cards/GridCard.svelte';
	let appContext = getAppContext();

	let showAddDialog = $state(false);
	let showEditDialog = $state<Tables<'grades'> | null>(null);

	const navigateToSubjects = (gradeId: string) => {
		goto(`/subjects/${gradeId}`);
	};
</script>

{#if showAddDialog}
	<AddGradeDialog grade={null} onclose={() => (showAddDialog = false)} />
{/if}

{#if showEditDialog}
	<AddGradeDialog grade={showEditDialog} onclose={() => (showEditDialog = null)} />
{/if}

<section class="page">
	<header class="header">
		<h1>Grades</h1>
		<button class="add-btn" onclick={() => (showAddDialog = true)}> + Add Grade </button>
	</header>

	{#if appContext.gradesLoading}
		<div class="loading">
			<div class="spinner"></div>
			<p>Loading grades...</p>
		</div>
	{:else}
		<div class="grid">
			{#each appContext.grades as grade}
				<GridCard
					id={grade.id}
					title={grade.name}
					onitemclicked={navigateToSubjects}
					oneditclick={() => {
						showEditDialog = grade;
					}}
				/>
			{/each}
		</div>
	{/if}
</section>

<style>
	.page {
		padding: 32px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;
	}

	.header h1 {
		font-size: 1.8rem;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.add-btn {
		border: 1px solid #e5e7eb;
		background: #ffffff;
		padding: 8px 14px;
		border-radius: 10px;
		cursor: pointer;
		font-size: 14px;
		color: #111827;
	}

	.add-btn:hover {
		background: #f9fafb;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 16px;
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 48px 0;
		color: #6b7280;
	}

	.spinner {
		width: 28px;
		height: 28px;
		border: 3px solid rgba(0, 0, 0, 0.1);
		border-top-color: #111827;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
		margin-bottom: 8px;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
