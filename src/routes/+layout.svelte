<script>
    import Modal from '$lib/features/_common/Modal.svelte';
	import Header from './Header.svelte';
	import './styles.css';
    // For testing Modal 
    import {layout, carousel,hero,message} from '../stores';

    let layoutForm ;
    function handleFormChange(){
        layout.set(layoutForm.layout.value);
    }

    let thisMessage ;

    $:{ if($message !== thisMessage && thisMessage !== undefined) message.set(thisMessage)
    }
    if($message) thisMessage = $message;
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
<!-- 
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
</div>


<Modal>
	<h2 slot="header">
		Layout Options
	</h2>

    <!-- <form bind:this={layoutForm} on:change={handleFormChange}>
        <label for="layout">Navigation Location</label>
        <select name="layout" value={$layout}>
            <option value="top">Top</option>
            <option value="side">Side</option>
        </select>
        <hr />
        <div class="layout-option">
            <label for="carousel">Carousel</label>
            <input type="checkbox" name="carousel" value="carousel" on:change={()=> carousel.set(!$carousel)} checked={$carousel} />

        </div>
        <div class="layout-option">
            <label for="hero">Hero</label>
            <input type="checkbox" name="hero" value="hero" on:change={()=> hero.set(!$hero)} checked={$hero} />
        </div>
        <div class="layout-option">
            <div>
                <label for="message">Custom Message</label>
            </div>

            <textarea type="textarea" cols={20} name="message" bind:value={thisMessage} />
        </div>

    </form> -->

</Modal>


<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
/* 
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

    .layout-option{
        margin-bottom:.5em;
    }
</style>
<!-- 
<script context="module">
    import { Vars } from '$lib/context'
    export async function preload({ params, query }) {
        return {
            isTestnet: Vars.IsTestnet,
            isMaintenance: Vars.IsMaintenance
        }
    }
</script>


<script>
    import {
        Header,
        Message,
        AccountDialog,
        LoadingBar,
        ThemeProvider,
        LeftSideMenu,
        Maintenance,
        MaintenanceHeader,
    } from '../features/_common'

    export let isTestnet
    export let isMaintenance

    let isMenuOpen = false
</script>

<ThemeProvider>
    {#if isMaintenance}
        <MaintenanceHeader />
        <main>
            <Maintenance />
        </main>
    {:else}
        <Header {isMenuOpen} {isTestnet} />
        <Message/>
        <main>
            <LeftSideMenu bind:open={isMenuOpen} />
            <AccountDialog/>
            <slot/>
        </main>
    {/if}
</ThemeProvider>


<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }

    :global(.mdc-top-app-bar){
        z-index: 100 !important;
    }

    :global(*::-webkit-scrollbar) {
        width: 0.25rem;
    }

    :global(*::-webkit-scrollbar-thumb) {
        background-color: darkgrey;
    }

    :global(*){
        scrollbar-color: darkgrey white;
        scrollbar-width: thin;
    }

    main {
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
        height: calc(100vh - var(--header-height));
        top: var(--header-height);
        overflow: auto;
    }

</style>
 -->
