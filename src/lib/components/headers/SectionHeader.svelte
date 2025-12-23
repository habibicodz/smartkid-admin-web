<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		children
	}: {
		title: string;
		children?: Snippet;
	} = $props();
</script>

<div class="header">
	<div class="title-wrap">
		<h3 class="title">{title}</h3>
	</div>

	{#if children}
		<div class="actions">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		padding-bottom: 6px;
		margin-bottom: 14px;
	}

	.title-wrap {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 500;
		color: black;
		line-height: 1.2;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
