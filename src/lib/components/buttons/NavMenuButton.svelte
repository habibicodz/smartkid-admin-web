<script lang="ts">
	const {
		text,
		isSelected = false,
		onclick
	}: {
		text: string;
		isSelected?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<button class={isSelected ? 'selected' : null} {onclick}>
	{text}
</button>

<style>
	button {
		width: max-content;
		color: black;
		font-weight: bold;
		padding: 10px 20px;
		display: flex;
		background-color: white;
		border: none;
		align-items: center;
	}

	button:hover {
		cursor: pointer;
		background-color: rgba(217, 217, 217, 0.9);
	}

	.selected {
		background-color: var(--color-primary);
		color: white;
	}

	.selected:hover {
		background-color: var(--color-primary-dark);
		color: white;
	}
</style>
