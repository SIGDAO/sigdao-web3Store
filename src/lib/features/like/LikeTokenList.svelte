<script>
    import { scale } from 'svelte/transition'
    import { TokenItemVariant, TokenItem } from '../_common'
    import { tokens$ } from '../_common/tokenStore'
    import { activeTokenMonitors$ } from './tokenMonitorStore'
    import { account$ } from '../_common/accountStore'
    import { get } from 'svelte/store'
    import likeList from '$lib/store/likeList';
    export let accountId


    const isNotDeactivated = i => i.version === 0 || (i.version > 0 && i.isActive)
    const isOwnToken = i => (i.owner && i.owner !== '0' ? i.owner : i.creator) === accountId
    const isLike = i => {
        // make the likeList for the tokens
        const likeListJson = get(likeList);
        const likeListArray = JSON.parse(likeListJson);
        
        // if the token is in the likeList, return true to filter function 
        if(likeListArray.includes(i.at)){
            return true
        }else{ return false}
    }
    // $: tokens = $tokens$.items.filter(isOwnToken).filter(isNotDeactivated)
    $: tokens = $tokens$.items.filter(isLike)
    $: unconfirmedTokens = $tokens$.unconfirmedItems.filter(isOwnToken)
    $: hasPendingTransaction = at => $activeTokenMonitors$.some(id => id === at)
    $: isAccountZoneActive = $account$.accountId === accountId
    // console.log("token",tokens$)
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-inline-start: 0;
        margin: 1rem;
        position: relative;
    }

    .body {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }

    .item {
        padding: 0.5rem;
        width: 360px;
    }
</style>

<div transition:scale class="container">
    <section class="body">
        {#each unconfirmedTokens as data}
            <div class="item">
                <TokenItem {data} variant={TokenItemVariant.Unconfirmed} />
            </div>
        {/each}
        {#each tokens as data}
            <div class="item">
                {#if isAccountZoneActive}
                    <TokenItem {data}
                               variant={hasPendingTransaction(data.at)
                                     ? TokenItemVariant.Unconfirmed
                                     : TokenItemVariant.Owner
                                 }
                    />
                {:else}
                    <TokenItem {data} />
                {/if}
            </div>
        {/each}
    </section>
</div>
