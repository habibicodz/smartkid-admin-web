<script lang="ts">
	import ButtonLoader from '../loader/ButtonLoader.svelte';
	import Dialog from './Dialog.svelte';

	let {
		title,
		description,
		icon = null,
		onNegativeClicked,
		onPositiveClicked,
		positiveLoading = false
	}: {
		title: string;
		description: string;
		icon?: string | null;
		onNegativeClicked: () => void;
		onPositiveClicked: () => void;
		positiveLoading?: boolean;
	} = $props();
</script>

<Dialog onclose={onNegativeClicked}>
	<div class="isolated-dialog">
		{#if icon}
			<div class="icon-container">
				{#if typeof icon === 'string'}
					<img src={icon} alt="" />
				{:else}
					{@html icon}
				{/if}
			</div>
		{/if}

		<h3 class="title">{title}</h3>
		<p class="description">{description}</p>

		<div class="actions">
			<button class="btn ghost" onclick={onNegativeClicked} disabled={positiveLoading}>
				Cancel
			</button>

			<button class="btn primary" onclick={onPositiveClicked} disabled={positiveLoading}>
				{positiveLoading ? '' : 'OK'}
			</button>
		</div>

		{#if positiveLoading}
			<div class="loading">
				<ButtonLoader />
			</div>
		{/if}
	</div>
</Dialog>

<style>
	.isolated-dialog {
		background-color: white;
		border-radius: 14px;
		box-shadow: 0 16px 36px rgba(0,0,0,0.15);
		padding: 28px 24px;
		min-width: 360px;
		max-width: 480px;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 16px;
		color: black;
		text-align: center;
	}

	.icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 8px;
	}

	.icon-container img,
	.icon-container svg {
		width: 48px;
		height: 48px;
	}

	.title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.description {
		font-size: 0.95rem;
		color: rgb(90, 90, 90);
		margin: 0;
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 12px;
		margin-top: 16px;
	}

	.btn {
		min-width: 100px;
		height: 38px;
		border-radius: 8px;
		border: none;
		font-size: 0.95rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 120ms ease;
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.primary {
		background: var(--color-primary);
		color: white;
		font-weight: 600;
	}

	.primary:hover:not(:disabled) {
		background: var(--color-primary-dark);
	}

	.ghost {
		background: rgb(245, 245, 245);
		color: black;
	}

	.ghost:hover:not(:disabled) {
		background: rgb(235, 235, 235);
	}

	/* Loading overlay covering the entire dialog */
	.loading {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 14px;
		z-index: 10;
	}
</style>
