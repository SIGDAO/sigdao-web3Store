<script>
  import {createEventDispatcher} from 'svelte'
  import Card, {ActionButtons, Actions, ActionIcons, PrimaryAction, Content, Media} from '@smui/card'
  import Button, {Label} from '@smui/button'
  import Chip, {Set, Text} from '@smui/chips'
  import IconButton, {Icon} from '@smui/icon-button'
  import MenuSurface from '@smui/menu-surface'
  import {goto, preloadData} from '$app/navigation'
  // import likeList from '$lib/store/likeList';
  // store for the likeList
  import { get } from 'svelte/store'
  import likeList from '$lib/store/likeList';
  import {
    RouteDonate,
    RouteActivate,
    RouteTransfer,
    RouteDeactivate,
    RouteTokenDetail,
    RouteAccountTokens,
  } from '../../../utils/routes'
  import {isEmptyString} from '../../../utils/isEmptyString'
  import Stamp from '../Stamp.svelte'
  import {TokenItemVariant} from './TokenItemVariant'
  import BadgeCollection from '../badge/BadgeCollection.svelte'
  import TokenRank from './TokenRank.svelte'
  import SocialMediaList from './SocialMediaList.svelte'
  import {setAccount} from '../accountStore'
  import {Amount} from "@signumjs/util";
  import {localImgUrl} from "../../../utils/localImgUrl"
  export let compact = false
  export let variant = TokenItemVariant.Normal
  export let data = {
    at: '',
    name: '',
    desc: '',
    repo: '',
    owner: '',
    img: null,
    tags: [],
    donationPlanck: '0',
    isActive: true,
    isLike: false,
  }

  const PlaceholderImage = '../img/placeholder.noimage.svg'
  const PlaceholderErrorImage = '../img/placeholder.error.svg'
  let stampText = ''
  let isElevated = false
  let sharingIconSurface = null
  const dispatch = createEventDispatcher()
 
  $: isLike = data.isLike
  $: tags = data.tags && data.tags.filter(t => t.trim().length > 0).map( t => t.toUpperCase() )
  $: donation = Amount.fromPlanck(data.donationPlanck || '0')
  $: imageUrl = data.img || PlaceholderImage
  // $: imageUrl = localImgUrl[data.name] || PlaceholderImage
  $: mediaStyle = `
        background-image: url(${imageUrl});
        background-size: cover;
    `
  $: isUnconfirmed = variant === TokenItemVariant.Unconfirmed
  $: {
    if (variant === TokenItemVariant.Preview) {
      stampText = 'Preview'
    } else if (variant === TokenItemVariant.Unconfirmed) {
      stampText = 'Confirming'
    } else if (!data.isActive) {
      stampText = 'Inactive'
    } else {
      stampText = ''
    }
  }

  const ifNotPreview = (fn) => () => {
    if (variant === TokenItemVariant.Preview) {
      return Promise.resolve()
    }
    return fn()
  }

  const handleShareClick = ifNotPreview(() => {
    sharingIconSurface.setOpen(true)
  })

  const prefetchDetails = ifNotPreview(() => {
    preloadData(RouteTokenDetail(data.at))
  })

  const handleDetailsClick = ifNotPreview(async () => {
    await goto(RouteTokenDetail(data.at))
  })

  const prefetchOwnerTokens = ifNotPreview(() => {
    preloadData(RouteAccountTokens(data.owner))
  })

  const handleOwnerTokensClick = ifNotPreview(async () => {
    setAccount(data.owner)
    await goto(RouteAccountTokens(data.owner))
  })

  const handleProjectClick = ifNotPreview(() => {
    window.open(data.repo, '_blank')
  })

  const handleDonate = ifNotPreview(() => {
    goto(RouteDonate(data.at))
  })

  const handleMediaError = (e) => {
    if (localImgUrl[data.name] !== undefined && localImgUrl[data.name] !== null) {
      imageUrl = localImgUrl[data.name]
    }else {
      imageUrl = PlaceholderErrorImage
    }
    
  }

  const prefetchDonate = ifNotPreview(() => {
    preloadData(RouteDonate(data.at))
  })

  const handleActivate = ifNotPreview(() => {
    goto(RouteActivate(data.at))
  })

  const prefetchActivate = ifNotPreview(() => {
    preloadData(RouteActivate(data.at))
  })

  const handleDeactivate = ifNotPreview(() => {
    goto(RouteDeactivate(data.at))
  })

  const prefetchDeactivate = ifNotPreview(() => {
    preloadData(RouteDeactivate(data.at))
  })

  const handleTransfer = ifNotPreview(() => {
    goto(RouteTransfer(data.at))
  })

  const prefetchTransfer = ifNotPreview(() => {
    preloadData(RouteTransfer(data.at))
  })

  const handleChipClick = (e) => {
    e.preventDefault()
    e.stopImmediatePropagation()
    dispatch('tag-click', e.target.textContent)
  }
  let likes = 0;
  // function to toggle the like button and update the likeList store and local storage 
  function toggleLike() {
    
    isLike = !isLike;
    likes += isLike ? 1 : -1;
   
    
    
    //console.log("likeList", $likeList);
    const likeListJson = get(likeList);
    //console.log(JSON.parse(likeListJson));
    const likeListArray = JSON.parse(likeListJson);
    //console.log(data.at);
    if (likeListArray) {
      // const likeList = get(likeList);
      if (isLike) {
       // console.log("after like");
        likeListArray.push(data.at);
       // console.log(likeListArray);
        likeList.set(JSON.stringify(likeListArray));
      } else {
        likeListArray.splice(likeListArray.indexOf(data.at), 1);
       //console.log("after dislike");
        //console.log(likeListArray);
        //likeList.set(JSON.stringify(likeListArray));
      }
    } else {
     // console.log("likeList is null");
    }
  }
  // function setCookie(name, value, days) {
  //   const expires = new Date();
  //   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  //   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  // }

  // function getCookie(name) {
  //   const nameEQ = name + "=";
  //   const ca = document.cookie.split(';');
  //   console.log(ca);
  //   for(let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) === 0) 
      
  //     return c.substring(nameEQ.length, c.length);
  //   }
  //   return null;
  // }
