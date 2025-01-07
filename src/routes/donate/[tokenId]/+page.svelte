<svelte:head>
	<title>Voting | Sigdao Web3store </title>
	<meta name="description" content="Voting | Sigdao Web3store" />
</svelte:head>


<script>
    import Donation from "$lib/features/tokens/Donation.svelte";
    import { tokens$ } from "$lib/features/_common/tokenStore";
    import TokenMetaHead from "$lib/features/_common/TokenMetaHead.svelte";
    
    export let data;
    export let tokenId;
    export let tokenData;
    console.log("data: ",data);
    $: tokenId = data.tokenId;
    $: token = $tokens$.items.find(i => i.at === tokenId);
  </script>
  {#if tokenData}
  <TokenMetaHead {tokenData} />
  {/if }
  {#if token}
  <Donation {token}/>
  {/if }