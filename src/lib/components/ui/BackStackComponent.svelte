<script lang="ts">
	let {
		items = [],
		onItemClick = (item: { key: string; value: string }) => {}
	}: {
		items: { key: string; value: string }[];
		onItemClick?: (item: { key: string; value: string }) => void;
	} = $props();
</script>

<div class="container">
	{#each items as item, index}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span class="item" onclick={() => onItemClick(item)}>
			{item.value}
		</span>
		{#if index < items.length - 1}
			<span class="separator">→</span>
		{/if}
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px;
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		color: #555;
	}

	.item {
		position: relative;
		padding: 4px 6px;
		border-radius: 4px;
		transition: background 0.2s, color 0.2s;
		cursor: pointer;
		user-select: none;
	}

	.item:hover {
		background-color: rgba(0, 0, 0, 0.05);
		color: #222;
	}

	.separator {
		color: #aaa;
		margin: 0 4px;
		user-select: none;
	}

	@media (max-width: 600px) {
		.container {
			font-size: 0.85rem;
		}
	}
</style>
