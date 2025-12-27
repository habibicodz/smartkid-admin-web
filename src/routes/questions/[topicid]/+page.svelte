<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Tables } from '$lib/supabase_db/database.types';

	let topicid: string = $derived(page.params.topicid!);
	let questions = $state<Tables<'questions'>[]>([]);

	function addQuestion() {
		goto(`/questions/${topicid}/edit`);
	}

	const editQuestion = (question: Tables<'questions'>) => {
		goto(`/questions/${topicid}/edit?questionid=${question.id}`);
	};

	const deleteQuestion = (question: Tables<'questions'>) => {};

	const viewQuestion = (question: Tables<'questions'>) => {
		alert('Not yet implemented');
	};
</script>

<div class="page">
	<header class="header">
		<h1>Questions</h1>
		<button class="primary" onclick={addQuestion}> + Add Question </button>
	</header>

	<div class="table">
		<div class="table-header">
			<div>Type</div>
			<div>Question</div>
			<div>Created</div>
			<div></div>
		</div>

		{#if questions}
			{#each questions as q}
				<div class="table-row">
					<div class="type">{q.type}</div>
					<div class="content">{q.content}</div>
					<div class="date">
						{new Date(q.created_at).toLocaleDateString()}
					</div>
					<div class="actions">
						<button onclick={() => viewQuestion(q)}>View</button>
						<button onclick={() => editQuestion(q)}>Edit</button>
						<button class="danger" onclick={() => deleteQuestion(q)}> Delete </button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	:root {
		--border: #e5e7eb;
		--text: #111827;
		--muted: #6b7280;

		--primary: #2563eb;
		--primary-soft: #eff6ff;

		--danger: #dc2626;
		--danger-soft: #fef2f2;

		--row-hover: #f9fafb;
		--row-active: #f3f4f6;
	}

	.page {
		padding: 2rem;
		min-height: 100vh;
		color: var(--text);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.primary {
		background: var(--primary);
		color: white;
		border: none;
		padding: 0.6rem 1rem;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.15s ease,
			transform 0.05s ease;
	}

	.primary:hover {
		background: #1d4ed8;
	}

	.primary:active {
		transform: translateY(1px);
	}

	.table {
		border: 1px solid var(--border);
		border-radius: 10px;
		overflow: hidden;
	}

	.table-header,
	.table-row {
		display: grid;
		grid-template-columns: 100px 1fr 120px 180px;
		align-items: center;
	}

	.table-header {
		background: #f9fafb;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		border-bottom: 1px solid var(--border);
		padding: 0.75rem 1rem;
	}

	.table-row {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border);
		transition: background 0.15s ease;
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.table-row:hover {
		background: var(--row-hover);
	}

	.table-row:active {
		background: var(--row-active);
	}

	.type {
		font-size: 0.75rem;
		text-transform: uppercase;
		color: var(--muted);
	}

	.content {
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.date {
		font-size: 0.8rem;
		color: var(--muted);
	}

	.actions {
		display: flex;
		gap: 0.25rem;
		justify-content: flex-end;
	}

	.actions button {
		background: transparent;
		border: none;
		font-size: 0.85rem;
		cursor: pointer;
		padding: 0.35rem 0.6rem;
		border-radius: 6px;
		color: var(--primary);
		transition:
			background 0.15s ease,
			transform 0.05s ease;
	}

	.actions button:hover {
		background: var(--primary-soft);
	}

	.actions button:active {
		transform: translateY(1px);
	}

	.actions .danger {
		color: var(--danger);
	}

	.actions .danger:hover {
		background: var(--danger-soft);
	}
</style>
