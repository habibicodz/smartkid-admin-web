<script lang="ts">
	import { page } from '$app/state';
	import ActionButton from '$lib/components/buttons/ActionButton.svelte';
	import AddSubjectDialog from '$lib/components/dialogs/AddSubjectDialog.svelte';
	import SectionHeader from '$lib/components/headers/SectionHeader.svelte';
	import TableItem from '$lib/components/items/TableItem.svelte';
	import BackStackComponent from '$lib/components/ui/BackStackComponent.svelte';
	import {
		getGradeById,
		getSubjects,
		supabaseClient
	} from '$lib/supabase_db/client/supabaseClient';
	import type { Tables } from '$lib/supabase_db/database.types';
	import ButtonLoader from '$lib/components/loader/ButtonLoader.svelte';
	import AlertDialog from '$lib/components/dialogs/AlertDialog.svelte';
	import { deleteSubject } from '$lib/supabase_db/dbutil.remote';
	import Searchbar from '$lib/components/items/Searchbar.svelte';
	const gradeId: string = $derived(page.params.gradeId as string);

	let grade = $state<Tables<'grades'> | null>(null);
	let subjects = $state<Tables<'subjects'>[] | null>(null);
	let showAddDialog = $state(false);
	let showEditDialog = $state<Tables<'subjects'> | null>(null);
	let showDeleteDialog = $state<Tables<'subjects'> | null>(null);
	let progress = $state(false);
	let searchbarvalue = $state('');

	let subjectRequestId = 0;
	let gradeRequestId = 0;

	const deleteMySubject = async (subject: Tables<'subjects'>) => {
		progress = true;
		const result = await deleteSubject({ subject: subject });
		console.log('The data successfully deleted');
		showDeleteDialog = null;
		progress = false;
	};

	/* Realtime updates */
	$effect(() => {
		const id = gradeId;
		const realtime = supabaseClient
			.channel('subject_realtime_channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'subjects', filter: `grade_id=eq.${id}` },
				(payload) => {
					subjects = [...(subjects ?? []), payload.new as Tables<'subjects'>];
				}
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'subjects', filter: `grade_id=eq.${id}` },
				(payload) => {
					subjects = (subjects ?? []).map((s) =>
						s.id === payload.new.id ? (payload.new as Tables<'subjects'>) : s
					);
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'subjects' },
				(payload) => {
					console.log('Delete detected');
					subjects = (subjects ?? []).filter((s) => s.id !== payload.old.id);
				}
			);

		realtime.subscribe();
		return () => realtime.unsubscribe();
	});

	/* Load grade */
	$effect(() => {
		const reqId = ++gradeRequestId;
		grade = null;

		getGradeById(gradeId).then((result) => {
			if (reqId !== gradeRequestId) return;
			grade = result as Tables<'grades'>;
		});
	});

	/* Load subjects */
	$effect(() => {
		const reqId = ++subjectRequestId;
		subjects = null;

		getSubjects(gradeId).then((result) => {
			if (reqId !== subjectRequestId) return;
			subjects = result ?? [];
		});
	});
</script>

{#if showDeleteDialog != null}
	<AlertDialog
		title={showDeleteDialog.name}
		description="Are you sure you want to delete {showDeleteDialog.name}? This action cannot be undone."
		onNegativeClicked={() => (showDeleteDialog = null)}
		onPositiveClicked={() => deleteMySubject(showDeleteDialog!)}
		positiveLoading={progress}
	/>
{/if}

<div class="container">
	{#if grade}
		<div class="back-stack-container">
			<BackStackComponent items={[{ key: grade.id, value: grade.name }]} />
		</div>
	{/if}

	<div class="data-container">
		{#if subjects === null}
			<!-- Loading State -->
			<div class="loading-wrapper">
				<ButtonLoader />
				<p class="loading-text">Loading subjects...</p>
			</div>
		{:else if subjects.length === 0}
			<!-- Empty State -->
			<div class="empty-wrapper">
				<p>No subjects available</p>
				<ActionButton
					title="Add Subject"
					type="primary"
					showTypeByDefault={true}
					onclick={() => (showAddDialog = true)}
				/>
			</div>
		{:else}
			<!-- Loaded Data -->
			<SectionHeader title="Subjects">
				<ActionButton
					title="Add Subject"
					type="primary"
					showTypeByDefault={true}
					onclick={() => (showAddDialog = true)}
				/>
			</SectionHeader>

			<Searchbar
				value={searchbarvalue}
				onValueChange={(value) => {
					searchbarvalue = value;
				}}
			/>

			<div class="items-container">
				{#each subjects as item (item.id)}
					<TableItem
						id={item.id}
						title={item.name}
						onitemclicked={() => {}}
						oneditclick={() => (showEditDialog = item)}
						ondeleteclick={(id, title) => {
							showDeleteDialog = item;
						}}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if showAddDialog && grade}
	<AddSubjectDialog {grade} onclose={() => (showAddDialog = false)} />
{/if}

{#if showEditDialog && grade}
	<AddSubjectDialog {grade} subject={showEditDialog} onclose={() => (showEditDialog = null)} />
{/if}

<style>
	/* Layout */
	.container {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 16px 0;
	}

	.back-stack-container {
		margin-bottom: 12px;
	}

	.data-container {
		display: flex;
		flex-direction: column;
		position: relative;
		gap: 12px;
	}

	.items-container {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.loading-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 0;
		color: rgb(90, 90, 90);
	}

	.loading-text {
		margin-top: 8px;
		font-size: 0.95rem;
		color: rgb(90, 90, 90);
	}

	/* Empty State */
	.empty-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 0;
		gap: 10px;
		color: rgb(120, 120, 120);
	}

	.empty-wrapper p {
		font-style: italic;
		font-weight: 400;
	}

	/* TableItem Cards */
	.items-container > :global(*) {
		background: white;
		border-radius: 10px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
		padding: 12px 16px;
		transition:
			transform 0.1s ease,
			box-shadow 0.15s ease;
	}

	.items-container > :global(*:hover) {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
	}
</style>
