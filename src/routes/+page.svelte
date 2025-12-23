<script>
	import StatNode from '$lib/components/items/StatNode.svelte';
	import { getTablesCount } from '$lib/supabase_db/client/supabaseClient';
	const counts = await getTablesCount();
</script>

<section class="container">
	<h1>Dashboard</h1>

	{#if counts != null}
		<div class="stats-container">
			<StatNode title="Total grades" description={`${counts[0].grades}`} />
			<StatNode title="Total Subjects" description={`${counts[0].subjects}`} />
			<StatNode title="Total Topics" description={`${counts[0].topics}`} />
			<StatNode title="Total Quizzes" description={`${counts[0].questions}`} />
		</div>
	{:else}
		<h1>Error getting data</h1>
	{/if}
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.stats-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}
</style>
