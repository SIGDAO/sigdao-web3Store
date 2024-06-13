<script>
	import Header from './Header.svelte';
	import './styles.css';
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
