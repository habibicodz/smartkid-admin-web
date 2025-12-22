<script lang="ts">
	let { onAddClicked }: { onAddClicked: () => void } = $props();
</script>

{#snippet ActionButton(title: string, type: 'primary' | 'warning' | 'normal', onclick: () => void)}
	<button class="btn {type}" {onclick}>{title}</button>
{/snippet}

<div class="header">
	<h3 class="title">Subjects</h3>
	<div class="actions">
		{@render ActionButton('Add Subjects', 'primary', onAddClicked)}
	</div>
</div>

<style>
	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.btn {
		position: relative;
		background-color: #e3e3e3;
		color: black;
		overflow: hidden;
	}

	/* overlay */
	.btn::after {
		content: '';
		position: absolute;
		inset: 0;
		background: black;
		opacity: 0;
		transition: opacity 100ms ease;
		pointer-events: none; /* clicks pass through */
	}

	/* hover effect */
	.btn:hover::after {
		opacity: 0.12; /* adjust darkness */
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
</style>
