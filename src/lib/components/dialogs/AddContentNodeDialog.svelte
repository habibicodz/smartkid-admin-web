<script lang="ts">
	import Dialog from './Dialog.svelte';
	let { onclose, grade = null }: { onclose: () => void; grade: {} | null } = $props();
	let isCreateNew = $derived(grade == null);
</script>

<form method="POST" action="?/create_grade">
	<Dialog {onclose}>
		<h3>
			{isCreateNew ? 'Create' : 'Update'} Grade
		</h3>

		<div class="input-group">
			<label for="name">Enter Grade Name</label>
			<input type="text" name="name" id="" />
		</div>

		<div class="actions-container">
			<button class="cancel-btn" onclick={onclose}>Cancel</button>

			<button type="submit">
				{isCreateNew ? 'Create' : 'Update'}
			</button>
		</div>
	</Dialog>
</form>

<style>
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

	.cancel-btn {
		background-color: rgb(224, 224, 224) !important;
		color: black !important;
	}

	input[type='text'] {
		background-color: rgb(231, 231, 231);
		border: none;
		border-radius: 5px;
		padding: 10px;
		color: black;
		font-size: 1rem;
	}
</style>
