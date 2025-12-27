<script lang="ts">
	let questions = $state<Question[]>([]);

	interface Option {
		id: string;
		content: string;
	}
	interface Pair {
		left: string;
		right: string;
	}
	interface Answer {
		type: 'text' | 'image' | 'pair' | 'number';
		options?: Option[];
		content?: string;
		is_correct?: boolean;
		pair?: Pair;
		meta: object;
	}
	interface Context {
		id: string;
		type: string;
		content: string;
		meta: object;
	}
	interface Question {
		id: string;
		type: 'mcq' | 'true_false' | 'input' | 'match';
		content: string;
		difficulty: number;
		active: boolean;
		answer: Answer;
		context: Context;
	}

	function addQuestion() {
		questions = [
			...questions,
			{
				id: crypto.randomUUID(),
				type: 'mcq',
				content: '',
				difficulty: 1,
				active: true,
				answer: { type: 'text', options: [{ id: crypto.randomUUID(), content: '' }], meta: {} },
				context: { id: crypto.randomUUID(), type: 'hint', content: '', meta: {} }
			}
		];
	}

	function addOption(qIndex: number) {
		const opts = questions[qIndex].answer.options ?? [];
		if (opts.length >= 4) return;
		questions[qIndex].answer.options = [...opts, { id: crypto.randomUUID(), content: '' }];
	}

	function removeOption(qIndex: number, oIndex: number) {
		questions[qIndex].answer.options =
			questions[qIndex].answer.options?.filter((_, i) => i !== oIndex) ?? [];
	}

	

	function ensureMatchPair(qIndex: number) {
		if (!questions[qIndex].answer.pair) questions[qIndex].answer.pair = { left: '', right: '' };
	}

	function saveAll() {
		console.log('Saving questions:', questions);
	}
</script>

<div class="container">
	<h2>Quiz Admin Panel</h2>
	<button on:click={addQuestion}>Add Question</button>

	{#each questions as question, qIndex}
		<div class="question-card">
			<label>Question Content</label>
			<textarea bind:value={question.content} placeholder="Enter question"></textarea>

			<label>Question Type</label>
			<select bind:value={question.type}>
				<option value="mcq">MCQ</option>
				<option value="true_false">True/False</option>
				<option value="input">Input</option>
				<option value="match">Match</option>
			</select>

			<label>Difficulty</label>
			<input type="number" min="1" max="5" bind:value={question.difficulty} />

			<label>Active</label>
			<input type="checkbox" bind:checked={question.active} />

			{#if question.type === 'mcq'}
				<h4>MCQ Options (max 4)</h4>
				{#each question.answer.options ?? [] as option, oIndex}
					<div class="option-card">
						<input
							type="text"
							placeholder={question.answer.type === 'image' ? 'Image URL' : 'Option text'}
							bind:value={option.content}
						/>
						<button on:click={() => removeOption(qIndex, oIndex)}>✕</button>
					</div>
				{/each}
				<button
					on:click={() => addOption(qIndex)}
					disabled={(question.answer.options?.length ?? 0) >= 4}>Add Option</button
				>
			{:else if question.type === 'true_false'}
				<h4>Answer</h4>
				<input type="text" bind:value={question.answer.content} placeholder="True or False" />
				<label>Correct?</label>
				<input type="checkbox" bind:checked={question.answer.is_correct} />
			{:else if question.type === 'input'}
				<h4>Answer</h4>
				<input
					type={question.answer.type === 'number' ? 'number' : 'text'}
					bind:value={question.answer.content}
					placeholder="Enter answer"
				/>
			{:else if question.type === 'match'}
				{ensureMatchPair(qIndex)}
				<h4>Matching Pair</h4>
				<div class="option-card">
					<input
						type="text"
						placeholder="Left"
						bind:value={question.answer.pair.left}
						on:input={(e) =>
							(question.answer.pair = { ...question.answer.pair, left: e.currentTarget.value })}
					/>
					<input
						type="text"
						placeholder="Right"
						bind:value={question.answer.pair.right}
						on:input={(e) =>
							(question.answer.pair = { ...question.answer.pair, right: e.currentTarget.value })}
					/>
				</div>
			{/if}

			<h4>Context</h4>
			<div class="option-card">
				<input type="text" placeholder="Context type" bind:value={question.context.type} />
				<input type="text" placeholder="Context content" bind:value={question.context.content} />
			</div>
		</div>
	{/each}

	<button on:click={saveAll}>Save All Changes</button>
</div>

<style>
	:global(body) {
		background: #f9f9f9;
		font-family: 'Inter', sans-serif;
		color: #222;
		margin: 0;
	}
	.container {
		max-width: 900px;
		margin: 2rem auto;
		padding: 1rem;
	}
	h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}
	.question-card {
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 10px;
		padding: 1rem 1.5rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}
	.question-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
	}
	input,
	select,
	textarea {
		width: 100%;
		padding: 0.5rem;
		margin-top: 0.2rem;
		margin-bottom: 0.5rem;
		border-radius: 6px;
		border: 1px solid #ccc;
		background: #fff;
		color: #222;
		font-size: 0.95rem;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}
	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: #4a90e2;
		box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
	}
	label {
		display: block;
		font-weight: 500;
		font-size: 0.95rem;
		margin-top: 0.6rem;
	}
	button {
		background: #4a90e2;
		color: white;
		padding: 0.55rem 1.1rem;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		margin-top: 0.5rem;
		font-weight: 500;
		font-size: 0.95rem;
		transition:
			background 0.2s,
			transform 0.1s;
	}
	button:hover {
		background: #357abd;
		transform: translateY(-1px);
	}
	button:active {
		transform: translateY(1px);
		background: #2d6399;
	}
	button:disabled {
		background: #aaa;
		cursor: not-allowed;
		transform: none;
	}
	.option-card {
		border: 1px solid #eee;
		padding: 0.45rem;
		margin-top: 0.3rem;
		border-radius: 6px;
		background: #fafafa;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		transition: background 0.15s;
	}
	.option-card:hover {
		background: #f2f2f2;
	}
	.option-card input {
		flex: 1;
	}
</style>
