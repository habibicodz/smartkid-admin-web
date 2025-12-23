<script lang="ts">
	let {
		title,
		icon,
		type = 'normal',
		onclick
	}: {
		title?: string;
		icon?: string;
		type?: 'primary' | 'warning' | 'normal';
		onclick: () => void;
	} = $props();
</script>

<button class="btn {type}" onclick={onclick}>
	{#if icon}
		<img class="icon" src={icon} alt="" aria-hidden="true" />
	{/if}

	{#if title}
		<span class="title">{title}</span>
	{/if}
</button>

<style>
	.btn {
		position: relative;
		padding: 10px 14px;
		min-height: 36px;

		border: none;
		border-radius: 8px;

		display: inline-flex;
		align-items: center;
		gap: 8px;

		font-size: 0.95rem;
		cursor: pointer;

		background-color: rgb(247, 247, 247);
		color: black;

		transition:
			transform 0.08s ease,
			box-shadow 0.12s ease;
	}

	/* overlay */
	.btn::after {
		content: '';
		position: absolute;
		inset: 0;
		background: black;
		opacity: 0;
		border-radius: inherit;
		pointer-events: none;
		transition: opacity 120ms ease;
	}

	.btn:hover::after {
		opacity: 0.12;
	}

	.btn:active {
		transform: scale(0.96);
	}

	.primary {
		background-color: rgb(67, 135, 244);
		color: white;
	}

	.warning {
		background-color: rgb(244, 67, 85);
		color: white;
	}

	.normal {
		background-color: rgb(247, 247, 247);
		color: black;
	}

	.icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	.title {
		white-space: nowrap;
	}
</style>
