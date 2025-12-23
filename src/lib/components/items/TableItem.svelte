<script lang="ts">
	import ArrowIcon from '$lib/assets/arrow-right.svg';
	import EditIcon from '$lib/assets/edit.svg';
	import ActionButton from '$lib/components/buttons/ActionButton.svelte';

	let {
		id,
		title,
		description,
		onitemclicked,
		oneditclick
	}: {
		id: string;
		title?: string;
		description?: string;
		onitemclicked?: (id: string) => void;
		oneditclick?: () => void;
	} = $props();
</script>

<div class="item">
	<div class="content">
		<h3 class="title">{title}</h3>

		{#if description}
			<p class="description">{description}</p>
		{/if}
	</div>

	{#if oneditclick || onitemclicked}
		<div class="actions">
			{#if oneditclick}
				<ActionButton icon={EditIcon} onclick={oneditclick} />
			{/if}

			{#if onitemclicked}
				<ActionButton
					icon={ArrowIcon}
					onclick={() => onitemclicked(id)}
				/>
			{/if}
		</div>
	{/if}
</div>

<style>
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;

		width: 100%;
		padding: 16px 18px;

		background-color: white;
		border-radius: 12px;

		transition: transform 0.15s ease, box-shadow 0.15s ease;
	}

	/* subtle depth on hover */
	.item:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 6px;

		min-width: 0; /* prevents overflow issues */
	}

	.title {
		margin: 0;
		color: black;
		font-size: 1.15rem;
		font-weight: 500;
		line-height: 1.3;
	}

	.description {
		margin: 0;
		color: black;
		font-size: 0.9rem;
		opacity: 0.7;
		line-height: 1.4;

		/* optional truncation safety */
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
	}
</style>
