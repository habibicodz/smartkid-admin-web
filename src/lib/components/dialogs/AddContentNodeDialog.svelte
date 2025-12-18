<script lang="ts">
	import Dialog from './Dialog.svelte';
	let { onclose, grade = null }: { onclose: () => void; grade: {} | null } = $props();
	let isCreateNew = $derived(grade == null);
</script>

<Dialog {onclose}>
	<h3>
		{isCreateNew ? 'Create' : 'Update'} Grade
	</h3>

	<div class="input-group">
		<label for="name">Enter Grade Name</label>
		<input type="text" name="name" id="" />
	</div>

	<div class="input-group"></div>

	<div class="actions-container">
		<button>Cancel</button>

		<button type="submit">
			{isCreateNew ? 'Create' : 'Update'}
		</button>
	</div>
</Dialog>

<style>
	h3 {
		font-weight: normal;
		font-size: 1.2rem;
	}

	.actions-container {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.actions-container button {
		padding: 10px;
		min-width: 100px;
		border-radius: 5px;
		background-color: var(--color-primary);
		color: white;
		border: none;
	}
	.actions-container button:hover {
		cursor: pointer;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	input[type='text'] {
		background-color: rgb(231, 231, 231);
		border: none;
		border-radius: 5px;
		padding: 10px;
	}
</style>
