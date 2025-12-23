<script lang="ts">
	let size = 40;
</script>

<div class="spinner" style="width: {size}px; height: {size}px"></div>

<style>
	.spinner {
		border: 4px solid rgba(240, 240, 240, 0.1);
		border-top-color: var(--color, rgb(52, 52, 52));
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
