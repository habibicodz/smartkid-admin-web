<script lang="ts">
	import type { Tables, TablesInsert } from '$lib/supabase_db/database.types';
	import { createSubject } from '$lib/supabase_db/dbutil.remote';
	import ButtonLoader from '../loader/ButtonLoader.svelte';
	import Dialog from './Dialog.svelte';

	let {
		onclose,
		grade,
		subject = null
	}: {
		onclose: () => void;
		grade: Tables<'grades'>;
		subject?: Tables<'subjects'> | null;
	} = $props();

	let isProgress = $state(false);
	let isCreateNew = $derived(subject == null);
	let subjectName = $state('');

	const submitOrCreateSubject = async () => {
		if (isProgress) return;

		if (!subjectName || subjectName.length == 0) {
			console.log('Invalid subject name');
			return;
		}

		isProgress = true;
		if (subject != null) {
			throw '';
		}

		const newSubject: TablesInsert<'subjects'> = {
			id: undefined,
			grade_id: grade.id,
			created_at: new Date().toISOString(),
			icon_key: '',
			name: subjectName
		};

		await createSubject({
			subject: newSubject
		});
		isProgress = false;
		onclose();
	};
</script>

<Dialog {onclose}>
	<h3>
		{isCreateNew ? 'Create' : 'Update'} Subject
	</h3>

	<div class="input-group">
		<label for="name">Enter Subject Name</label>
		<input autocomplete="off" type="text" bind:value={subjectName} name="name" id="" />
	</div>

	<div class="actions-container">
		<button class="btn cancel-btn" onclick={onclose}>Cancel</button>

		<button class="btn" onclick={submitOrCreateSubject}>
			{isCreateNew ? 'Create' : 'Update'}
			{#if isProgress}
				<ButtonLoader class="loader" />
			{/if}
		</button>
	</div>
</Dialog>

<style>
	.actions-container :global {
		.loader {
			justify-self: flex-end;
			width: 20px;
			height: 20px;
		}
	}

	h3 {
		font-weight: normal;
		font-size: 1.2rem;
	}

	.actions-container {
		display: flex;
		justify-content: end;
		flex-direction: row;
		gap: 10px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 10px;
		min-width: 100px;
		min-height: 40px;
		border-radius: 5px;
		background-color: var(--color-primary);
		color: white;
		border: none;
		gap: 10px;
		font-size: 1rem;
	}

	.btn:hover {
		cursor: pointer;
		background-color: var(--color-primary-dark);
	}

	.cancel-btn {
		background-color: rgb(243, 243, 243) !important;
		color: black !important;
	}
	.cancel-btn:hover {
		background-color: rgb(231, 231, 231) !important;
	}

	input[type='text'] {
		background-color: rgb(243, 243, 243);
		border: none;
		border-radius: 5px;
		padding: 10px;
		color: black;
		font-size: 1rem;
	}
</style>
