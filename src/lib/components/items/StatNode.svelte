<script lang="ts">
	const { title = 'Title', description = '0' }: { title?: string; description?: string } = $props();
</script>

<div class="container">
	<h3>{title}</h3>
	<h1>{description}</h1>
</div>

<style>
	.container {
		background-color: white;
		padding: 10px;
		padding: 30px;
		height: 100%;
	}
</style>
