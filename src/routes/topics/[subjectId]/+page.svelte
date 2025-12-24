<script lang="ts">
	import { page } from '$app/state';
	import ActionButton from '$lib/components/buttons/ActionButton.svelte';
	import SectionHeader from '$lib/components/headers/SectionHeader.svelte';
	import ButtonLoader from '$lib/components/loader/ButtonLoader.svelte';
	import AlertDialog from '$lib/components/dialogs/AlertDialog.svelte';
	import GridCard from '$lib/components/cards/GridCard.svelte';
	import { goto } from '$app/navigation';
	import type { Tables } from '$lib/supabase_db/database.types';
	import {
		getSubjectById,
		getTopics,
		supabaseClient
	} from '$lib/supabase_db/client/supabaseClient';
	import AddTopicDialog from '$lib/components/dialogs/AddTopicDialog.svelte';
	import { deleteTopic } from '$lib/supabase_db/dbutil.remote';

	const subjectId: string = $derived(page.params.subjectId as string);
	let subject = $state<Tables<'subjects'> | null>(null);
	let topics = $state<Tables<'topics'>[] | null>(null);

	let showAddDialog = $state(false);
	let showEditDialog = $state<Tables<'topics'> | null>(null);
	let showDeleteDialog = $state<Tables<'topics'> | null>(null);
	let progress = $state(false);

	let subjectRequestId = 0;
	let topicRequestId = 0;

	const deleteMyTopic = async (topic: Tables<'topics'>) => {
		progress = true;
		await deleteTopic({ topic: topic });
		showDeleteDialog = null;
		progress = false;
	};

	const navigateToQuizzes = (item: Tables<'topics'>) => {
		goto(`/questions/${item.id}`);
	};

	/* Realtime updates */
	$effect(() => {
		const id = subjectId;
		const realtime = supabaseClient
			.channel('topics_realtime_channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'topics', filter: `subject_id=eq.${id}` },
				(payload) => {
					console.log('Insert detected');
					topics = [...(topics ?? []), payload.new as Tables<'topics'>];
				}
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'topics', filter: `subject_id=eq.${id}` },
				(payload) => {
					topics = (topics ?? []).map((s) =>
						s.id === payload.new.id ? (payload.new as Tables<'topics'>) : s
					);
				}
			)
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'topics' }, (payload) => {
				topics = (topics ?? []).filter((s) => s.id !== payload.old.id);
			});

		realtime.subscribe();
		return () => realtime.unsubscribe();
	});

	$effect(() => {
		const reqId = ++subjectRequestId;
		subject = null;
		getSubjectById(subjectId).then((result) => {
			if (reqId !== subjectRequestId) return;
			subject = result as Tables<'subjects'>;
		});
	});

	$effect(() => {
		const reqId = ++topicRequestId;
		subject = null;

		getTopics(subjectId).then((result) => {
			if (reqId !== topicRequestId) return;
			topics = result ?? [];
		});
	});
</script>

{#if showDeleteDialog != null}
	<AlertDialog
		title="Delete Topic?"
		description="Are you sure you want to delete {showDeleteDialog.name}? This action cannot be undone."
		onNegativeClicked={() => (showDeleteDialog = null)}
		onPositiveClicked={() => deleteMyTopic(showDeleteDialog!)}
		positiveLoading={progress}
	/>
{/if}

<div class="container">
	<div class="data-container">
		{#if topics === null}
			<div class="loading-wrapper">
				<ButtonLoader />
				<p class="loading-text">Loading topics...</p>
			</div>
		{:else if topics.length === 0}
			<div class="empty-wrapper">
				<p>No topics available</p>
				<ActionButton
					title="Add Topic"
					type="primary"
					showTypeByDefault
					onclick={() => (showAddDialog = true)}
				/>
			</div>
		{:else}
			<SectionHeader title="Topics">
				<ActionButton
					title="Add Topic"
					type="primary"
					showTypeByDefault
					onclick={() => (showAddDialog = true)}
				/>
			</SectionHeader>

			<div class="items-container">
				{#each topics as item (item.id)}
					<GridCard
						id={item.id}
						title={item.name}
						oneditclick={() => (showEditDialog = item)}
						ondeleteclick={() => (showDeleteDialog = item)}
						onitemclicked={() => navigateToQuizzes(item)}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if showAddDialog && subject}
	<AddTopicDialog {subject} onclose={() => (showAddDialog = false)} />
{/if}

{#if showEditDialog && subject}
	<AddTopicDialog topic={showEditDialog} {subject} onclose={() => (showEditDialog = null)} />
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		padding: 20px;
		gap: 24px;
	}

	.data-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.items-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 16px;
	}

	.loading-wrapper,
	.empty-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60px 0;
		color: rgb(120, 120, 120);
	}

	.loading-text {
		margin-top: 12px;
		font-size: 0.95rem;
	}

	.empty-wrapper p {
		font-style: italic;
	}
</style>
