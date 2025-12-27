<script lang="ts">
  import { onMount } from 'svelte';

  export let value: string = '';

  // List of fonts (you can replace/add your own)
  const fonts = [
    { key: 'Arial', label: 'Arial, sans-serif' },
    { key: 'Times New Roman', label: '"Times New Roman", serif' },
    { key: 'Courier New', label: '"Courier New", monospace' },
    { key: 'Georgia', label: 'Georgia, serif' },
    { key: 'Verdana', label: 'Verdana, sans-serif' },
    { key: 'Tahoma', label: 'Tahoma, sans-serif' },
    { key: 'Trebuchet MS', label: '"Trebuchet MS", sans-serif' },
    { key: 'Impact', label: 'Impact, sans-serif' }
  ];

  let showDropdown = false;
  let highlightedIndex = -1;
  let buttonEl: HTMLButtonElement;
  let optionsEl: HTMLDivElement;

  function toggleDropdown() {
    showDropdown = !showDropdown;
    if (showDropdown) {
      highlightedIndex = fonts.findIndex(f => f.key === value);
      setTimeout(() => optionsEl?.focus(), 0);
    }
  }

  function selectFont(key: string) {
    value = key;
    showDropdown = false;
    buttonEl.focus();
  }

  function onKeyDown(event: KeyboardEvent) {
    if (!showDropdown) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % fonts.length;
      scrollToHighlighted();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      highlightedIndex = (highlightedIndex - 1 + fonts.length) % fonts.length;
      scrollToHighlighted();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectFont(fonts[highlightedIndex].key);
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

<style>
  .wrapper { font-family: 'Inter', sans-serif; width: 240px; position: relative; }

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
    transition: border-color 0.2s, box-shadow 0.2s;
    color: #111;
  }

  .button:hover, .button:focus {
    border-color: #bbb;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    outline: none;
  }

  .dropdown {
    position: absolute;
    top: 110%;
    width: 100%;
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    max-height: 220px;
    overflow-y: auto;
    z-index: 10;
  }

  /* Modern minimal scrollbar */
  .dropdown::-webkit-scrollbar { width: 6px; }
  .dropdown::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 6px; }
  .dropdown::-webkit-scrollbar-thumb { background-color: #bbb; border-radius: 6px; }
  .dropdown::-webkit-scrollbar-thumb:hover { background-color: #999; }

  .option {
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .option:hover, .option[aria-selected="true"], .option.highlighted { background: #f5f5f5; }

  .font-label { font-size: 1rem; }
</style>

<div class="wrapper">
  <button
    class="button"
    aria-haspopup="listbox"
    aria-expanded={showDropdown}
    onclick={toggleDropdown}
    bind:this={buttonEl}
  >
    <span class="font-label" style="font-family: {fonts.find(f => f.key === value)?.label};">
      {value || 'Select font'}
    </span>
    <span>▾</span>
  </button>

  {#if showDropdown}
    <div
      class="dropdown"
      role="listbox"
      tabindex="0"
      onkeydown={onKeyDown}
      bind:this={optionsEl}
    >
      {#each fonts as font, index}
        <div
          class="option {highlightedIndex === index ? 'highlighted' : ''}"
          role="option"
          aria-selected={value === font.key}
          onclick={() => selectFont(font.key)}
          style="font-family: {font.label};"
        >
          {font.key}
        </div>
      {/each}
    </div>
  {/if}
</div>
