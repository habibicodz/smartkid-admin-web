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
	class:selected={isSelected}
	class:stripped={border === 'stripped'}
	onclick={onclick}
>
	<span class="title">{title}</span>

	{#if icon}
		<img class="icon" src={icon} alt="" aria-hidden="true" />
	{/if}
</button>

<style>
	button {
		width: 100%;
		padding: 14px 16px;

		background-color: rgb(250, 250, 250);
		border: none;
		border-radius: 10px;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;

		cursor: pointer;

		color: black;
		font-size: 1rem;
		text-align: left;

		transition:
			background-color 0.15s ease,
			transform 0.08s ease;
	}

	/* hover (only when not selected) */
	button:not(.selected):hover {
		background-color: rgb(241, 241, 241);
	}

	/* press feedback */
	button:active {
		transform: scale(0.985);
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

	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		opacity: 0.8;
	}
</style>
