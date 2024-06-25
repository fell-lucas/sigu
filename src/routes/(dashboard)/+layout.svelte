<script lang="ts">
	import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import PhSignOut from '~icons/ph/sign-out';
	import PhUserCircleGear from '~icons/ph/user-circle-gear';
	import PhHouse from '~icons/ph/house';
	import PhBookOpenText from '~icons/ph/book-open-text';
	import PhCalendarDots from '~icons/ph/calendar-dots';
	import PhBooks from '~icons/ph/books';

	$: pathname = '/' + $page.url.pathname.slice(1).split('/')[0];
</script>

<div class="flex flex-1">
	<AppRail width="w-24">
		<AppRailAnchor href="/" selected={pathname === '/'}>
			<svelte:fragment slot="lead">
				<PhHouse class="w-full" />
			</svelte:fragment>
			<span>SIGU</span>
		</AppRailAnchor>
		<AppRailAnchor href="/courses" selected={pathname === '/courses'}>
			<svelte:fragment slot="lead">
				<PhBookOpenText class="w-full" />
			</svelte:fragment>
			<span>Cursos</span>
		</AppRailAnchor>
		<AppRailAnchor href="/schedule" selected={pathname === '/schedule'}>
			<svelte:fragment slot="lead">
				<PhCalendarDots class="w-full" />
			</svelte:fragment>
			<span>Cronograma</span>
		</AppRailAnchor>
		<AppRailAnchor href="/library" selected={pathname === '/library'}>
			<svelte:fragment slot="lead">
				<PhBooks class="w-full" />
			</svelte:fragment>
			<span>Biblioteca</span>
		</AppRailAnchor>
		<svelte:fragment slot="trail">
			<AppRailAnchor href="/account" selected={pathname === '/account'}>
				<svelte:fragment slot="lead">
					<PhUserCircleGear />
				</svelte:fragment>
				<span>Conta</span>
			</AppRailAnchor>
			<form action="/?/signout" method="POST">
				<AppRailTile group={0} name="signout" value={1} title="Sair">
					<svelte:fragment slot="lead">
						<PhSignOut class="w-full" />
					</svelte:fragment>
					<span>Sair</span>
				</AppRailTile>
			</form>
		</svelte:fragment>
	</AppRail>
	<div class="max-h-screen w-full overflow-y-auto">
		<slot></slot>
	</div>
</div>
