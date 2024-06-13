<!-- <script context="module">
    import { preloadToken } from "$lib/utils/preloadToken";
  
    export async function preload({ params, query }) {
      const { tokenId } = params;
      const token = await preloadToken(tokenId);
      console.log("token: ", token)
      return { tokenId, tokenData: token };
    }
  </script>
  
  
  <script>
    import { tokens$ } from "$lib/features/_common/tokenStore";
    import TokenDetail from "$lib/features/tokens/TokenDetail.svelte";
    import TokenMetaHead from "$lib/features/_common/TokenMetaHead.svelte";
  
    export let tokenId;
    export let tokenData;
    $: token = $tokens$.items.find(i => i.at === tokenId);
  </script>
  
  {#if tokenData}
  <TokenMetaHead {tokenData} />
{/if }
  {#if token}
    <TokenDetail {token} />
  {/if}
   -->



<!-- <script context="module">
    import { preloadToken } from "$lib/utils/preloadToken";
  
    export async function preload({ params, query }) {
      const { tokenId } = params;
      const token = await preloadToken(tokenId);
      console.log("token: ", token)
      return { tokenId, tokenData: token };
    }
</script>
   -->
  
  <script>
    import { tokens$ } from "$lib/features/_common/tokenStore";
    import TokenDetail from "$lib/features/tokens/TokenDetail.svelte";
    import TokenMetaHead from "$lib/features/_common/TokenMetaHead.svelte";
  	export let data;
    export let tokenId;
    export let tokenData;
    console.log("data: ",data);
    console.log("token:",tokenId,"tokenData:",tokenData )
    $: tokenId = data.tokenId;
    $: token = $tokens$.items.find(i => i.at === tokenId);
  </script>
  
  {#if tokenData}
  <TokenMetaHead {tokenData} />
{/if }
  {#if token}
    <TokenDetail {token} />
  {/if}
  