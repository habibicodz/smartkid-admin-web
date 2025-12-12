<script>
	import StatNode from '$lib/components/items/StatNode.svelte';
	import { grades } from '$lib/utils/fakedata';
</script>

<section class="container">
	<h1>Dashboard</h1>
	<div class="stats-container">
		<StatNode title="Total grades" description={`${grades.length}`} />
		<StatNode title="Total Subjects" />
		<StatNode title="Total Topics" />
		<StatNode title="Total Quizzes" />
	</div>
</section>

<style>
	.container {
		padding: 50px;
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
