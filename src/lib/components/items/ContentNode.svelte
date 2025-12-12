<script lang="ts">
	const {
		title = 'Item name',
		id = 'example_id'
	}: {
		title?: string;
		id?: string;
	} = $props();
</script>

<div class="container">
	<p class="item-id">#{id}</p>
	<h3 class="item-title">{title}</h3>
</div>

<style>
	.container {
		position: relative;
		padding: 10px;
		background-color: white;
		border-radius: 10px;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: black;
	}

	.container:hover {
		background-color: rgb(250, 250, 250);
		cursor: pointer;
	}

	.item-id {
		font-size: 0.8rem;
        color: rgb(91, 91, 91);
	}
</style>
