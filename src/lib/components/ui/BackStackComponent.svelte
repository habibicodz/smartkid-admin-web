<script lang="ts">
	let {
		items = []
	}: {
		items: {
			key: string;
			value: string;
		}[];
	} = $props();
</script>

{#snippet ItemView(name: string)}
	<h3>{` ${name} `}</h3>
{/snippet}

<div class="container">
	{#each items as item, index}
		{@render ItemView(item.value)}
		{#if index < items.length - 1}
			&nbsp;{'→'}&nbsp;
		{/if}
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}
</style>
