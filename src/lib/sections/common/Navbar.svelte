<script lang="ts">
	import { goto } from '$app/navigation';
	let userName = 'Smartkid Admin';
	const openStatistics = () => goto('/');
	const openData = () => goto('/grades');
</script>

<nav class="navbar">
	<div class="nav-left">{userName}</div>
	<div class="nav-right">
		<button class="nav-btn" onclick={openStatistics}>Statistics</button>
		<button class="nav-btn" onclick={openData}>Data</button>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 24px;
		background-color: #ffffff;
		border-bottom: 1px solid #e5e7eb;
		font-family: 'Inter', sans-serif;
	}

	.nav-left {
		font-size: 1.1rem;
		font-weight: 600;
		color: #111827;
	}

	.nav-right {
		display: flex;
		gap: 12px;
	}

	.nav-btn {
		background: white;
		border: 1px solid #e5e7eb;
		padding: 8px 16px;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: 500;
		color: #111827;
		cursor: pointer;
		transition:
			transform 0.1s ease,
			box-shadow 0.15s ease,
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	/* Hover effect */
	.nav-btn:hover {
		background: #f9fafb;
		border-color: #d1d5db;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
	}

	/* Press (active) effect */
	.nav-btn:active {
		transform: translateY(1px);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
		background: #f3f4f6;
	}
</style>
