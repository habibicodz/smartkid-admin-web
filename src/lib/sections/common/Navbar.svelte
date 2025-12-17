<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import NavMenuButton from '$lib/components/buttons/NavMenuButton.svelte';

	let current_route = $state();
	const navigateTo = (path: string) => goto(path);
	afterNavigate(({ to }) => {
		current_route = to?.route.id ?? '/';
	});
</script>

<section>
	<header>
		<button class="title" type="button" onclick={() => navigateTo('/')}
			><h2>Smartkid Admin</h2></button
		>
		<nav>
			<ul>
				<li>
					<NavMenuButton
						text="Dashboard"
						isSelected={current_route == '/'}
						onclick={() => navigateTo('/')}
					/>
				</li>
				<li>
					<NavMenuButton
						text="Grades"
						isSelected={current_route == '/grades'}
						onclick={() => navigateTo('/grades')}
					/>
				</li>
			</ul>
		</nav>
	</header>
</section>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
		align-items: center;
		width: 100%;
		height: var(--navbar-height);
		background-color: white;
	}

	.title {
		background: none;
		color: black;
		border: none;
		cursor: pointer;
	}

	ul {
		display: flex;
		column-gap: 20px;
		list-style-type: none;
	}
</style>
