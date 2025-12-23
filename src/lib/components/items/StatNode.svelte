<script lang="ts">
	const { title = 'Title', description = '0' }: { title?: string; description?: string } = $props();
</script>

<div class="container">
	<h3 class="title">{title}</h3>
	<h1 class="value">{description}</h1>
</div>

<style>
	.container {
		padding: 20px 24px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 6px;

		background-color: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

		transition: transform 0.1s ease, box-shadow 0.1s ease;
	}

	/* subtle hover lift for interactivity */
	.container:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
	}

	.title {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 500;
		color: rgb(90, 90, 90);
		letter-spacing: 0.5px;
	}

	.value {
		margin: 0;
		font-size: 2rem;
		font-weight: 600;
		color: black;
		line-height: 1.1;
	}
</style>
