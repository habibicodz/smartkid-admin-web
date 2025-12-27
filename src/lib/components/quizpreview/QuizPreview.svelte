<script lang="ts">
	import type { Question } from '$lib/business/quizzes/QuizUtil';

	let { question }: { question: Question } = $props();
</script>

<div class="mobile-ui">
	<!-- Status Bar -->
	<div class="status-bar">
		<div class="time">12:45</div>
		<div class="status-icons">📶 🔋</div>
	</div>

	<!-- Header -->
	<div class="header">
		<h2>Quiz Preview</h2>
	</div>

	<!-- Body -->
	<div class="body">
		<h4 class="explain">Explain</h4>

		<div class="part-container question-container">
			{#if question.media_type === 'text'}
				<h3 class="question-text">{question.content}</h3>
			{/if}
		</div>

		<div class="part-container answer-container">Answer will be placed here</div>

		<div class="check-container">
			<h3>Check Answer</h3>
		</div>
	</div>

	<!-- Gesture Bar / Navigation -->
	<div class="gesture-bar"></div>
</div>

<style>
	:root {
		--border-color: #ccc;
		--primary-color: #4f8cff;
		--bg-color: #fff;
		--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: var(--font-family);
	}

	/* Scaled-down Mobile UI */
	.mobile-ui {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 320px; /* smaller width */
		height: 692px; /* proportional height */
		background-color: var(--bg-color);
		border: 2px solid var(--border-color);
		border-radius: 28px;
		overflow: hidden;
	}

	.status-bar {
		height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 12px;
		background-color: var(--bg-color);
		border-bottom: 1px solid var(--border-color);
		font-size: 0.7rem;
		color: #555;
	}

	.header {
		height: 52px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--bg-color);
		border-bottom: 1px solid var(--border-color);
	}

	.header h2 {
		font-size: 1.3rem;
		font-weight: 700;
		color: #333;
	}

	.question-text {
		max-width: 100%;
	}

	.body {
		display: flex;
		flex-direction: column;
		padding: 16px;
		gap: 12px;
		flex: 1;
		overflow-y: auto;
		align-items: center;
	}

	.explain {
		font-weight: 500;
		background-color: #f5f5f5;
		padding: 6px 12px;
		border-radius: 14px;
		font-size: 0.95rem;
		width: fit-content;
		text-align: center;
	}

	.part-container {
		width: 100%;
		padding: 16px;
		border: 1px solid var(--border-color);
		border-radius: 14px;
		background-color: #fafafa;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
	}
	.check-container {
		width: 100%;
	}

	.check-container h3 {
		width: 100%;
		padding: 10px 0;
		background-color: var(--primary-color);
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		text-align: center;
		border-radius: 12px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.check-container h3:hover {
		background-color: #3b6fd1;
	}

	.gesture-bar {
		height: 5px;
		margin: 6px 90px;
		background-color: #e3e3e3;
		border-radius: 3px;
	}
</style>
