<script lang="ts">
	import type { Option } from '$lib/business/quizzes/QuizUtil';

	let {
		option,
		isChecked = false,
		onclick = () => {}
	}: { option: Option; isChecked: boolean; onclick: (option: Option) => void } = $props();
</script>

<button class="choice" class:isChecked onclick={() => onclick(option)}>
	<h1>{option.content}</h1>
</button>

<style>
	.choice {
		min-width: 100px;
		color: black;
		background-color: white;
		border: 1px solid #e3e3e3;
		font-weight: normal;
		border-radius: 10px;
	}

	.choice:hover {
		background-color: rgb(247, 247, 247);
	}

	.isChecked {
		background-color: rgb(59, 85, 231);
		color: white;
		border: 1px solid transparent;
	}

	.isChecked:hover {
		background-color: rgb(49, 70, 189);
	}

	.choice h1 {
		font-weight: normal;
		font-size: 1rem;
	}
</style>
