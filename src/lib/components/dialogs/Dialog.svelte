<script lang="ts">
	let { dialog = $bindable(), children, onclose } = $props();
</script>

<dialog bind:this={dialog} onclick={(event) => {
	onclose();
}}>
	<div class="dialog" onclick={(event) => {
		event.stopPropagation();
	}}>
		{@render children()}
	</div>
</dialog>

<style>
	dialog {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.dialog {
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-width: 400px;
		padding: 20px;
		background-color: white;
		color: black;
		border: 1px solid #ebebeb;
		border-radius: 10px;
	}
</style>
