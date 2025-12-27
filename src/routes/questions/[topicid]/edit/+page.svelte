<script lang="ts">
	import { page } from '$app/state';
	import { type Answer, type Option, type Question } from '$lib/business/quizzes/QuizUtil';
	import ActionButton from '$lib/components/buttons/ActionButton.svelte';
	import OptionButton from '$lib/components/option/OptionButton.svelte';
	import QuizPreview from '$lib/components/quizpreview/QuizPreview.svelte';
	/**
	 * Page State
	 */
	let questionId = $derived(page.url.searchParams.get('questionid'));
	let isNew = $derived(questionId == null);

	let options: Option[] = $state([]);
	let answer: Answer = $state({
		type: 'text',
		options: options,
		content: '',
		is_correct: undefined,
		meta: {}
	});

	let question: Question = $state({
		id: '',
		type: 'scq',
		media_type: 'text',
		media_url: undefined,
		font_key: undefined,
		content: '',
		answer: answer
	});

	function addOption() {
		const newOption: Option = {
			id: '',
			content: ''
		};
		question.answer.options = [...(question.answer.options ?? []), newOption];
	}

	function removeOption(oIndex: number) {
		question.answer.options =
			question.answer.options?.filter((_value, index, _array) => index !== oIndex) ?? [];
	}
</script>

{#snippet QuestionContainer()}
	<div class="question-container">
		<div class="section-group">
			<h3 class="section-title">Select Question Type</h3>
			<div class="button-option-group">
				<OptionButton
					isChecked={question.type === 'mcq'}
					onclick={(option) => (question.type = 'mcq')}
					option={{ id: 'mcq', content: 'Multi Choice' }}
				/>
				<OptionButton
					isChecked={question.type === 'scq'}
					onclick={(option) => (question.type = 'scq')}
					option={{ id: 'scq', content: 'Single Choice' }}
				/>
				<OptionButton
					isChecked={question.type === 'true_false'}
					onclick={(option) => (question.type = 'true_false')}
					option={{ id: 'true_false', content: 'Multi Choice' }}
				/>
			</div>
		</div>

		<div class="section-group">
			<h3 class="section-title">Select Media Type</h3>
			<div class="button-option-group">
				<OptionButton
					isChecked={question.media_type === 'text'}
					onclick={(option) => (question.media_type = 'text')}
					option={{ id: 'text', content: 'Text' }}
				/>
			</div>
		</div>

		<div class="section-group">
			<h3 class="section-title">
				Type {question.media_type === 'text' ? ' Question' : ' Url'}
			</h3>
			<input bind:value={question.content} type="text" class="input single-input" />
		</div>
	</div>
{/snippet}

{#snippet AnswerContainer()}
	<div class="answer-container">
		<!-- True False Answer -->
		{#if question.type === 'true_false' && question.media_type === 'text'}
			<div class="section-group">
				<h3 class="section-title">Select Option</h3>
				<div class="button-option-group">
					<OptionButton
						isChecked={question.answer.is_correct === true}
						onclick={(option) => (question.answer.is_correct = true)}
						option={{ id: 'is_correct', content: 'True' }}
					/>

					<OptionButton
						isChecked={question.answer.is_correct === false}
						onclick={(option) => (question.answer.is_correct = false)}
						option={{ id: 'is_correct', content: 'False' }}
					/>
				</div>
			</div>
		{/if}

		{#if question.type === 'scq' && question.media_type === 'text'}
			<div class="section-group">
				<div class="option-header">
					<h3 class="section-header">Options (Max - 4)</h3>
					{#if (question.answer.options?.length ?? 0) < 4}
						<ActionButton title="+ Add Option" type={'primary'} onclick={() => addOption()} />
					{/if}
				</div>
				<div class="input-option-group">
					{#each question.answer.options as option, index}
						<div class="option-input-card">
							<input
								class="input single-input option-input"
								type="text"
								placeholder={question.answer.type === 'text' ? 'Option Text' : 'Option text'}
								bind:value={option.content}
							/>
							<button class="option-remove-btn" onclick={() => removeOption(index)}>✕</button>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Single Choice Answer
			{#if selectedQuestionType == QuestionType.scq}
				<div class="section-group">
					<h3 class="section-title">Check Options</h3>
					<InputRadioGroup
						choices={dynamicAnswerOptions}
						selectedIndex={selectedAnswerChoiceIndex}
						onChoiceSelected={(index) => {
							selectedAnswerChoiceIndex = index;
						}}
					/>
				</div>
			{/if} -->

		<!-- Multi Choice Answer -->
		<!-- {#if selectedQuestionType == QuestionType.mcq}
				<div class="section-group">
					<h3 class="section-title">Check Options</h3>
					{#each selectedAnswerChoices as choice}
						<ButtonsRadioGroup
							choices={dynamicAnswerOptions}
							selected={selectedAnswerChoices}
							onchoiceclicked={(choice) => {
								selectedAnswerChoice = choice;
							}}
						/>
					{/each}
				</div>
			{/if} -->
	</div>
{/snippet}

<div class="main-container">
	<div class="content-container">
		<h1 class="main-title">{isNew ? 'Add ' : 'Modify '} Question</h1>

		{@render QuestionContainer()}

		<div class="divider"></div>

		{@render AnswerContainer()}
	</div>

	<div class="preview-container">
		<QuizPreview {question} />
	</div>
</div>

<style>
	.main-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		padding: 20px;
		gap: 20px;
	}

	.content-container {
		min-width: 800px;
		width: fit-content;
		padding: 50px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 1;
		background-color: white;
		align-items: center;
		border: 1px solid #e3e3e3;
	}

	.question-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.answer-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.main-title {
		font-size: 2rem;
	}

	.section-title {
		font-size: 1.4rem;
		font-weight: normal;
	}

	.section-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.input-option-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.button-option-group {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.option-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.option-input-card {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		gap: 10px;
	}

	.option-remove-btn {
		background-color: #e3e3e3;
		width: 34px;
		height: 34px;
		text-align: center;
		border-radius: 50%;
	}

	.option-input {
		flex: 1;
	}

	.option-header h3 {
		flex: 1;
	}

	.single-input {
		width: 100%;
		background-color: white;
		border: 1px solid #e3e3e3;
		padding: 10px;
		font-size: 1rem;
		color: black;
		border-radius: 10px;
	}

	.divider {
		width: 100%;
		border-bottom: 1px solid #e3e3e3;
	}
</style>
