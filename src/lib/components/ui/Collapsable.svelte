<script lang="ts">
	let { title, items } = $props();
</script>

{#snippet item()}{/snippet}

<div>
	<h1>{title}</h1>
	{#each items as item}
		{@render item()}
	{/each}
</div>
