<script lang="ts">
	let {
		title,
		isSelected = false,
		onclick
	}: { title: string; isSelected: boolean; onclick: () => void } = $props();
</script>

<button class={isSelected ? 'selected' : ''} {onclick}>
	{title}
</button>

<style>
	button {
		width: 100%;
		background-color: rgb(250, 250, 250);
		border: none;
		padding: 15px;
		border-radius: 10px;
		cursor: pointer;
		color: black;
		font-size: 1rem;
		text-align: left;
	}

	button:hover {
		background-color: rgb(241, 241, 241);
	}

	.selected {
		background-color: var(--color-primary);
		color: white;
	}

	.selected:hover {
		background-color: var(--color-primary-dark);
	}
</style>
