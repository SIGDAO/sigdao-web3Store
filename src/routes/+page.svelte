<!-- <script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>-->

<svelte:head>
	<title>Sigdao Web3store </title>
	<meta name="description" content="Sigdao Web3store" />
</svelte:head>

<!-- <section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style> -->

<script>
	import { goto, preloadData } from "$app/navigation";
	import TokenList from "$lib/features/tokens/TokenList.svelte";
	import { RouteRegister } from "$lib/utils/routes";
	import { account$ } from "$lib/features/_common/accountStore";
	import { isEmptyString } from "$lib/utils/isEmptyString";
	import { Events } from "$lib/utils/events";
	import { dispatchEvent } from "$lib/utils/dispatchEvent";
	import RegisterFabButton from "$lib/features/_common/RegisterFabButton.svelte";
	import { getUrlQuery } from "$lib/utils/getUrlQuery";
	import GenericMetaHead from "$lib/features/_common/GenericMetaHead.svelte";
	import {showModal} from '../stores';
	// need to use like SPA and not SSR (due to sapper export)
	let query = getUrlQuery();

	$: accountId = $account$.accountId;
	$: hasAccount = !isEmptyString(accountId);
	$: searchText = "";

	function handleClick() {
		if (hasAccount) {
			goto(RouteRegister(accountId));
		} else {
			// dispatchEvent(Events.ShowAccountDialog, { isVisible: true, wantsRegister: true });
			showModal.set(true);
		}
	}

	const prefetchRoute = () => {
		if (hasAccount) {
			preloadData(RouteRegister(accountId));
		}
	};
</script>

<GenericMetaHead/>
<div>
    <TokenList {searchText} />
    <RegisterFabButton on:mouseenter={prefetchRoute} on:click={handleClick}/>
</div>

