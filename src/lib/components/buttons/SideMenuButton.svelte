<script lang="ts">
	let {
		title,
		border = 'none',
		isSelected = false,
		icon,
		onclick
	}: {
		title: string;
		border?: 'stripped' | 'none';
		isSelected: boolean;
		icon?: string;
		onclick: () => void;
	} = $props();
</script>

<button
	class={`${isSelected ? 'selected' : ''} ${border == 'stripped' ? 'stripped' : ''}`}
	{onclick}
>
	<span>{title}</span>
	{#if icon}
		<img class="icon" src={icon} alt="Icon" />
	{/if}
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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

	.stripped {
		border: 2px dashed rgb(185, 185, 185);
	}

	.icon {
		width: 16px;
		height: 16px;
	}
</style>
