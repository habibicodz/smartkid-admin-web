<script lang="ts">
	let { dialog = $bindable(), children, onclose } = $props();
</script>

<dialog
	bind:this={dialog}
	onclick={() => onclose()}
>
	<!-- prevent clicks inside the child dialog from closing -->
	<div
		class="dialog-wrapper"
		onclick={(event) => event.stopPropagation()}
	>
		{@render children()}
	</div>
</dialog>

<style>
	/* Fullscreen overlay */
	dialog {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.1); /* overlay remains unchanged */
		z-index: 999;
	}

	/* Wrapper around the child dialog */
	.dialog-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		/* do NOT set background here, children handle their own styling */
	}

	/* Optional: smooth fade-in animation for overlay */
	dialog {
		animation: fadeIn 0.2s ease forwards;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
