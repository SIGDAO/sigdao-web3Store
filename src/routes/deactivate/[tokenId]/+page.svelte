<svelte:head>
	<title>Deactivate | Sigdao Web3store </title>
	<meta name="description" content="Deactivate | Sigdao Web3store" />
</svelte:head>
<script>
    import { tokens$ } from '$lib/features/_common/tokenStore'
    import Deactivation from '$lib/features/account/Deactivation.svelte'

    // export let tokenId;
    export let data;
    $: token = $tokens$.items.find(i => i.at === data.tokenId)
</script>

<Deactivation {token} />