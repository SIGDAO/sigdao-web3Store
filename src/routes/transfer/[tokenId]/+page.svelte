<svelte:head>
	<title>Transfer | Sigdao Web3store </title>
	<meta name="description" content="Transfer | Sigdao Web3store" />
</svelte:head>

<script>
    import { tokens$ } from '$lib/features/_common/tokenStore'
    import Transfer from '$lib/features/account/Transfer.svelte'
    export let data
    // export let tokenId
    $: token = $tokens$.items.find(i => i.at === data.tokenId)
</script>

<Transfer {token} />