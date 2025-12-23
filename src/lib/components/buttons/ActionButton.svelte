<script lang="ts">
	let {
		title,
		icon,
		type = 'normal',
		shape = 'default',
		showTypeByDefault = false,
		onclick
	}: {
		title?: string;
		icon?: string;
		type?: 'normal' | 'primary' | 'warning' | 'danger';
		shape?: 'default' | 'round' | 'square';
		showTypeByDefault?: boolean;
		onclick: () => void;
	} = $props();
</script>

<button
	class="btn {type} {shape} {showTypeByDefault ? 'show-default' : ''}"
	onclick={onclick}
>
	{#if title}
		<span class="title">{title}</span>
	{/if}
	
	{#if icon}
		<img class="icon" src={icon} alt="" aria-hidden="true" />
	{/if}	
</button>

<style>
	.btn {
		position: relative;
		padding: 10px 14px;
		min-height: 36px;

		border: none;

		display: inline-flex;
		align-items: center;
		gap: 8px;

		font-size: 0.95rem;
		cursor: pointer;

		background-color: rgb(230, 230, 230);
		color: rgb(40, 40, 40);
		transition:
			transform 0.08s ease,
			box-shadow 0.12s ease,
			background-color 0.2s ease,
			color 0.2s ease,
			border-radius 0.12s ease;
	}

	/* Shape */
	.default { border-radius: 8px; }
	.round { border-radius: 9999px; }
	.square { border-radius: 6px; }

	.btn:active { transform: scale(0.96); }

	.icon { width: 12px; height: 12px; flex-shrink: 0; }

	.title { white-space: nowrap; }

	/* Hover colors */
	.primary:hover { background-color: rgb(67, 135, 244); color: white; }
	.warning:hover { background-color: rgb(244, 196, 67); color: black; }
	.danger:hover { background-color: rgb(244, 67, 85); color: white; }
	.normal:hover { background-color: rgb(200, 200, 200); color: rgb(40, 40, 40); }

	/* Show type colors by default if prop is true */
	.show-default.primary { background-color: rgb(67, 135, 244); color: white; }
	.show-default.warning { background-color: rgb(244, 196, 67); color: black; }
	.show-default.danger { background-color: rgb(244, 67, 85); color: white; }
	.show-default.normal { background-color: rgb(200, 200, 200); color: rgb(40, 40, 40); }
</style>
