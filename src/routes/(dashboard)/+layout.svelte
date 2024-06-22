<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import PhSignOut from '~icons/ph/sign-out';
	import PhUserCircleGear from '~icons/ph/user-circle-gear';

	let currentTile: number = 0;
</script>

<nav class="h-full w-full">
	<AppRail>
		<svelte:fragment slot="lead">
			<AppRailAnchor href="/">SIGU</AppRailAnchor>
		</svelte:fragment>
		<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<span>Tile 1</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<span>Tile 2</span>
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<span>Tile 3</span>
		</AppRailTile>
		<!-- --- -->
		<svelte:fragment slot="trail">
			<AppRailAnchor href="/" title="Minha conta">
				<svelte:fragment slot="lead"><PhUserCircleGear /></svelte:fragment>
				{$page.data.session?.name}
			</AppRailAnchor>
			<form action="?/signout" method="POST">
				<AppRailTile bind:group={currentTile} name="signout" value={3} title="Sair">
					<svelte:fragment slot="lead"><PhSignOut class="w-full" /></svelte:fragment>
					<span>Sair</span>
				</AppRailTile>
			</form>
		</svelte:fragment>
	</AppRail>
</nav>

<slot></slot>
