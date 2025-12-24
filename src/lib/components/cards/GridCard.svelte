<script lang="ts">
	import { tick } from 'svelte';

	let {
		id,
		title,
		description,
		onitemclicked,
		oneditclick,
		ondeleteclick
	}: {
		id: string;
		title?: string;
		description?: string;
		onitemclicked?: (id: string) => void;
		oneditclick?: (id: string) => void;
		ondeleteclick?: (id: string, title?: string) => void;
	} = $props();

	let copied = $state(false);

	const copyId = async () => {
		if (!id) return;
		await navigator.clipboard.writeText(id);
		copied = true;
		await tick();
		setTimeout(() => (copied = false), 2000);
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card" onclick={() => onitemclicked?.(id)}>
	<!-- Top -->
	<div class="card-top">
		{#if copied}
			<span class="copied">Copied</span>
		{:else}
			<span
				class="id-text clickable"
				onclick={(e) => {
					e.stopPropagation();
					copyId();
				}}
			>
				{id}
			</span>
		{/if}
	</div>

	<!-- Center -->
	<div class="card-center">
		<h3 class="title">{title}</h3>
		{#if description}
			<p class="description">{description}</p>
		{/if}
	</div>

	<!-- Actions -->
	<div class="card-actions">
		{#if oneditclick}
			<button
				class="action-btn edit"
				onclick={(e) => {
					e.stopPropagation();
					oneditclick(id);
				}}
			>
				Edit
			</button>
		{/if}

		{#if ondeleteclick}
			<button
				class="action-btn delete"
				onclick={(e) => {
					e.stopPropagation();
					ondeleteclick(id, title);
				}}
			>
				Delete
			</button>
		{/if}
	</div>
</div>

<style>
	.card {
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 14px;
		padding: 16px 14px;

		display: flex;
		flex-direction: column;
		gap: 14px;

		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}

	/* ---------- Top ---------- */
	.card-top {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #9ca3af;
		user-select: none;
	}

	.id-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.clickable {
		cursor: pointer;
	}

	.clickable:active {
		transform: scale(0.96);
	}

	.copied {
		color: #16a34a;
		font-weight: 600;
	}

	/* ---------- Center ---------- */
	.card-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 6px;
	}

	.title {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #111827;
	}

	.description {
		margin: 0;
		font-size: 0.9rem;
		color: #6b7280;
		line-height: 1.4;
	}

	/* ---------- Actions ---------- */
	.card-actions {
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.action-btn {
		border-radius: 999px;
		padding: 6px 14px;
		font-size: 0.85rem;
		font-weight: 500;
		border: none;
		cursor: pointer;
		transition: transform 0.1s ease;
	}

	.action-btn:active {
		transform: scale(0.96);
	}

	.edit {
		background: #f3f4f6;
		color: #111827;
	}

	.delete {
		background: #fee2e2;
		color: #991b1b;
	}
</style>
