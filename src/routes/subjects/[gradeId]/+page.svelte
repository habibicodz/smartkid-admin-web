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
	import { goto } from '$app/navigation';
	import GridCard from '$lib/components/cards/GridCard.svelte';

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
		await deleteSubject({ subject });
		showDeleteDialog = null;
		progress = false;
	};

	const navigateToTopics = (item: Tables<'subjects'>) => {
		goto(`/topics/${item.id}`);
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
		title={'Delete?'}
		description="Are you sure you want to delete {showDeleteDialog.name}? This action cannot be undone."
		onNegativeClicked={() => (showDeleteDialog = null)}
		onPositiveClicked={() => deleteMySubject(showDeleteDialog!)}
		positiveLoading={progress}
	/>
{/if}

<div class="container">
	<div class="data-container">
		{#if subjects === null}
			<div class="loading-wrapper">
				<ButtonLoader />
				<p class="loading-text">Loading subjects...</p>
			</div>
		{:else if subjects.length === 0}
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
			<SectionHeader title="Subjects">
				<ActionButton
					title="Add Subject"
					type="primary"
					showTypeByDefault={true}
					onclick={() => (showAddDialog = true)}
				/>
			</SectionHeader>

			<div class="items-container">
				{#each subjects as item (item.id)}
					<GridCard
						id={item.id}
						title={item.name}
						oneditclick={() => {
							showEditDialog = item;
						}}
						ondeleteclick={() => {
							showDeleteDialog = item;
						}}
						onitemclicked={() => {
							navigateToTopics(item);
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
	.container {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 20px;
		gap: 24px;
	}

	.back-stack-container {
		margin-bottom: 16px;
	}

	.data-container {
		display: flex;
		flex-direction: column;
		position: relative;
		gap: 20px;
	}

	.items-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 16px;
		width: 100%;
	}

	.loading-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 0;
		color: rgb(90, 90, 90);
	}

	.loading-text {
		margin-top: 12px;
		font-size: 0.95rem;
		color: rgb(90, 90, 90);
	}

	.empty-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 0;
		gap: 12px;
		color: rgb(120, 120, 120);
	}

	.empty-wrapper p {
		font-style: italic;
		font-weight: 400;
	}

	/* TableItem Cards */
	.items-container > :global(*) {
		background: white;
		border-radius: 12px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
		padding: 16px;
		transition:
			transform 0.1s ease,
			box-shadow 0.15s ease;
	}

	.items-container > :global(*:hover) {
		transform: translateY(-2px);
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
	}
</style>