</script>

<div class="item-container">

    {#if !isEmptyString(stampText) }
        <div class='stamp-wrapper'>
            <Stamp text={stampText}/>
        </div>
    {/if}

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class:is-unconfirmed={isUnconfirmed}
         class:animation-fading={isUnconfirmed}
         on:mouseenter={() => isElevated=true}
         on:mouseleave={() => isElevated=false}
         class:mdc-elevation--z8={isElevated}
         class="item-wrapper mdc-elevation-transition">
        <Card>
            <PrimaryAction on:mouseenter={prefetchDetails} on:click={handleDetailsClick}>
                <!-- <img src={imageUrl} on:error={handleMediaError} hidden alt="nothing here!"/> -->
                <img src={imageUrl} on:error={handleMediaError} hidden alt="nothing here!"/>
                <Media aspectRatio="16x9" style={mediaStyle}>
                    <div class="badge-wrapper-a">
                        <BadgeCollection token={data}/>
                    </div>
                    <div class="rank-wrapper">
                        <TokenRank token={data}/>
                    </div>
                </Media>
                <Content class="mdc-typography--body2">
                    {#if !compact}
                        <h2 class="mdc-typography--headline6" style="margin: 0;">{data.name}</h2>
                        <div class="tags-wrapper">
                          <!-- {#if data.tags}
                                    <Set chips={data.tags} let:chip>
                                <Chip shouldRemoveOnTrailingIconClick={false}>
                                    <Text>{chip}</Text>
                                </Chip>
                            </Set> 
                          {/if} -->
                          {#each tags as tag}
                          <button class="tag-button" on:click={(e) => {
                                  e.preventDefault()
                                  e.stopImmediatePropagation()
                                  dispatch('tag-click', tag)
                          }}
                          > {tag}</button>
                        {/each}
                        </div>
                        {data.desc}
                    {:else}
                        <h2 class="compact-title mdc-typography--headline6">{data.name}</h2>
                    {/if}
                </Content>
            </PrimaryAction>
            {#if variant !== TokenItemVariant.Unconfirmed && variant !== TokenItemVariant.NoActions}
                <Actions>
                    <ActionButtons>
                        {#if variant === TokenItemVariant.Owner && !data.isActive}
                            {#if compact}
                                <IconButton class="material-icons" on:click={handleActivate}
                                            title="Activate">power_outlined
                                </IconButton>
                            {:else}
                                <Button on:mouseenter={prefetchActivate} on:click={handleActivate}>
                                    <Label>Activate</Label>
                                </Button>
                            {/if}
                        {:else if variant === TokenItemVariant.Owner && data.isActive}
                            {#if compact}
                                <IconButton class="material-icons" on:click={handleDeactivate}
                                            title="Deactivate">power_off_outlined
                                </IconButton>
                                <IconButton class="material-icons" on:click={handleTransfer}
                                            title="Transfer">compare_arrows
                                </IconButton>
                            {:else}
                                <Button on:mouseenter={prefetchDeactivate} on:click={handleDeactivate}>
                                    <Label>Deactivate</Label>
                                </Button>
                                <Button on:mouseenter={prefetchTransfer} on:click={handleTransfer}>
                                    <Label>Transfer</Label>
                                </Button>
                            {/if}
                        {:else}
                            {#if compact}
                            <!-- The liking button for future development -->
                                <!-- <IconButton class="material-icons" on:click={prefetchDonate}
                                            title="Donate">favorite_border
                                </IconButton> -->
                                {#if isLike}
                                <IconButton class="material-icons" on:click={toggleLike}> favorite </IconButton>
                                  {:else}
                                  <IconButton class="material-icons" on:click={toggleLike}>
                                    favorite_border
                                </IconButton>
                                {/if}
                            {:else}
                                <Button on:mouseenter={prefetchDonate} on:click={handleDonate}>
                                    <Label>Vote</Label>
                                </Button>
                            {/if}
                            {#if !compact && !isEmptyString(data.repo)}
                                <Button on:click={handleProjectClick}>
                                    <Label>Visit Project</Label>
                                </Button>
                            {/if}
                        {/if}
                    </ActionButtons>
                    <ActionIcons>
                        {#if variant !== TokenItemVariant.Owner}
                            {#if compact && !isEmptyString(data.repo)}
                                <IconButton class="material-icons" on:click={handleProjectClick}
                                            title="Visit Project Site">web
                                </IconButton>
                            {/if}
                            <IconButton class="material-icons" on:mouseenter={prefetchOwnerTokens}
                                        on:click={handleOwnerTokensClick} title="See all tokens of this owner">
                                person_search
                            </IconButton>
                        {/if}
                        <div class="share">
                            <IconButton class="material-icons" on:click={handleShareClick}
                                        title="Share on Social Media">share
                            </IconButton>
                            <MenuSurface bind:this={sharingIconSurface} anchorCorner="TOP_LEFT">
                                <SocialMediaList token={data}/>
                            </MenuSurface>
                        </div>
                    </ActionIcons>
                </Actions>
            {/if}
        </Card>
    </div>
</div>


<style>
    .is-unconfirmed {
        opacity: 0.5;
        filter: grayscale(1);
    }

    .item-wrapper,
    .item-container {
        position: relative;
    }

    .stamp-wrapper {
        top: 50%;
        left: 25%;
        position: absolute;
        opacity: 0.5;
        z-index: 5;
    }

    .tags-wrapper :global(.mdc-chip__text) {
        font-size: 80%;
    }

    .tags-wrapper :global(.mdc-chip) {
        height: 24px;
        margin: 2px 2px 0 0;
    }

    .tags-wrapper :global(.mdc-chip-set) {
        padding: 0;
        margin-bottom: 0.25rem;
    }

    .badge-wrapper-a {
        position: absolute;
        top: 1rem;
        right: 1rem;
        filter: drop-shadow(0px 2px 2px #555555)
    }

    .rank-wrapper {
        position: absolute;
        right: 1rem;
        bottom: 0;
        filter: drop-shadow(0px 2px 2px #555555)
    }

    .compact-title {
        margin: 0;
        font-size: 90%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden
    }
    .tag-button {
      font-size: inherit;
    font-family: inherit;
    background: #06f;
    color: #fff;
    margin: 2px;
    border: none;
    }
</style>
