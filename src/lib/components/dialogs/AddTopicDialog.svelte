<script lang="ts">
	import type { Tables, TablesInsert, TablesUpdate } from '$lib/supabase_db/database.types';
	import { createSubject, createTopic, updateSubject, updateTopic } from '$lib/supabase_db/dbutil.remote';
	import Dialog from './Dialog.svelte';
	import ButtonLoader from '../loader/ButtonLoader.svelte';

	let {
		onclose,
		subject,
		topic = null
	}: {
		onclose: () => void;
		subject: Tables<'subjects'>;
		topic?: Tables<"topics"> | null
	} = $props();

	let isLoading = $state(false);
	let isCreateNew = $derived(topic == null);
	let topicName = $derived(topic?.name ?? '');

	const submit = async () => {
		if (isLoading) return;

		const name = topicName.trim();
		if (!name) return;

		isLoading = true;

		let ok = false;

		if (isCreateNew) {
			ok = await createTopic({
				topic: {
					id: undefined,
					subject_id: subject.id,
					created_at: new Date().toISOString(),
					icon_key: '',
					name
				} as TablesInsert<'topics'>
			});
		} else if (subject && subject.name !== name) {
			ok = await updateTopic({
				topic: { ...topic, name } as TablesUpdate<'subjects'>
			});
		} else {
			ok = true;
		}

		isLoading = false;
		if (ok) onclose();
	};
</script>

<Dialog {onclose}>
	<div class="isolated-dialog">
		<h3 class="title">{isCreateNew ? 'Create Topic' : 'Update Topic'}</h3>

		<!-- ID (only when updating) -->
		{#if !isCreateNew && topic}
			<div class="field id-field">
				<label for="id">Topic ID</label>
				<input name="id" type="text" value={topic.id} disabled />
			</div>
		{/if}

		<div class="field">
			<label for="name">Topic Name</label>
			<input
				type="text"
				name="name"
				bind:value={topicName}
				disabled={isLoading}
				placeholder="Enter subject name"
			/>
		</div>

		<div class="actions">
			<button class="btn ghost" onclick={onclose} disabled={isLoading}>
				Cancel
			</button>
			<button class="btn primary" onclick={submit} disabled={isLoading}>
				{isCreateNew ? 'Create' : 'Update'}
			</button>
		</div>

		{#if isLoading}
			<div class="loading">
				<ButtonLoader />
			</div>
		{/if}
	</div>
</Dialog>

<style>
	.isolated-dialog {
		background-color: white;
		border-radius: 14px;
		box-shadow: 0 16px 36px rgba(0,0,0,0.15);
		padding: 28px 24px;
		min-width: 380px;
		max-width: 480px;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 18px;
		color: black;
	}

	.title {
		margin: 0;
		font-size: 1.3rem;
		font-weight: 600;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label {
		font-size: 0.85rem;
		color: rgb(90, 90, 90);
	}

	input {
		background: rgb(245, 245, 245);
		border: 1px solid transparent;
		border-radius: 8px;
		padding: 10px 12px;
		font-size: 1rem;
		color: black;
		outline: none;
		transition: box-shadow 120ms ease, border-color 120ms ease;
	}

	input:focus {
		box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.4);
		border-color: var(--color-primary);
	}

	input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* ID field subtle differentiation */
	.id-field input {
		font-size: 0.85rem;
		color: rgb(120, 120, 120);
		letter-spacing: 0.2px;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	.btn {
		min-width: 96px;
		height: 38px;
		border-radius: 8px;
		border: none;
		font-size: 0.95rem;
		cursor: pointer;
		transition: all 120ms ease;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.primary {
		background: var(--color-primary);
		color: white;
		font-weight: 600;
	}

	.primary:hover:not(:disabled) {
		background: var(--color-primary-dark);
	}

	.ghost {
		background: rgb(245, 245, 245);
		color: black;
	}

	.ghost:hover:not(:disabled) {
		background: rgb(235, 235, 235);
	}

	.loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 14px;
	}
</style>
