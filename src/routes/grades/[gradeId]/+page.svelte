<script lang="ts">
	import { page } from '$app/state';
	import DataContainer from '$lib/components/container/DataContainer.svelte';
	import AddSubjectDialog from '$lib/components/dialogs/AddSubjectDialog.svelte';
	import SubjectsListHeader from '$lib/components/headers/SubjectsListHeader.svelte';
	import TableItem from '$lib/components/items/TableItem.svelte';
	import BackStackComponent from '$lib/components/ui/BackStackComponent.svelte';
	import {
		getGradeById,
		getSubjects,
		supabaseClient
	} from '$lib/supabase_db/client/supabaseClient';
	import type { Tables } from '$lib/supabase_db/database.types';

	/* reactive param */
	const gradeId: string = $derived(page.params.gradeId as string);

	/* state */
	let grade = $state<Tables<'grades'> | null>(null);
	let subjects = $state<Tables<'subjects'>[] | null | undefined>(undefined);
	let showAddDialog = $state(false);

	/* prevents async overwrites */
	let subjectRequestId = 0;
	let gradeRequestId = 0;

	/* enable realtime */

	$effect(() => {
		const id = gradeId;
		console.log('Listening for grade: ' + id);
		const realtime = supabaseClient.channel('subject_realtime_channel').on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'subjects',
				filter: `grade_id=eq.${id}`
			},
			(payload) => {
				const result = payload.new as Tables<'subjects'>;
				console.log(`log: ${result}`);
				subjects?.push(result);
			}
		);

		realtime.subscribe();

		return () => {
			realtime.unsubscribe();
		};
	});

	/* load grade */
	$effect(() => {
		const id = gradeId;
		const reqId = ++gradeRequestId;

		grade = null;

		getGradeById(id).then((result) => {
			if (reqId !== gradeRequestId) return;
			grade = result as Tables<'grades'>;
		});
	});

	/* load subjects */
	$effect(() => {
		const id = gradeId;
		const reqId = ++subjectRequestId;

		subjects = undefined;

		getSubjects(id).then((result) => {
			if (reqId !== subjectRequestId) return;
			subjects = result;
		});
	});
</script>

{#snippet SubjectsData(data: Tables<'subjects'>[])}
	<SubjectsListHeader
		onAddClicked={() => {
			showAddDialog = true;
		}}
	/>

	<div class="items-container">
		{#each data as item}
			<TableItem title={item.name} />
		{/each}
	</div>
{/snippet}

{#if showAddDialog && grade}
	<AddSubjectDialog
		{grade}
		onclose={() => {
			showAddDialog = false;
		}}
	/>
{/if}

<div class="container">
	<div class="back-stack-container">
		{#if grade}
			<BackStackComponent
				items={[
					{ key: grade.id, value: grade.name },
					{ key: 'wqe', value: 'sd' }
				]}
			/>
		{/if}
	</div>

	<DataContainer>
		<div class="data-container">
			{#if subjects == undefined}
				<h3>Loading your data</h3>
			{:else if subjects == null}
				<h3>Error loading data</h3>
			{:else}
				{@render SubjectsData(subjects)}
			{/if}
		</div>
	</DataContainer>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.data-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.items-container {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
