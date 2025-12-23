<script lang="ts">
	import type { Tables } from '$lib/supabase_db/database.types';
	import { createGrade } from '$lib/supabase_db/dbutil.remote';
	import Dialog from './Dialog.svelte';
	import ButtonLoader from '../loader/ButtonLoader.svelte';

	let { onclose, grade = null }: { onclose: () => void; grade: Tables<'grades'> | null } = $props();

	let gradeName = $state('');
	let gradeNumber = $state<number | ''>('');
	let isLoading = $state(false);
	let isCreateNew = $derived(grade == null);

	const submit = async () => {
		if (!gradeName.trim() || gradeNumber === '' || isLoading) return;

		if (gradeNumber < 1 || gradeNumber > 10) {
			alert('Grade number must be between 1 and 10');
			return;
		}

		isLoading = true;
		await createGrade({
			name: gradeName,
			number: gradeNumber
		});
		isLoading = false;
		onclose();
	};
</script>
<Dialog {onclose}>
	<div class="isolated-dialog">
		<h3 class="title">{isCreateNew ? 'Create' : 'Update'} Grade</h3>

		<div class="field">
			<label for="number">Grade Number (1 - 10)</label>
			<input
				id="number"
				type="number"
				bind:value={gradeNumber}
				min="1"
				max="10"
				placeholder="Enter grade number"
				disabled={isLoading}
			/>
		</div>

		<div class="field">
			<label for="name">Grade Name</label>
			<input
				id="name"
				type="text"
				bind:value={gradeName}
				placeholder="Enter grade name"
				disabled={isLoading}
			/>
		</div>

		<div class="actions">
			<button class="btn ghost" onclick={onclose} disabled={isLoading}>Cancel</button>
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
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
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
		display: flex;
		align-items: center;
		justify-content: center;
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

	/* Loading overlay covering the entire dialog */
	.loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 14px;
		z-index: 10;
	}
</style>
