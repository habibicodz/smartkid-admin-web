<script lang="ts">
	import { tick } from 'svelte';
	let {
		id,
		name,
		itemcount,
		oneditclick,
		onitemclick
	}: {
		id: string;
		name: string;
		itemcount: number;
		onitemclick: (id: string) => void;
		oneditclick: (id: string) => void;
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
<div class="card" onclick={() => onitemclick(id)}>
	<!-- Top bar -->
	<div class="top">
		<span class="id">
			{#if copied}
				Copied!
			{:else}
				{#if id}
					<button
						class="copy-btn"
						aria-label="Copy ID"
						onclick={(elem) => {
							elem.stopPropagation();
							copyId();
						}}
					>
						📋
					</button>
				{/if}
				ID: {id}
			{/if}
		</span>

		<button
			class="edit-btn"
			aria-label="Edit"
			onclick={(elem) => {
				elem.stopPropagation();
				oneditclick(id);
			}}
		>
			✎
		</button>
	</div>

	<!-- Main content -->
	<div class="content">
		<h2 class="name">{name}</h2>
		<p class="meta">{itemcount} items</p>
	</div>
</div>

<style>
	.card {
		background: #ffffff;
		border: 1px solid #e5e7eb;
		border-radius: 14px;
		padding: 14px 16px 18px;
		transition:
			border-color 0.2s ease,
			transform 0.1s ease,
			box-shadow 0.1s ease;
		cursor: pointer;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
	}

	.card:hover {
		border-color: #d1d5db;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	.card:active {
		transform: translateY(1px);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.id {
		font-size: 12px;
		color: #9ca3af;
		user-select: none;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.copy-btn {
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 12px;
		color: #6b7280;
		padding: 4px;
		border-radius: 6px;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.copy-btn:hover {
		background: #f3f4f6;
		color: #111827;
	}

	.edit-btn {
		border: none;
		background: transparent;
		font-size: 14px;
		color: #6b7280;
		cursor: pointer;
		padding: 4px;
		border-radius: 6px;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}

	.edit-btn:hover {
		background: #f3f4f6;
		color: #111827;
	}

	.content {
		text-align: center;
	}

	.name {
		font-size: 18px;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}

	.meta {
		margin-top: 4px;
		font-size: 13px;
		color: #6b7280;
	}
</style>
