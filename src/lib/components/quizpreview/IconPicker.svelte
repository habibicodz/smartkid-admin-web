<script lang="ts">
	import { onMount } from 'svelte';

	// Props: reactive Svelte pattern
	export let value: string = '';

	const icons = [
		{ key: 'math', label: '➗' },
		{ key: 'science', label: '🔬' },
		{ key: 'history', label: '📜' },
		{ key: 'language', label: '📝' },
		{ key: 'addition', label: '+' },
		{ key: 'subtraction', label: '−' },
		{ key: 'multiplication', label: '×' },
		{ key: 'division', label: '÷' }
	];

	let showDropdown = false;
	let highlightedIndex = -1;
	let buttonEl: HTMLButtonElement;
	let optionsEl: HTMLDivElement;

	function toggleDropdown() {
		showDropdown = !showDropdown;
		if (showDropdown) {
			highlightedIndex = icons.findIndex((i) => i.key === value);
			setTimeout(() => optionsEl?.focus(), 0);
		}
	}

	function selectIcon(key: string) {
		value = key;
		showDropdown = false;
		buttonEl.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!showDropdown) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			highlightedIndex = (highlightedIndex + 1) % icons.length;
			scrollToHighlighted();
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			highlightedIndex = (highlightedIndex - 1 + icons.length) % icons.length;
			scrollToHighlighted();
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectIcon(icons[highlightedIndex].key);
		} else if (event.key === 'Escape') {
			event.preventDefault();
			showDropdown = false;
			buttonEl.focus();
		}
	}

	function scrollToHighlighted() {
		const option = optionsEl?.children[highlightedIndex] as HTMLElement;
		option?.scrollIntoView({ block: 'nearest' });
	}

	function handleClickOutside(event: MouseEvent) {
		if (!buttonEl.contains(event.target as Node) && !optionsEl.contains(event.target as Node)) {
			showDropdown = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="wrapper">
	<button
		class="button"
		aria-haspopup="listbox"
		aria-expanded={showDropdown}
		onclick={toggleDropdown}
		bind:this={buttonEl}
	>
		<span class="icon">{icons.find((i) => i.key === value)?.label ?? '❓'}</span>
		<span>{value || 'Select icon'}</span>
		<span>▾</span>
	</button>

	{#if showDropdown}
		<div class="dropdown" role="listbox" tabindex="0" onkeydown={onKeyDown} bind:this={optionsEl}>
			{#each icons as icon, index}
				<!-- svelte-ignore a11y_interactive_supports_focus -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="option {highlightedIndex === index ? 'highlighted' : ''}"
					role="option"
					aria-selected={value === icon.key}
					onclick={() => selectIcon(icon.key)}
				>
					<span class="icon">{icon.label}</span>
					<span>{icon.key}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		font-family: 'Inter', sans-serif;
		width: 220px;
		position: relative;
	}

	.button {
		width: 100%;
		padding: 0.5rem 1rem;
		background: #ffffff;
		border: 1px solid #ddd;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		font-size: 1rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		color: #111;
	}

	.button:hover,
	.button:focus {
		border-color: #bbb;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
		outline: none;
	}

	.dropdown {
		position: absolute;
		top: 110%;
		width: 100%;
		background: #ffffff;
		border: 1px solid #ddd;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		max-height: 200px;
		overflow-y: auto;
		z-index: 10;
	}

	/* Modern minimal scrollbar */
	.dropdown::-webkit-scrollbar {
		width: 6px;
	}
	.dropdown::-webkit-scrollbar-track {
		background: #f0f0f0;
		border-radius: 6px;
	}
	.dropdown::-webkit-scrollbar-thumb {
		background-color: #bbb;
		border-radius: 6px;
	}
	.dropdown::-webkit-scrollbar-thumb:hover {
		background-color: #999;
	}

	.option {
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		transition: background 0.15s;
	}

	.option:hover,
	.option[aria-selected='true'],
	.option.highlighted {
		background: #f5f5f5;
	}

	.icon {
		font-size: 1.2rem;
	}
</style>
