<script lang="ts">
	let { title, description }: { title?: string; description?: string } = $props();
</script>

<div class="item">
	<div class="content">
		<h3 class="title">{title}</h3>
		<p class="description">{description}</p>
	</div>

	<div class="actions"></div>
</div>

<style>
	.item {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: fit-content;
		padding: 10px;
		background-color: #f3f3f3;
		border-radius: 10px;
	}

	.item:hover {
		background-color: #e3e3e3;
		cursor: pointer;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.title {
		color: black;
		font-weight: normal;
		font-size: 1rem;
	}

	.actions {
		display: flex;
		flex-direction: row;
	}
</style>
