<script lang="ts">
	let { value, onValueChange }: { value: string; onValueChange?: (value: string) => void } =
		$props();
</script>

<div class="searchbar-container">
	<input type="text" placeholder="Search..." bind:value oninput={() => onValueChange?.(value)} />
	<button class="go-button" onclick={() => onValueChange?.(value)}>
		<!-- Go icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="20"
			height="20"
			fill="currentColor"
		>
			<path d="M10 17l5-5-5-5v10z" />
		</svg>
	</button>
</div>

<style>
	.searchbar-container {
		display: flex;
		align-items: center;
		width: 100%;
		background: white;
		border-radius: 9999px;
		padding: 4px 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		transition: box-shadow 0.2s ease;
	}

	.searchbar-container:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		padding: 10px 12px;
		font-size: 1rem;
		border-radius: 9999px;
		color: #111;
	}

	input::placeholder {
		color: #aaa;
	}

	.go-button {
		background: #4285f4;
		color: white;
		border: none;
		padding: 8px 12px;
		border-radius: 9999px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.2s ease,
			transform 0.1s ease;
	}

	.go-button:hover {
		background: #357ae8;
		transform: scale(1.05);
	}

	.go-button:active {
		transform: scale(0.95);
	}

	.go-button svg {
		display: block;
	}
</style>
