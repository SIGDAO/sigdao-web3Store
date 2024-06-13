<script>
    import { tokens$ } from '$lib/features/_common/tokenStore'
    import Deactivation from '$lib/features/account/Deactivation.svelte'

    // export let tokenId;
    export let data;
    $: token = $tokens$.items.find(i => i.at === data.tokenId)
</script>

<Deactivation {token} />