
<script>
    import Activation from '$lib/features/account/Activation.svelte'
    import { tokens$ } from '$lib/features/_common/tokenStore'

    // export let tokenId
    export let data
    $: token = $tokens$.items.find(i => i.at === data.tokenId)
</script>

<Activation {token} />