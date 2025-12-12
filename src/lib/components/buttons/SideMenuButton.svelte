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
		background-color: rgb(247, 247, 247);
		border: none;
		padding: 20px;
		border-radius: 10px;
		cursor: pointer;
		color: black;
		font-weight: bold;
		font-size: 1rem;
		text-align: left;
	}

	button:hover {
		background-color: rgb(241, 241, 241);
	}

	.selected {
		color: white;
		background-color: var(--color-primary);
	}

	.selected:hover {
		color: white;
	}
</style>
