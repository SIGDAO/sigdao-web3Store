<!-- <script>
	import { page } from '$app/stores';
	import {goto } from '$app/navigation'
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import {redirect} from '@sveltejs/kit';
	let prominent = false;
  let dense = false;
  let secondaryColor = false;
  import Drawer, {
    AppContent,
    Content,
    Header,

    Subtitle,
    Scrim,
  } from '@smui/drawer';
  import Button, { Label } from '@smui/button';
  import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    /**
     * @param {any} data
     */

	 
   function setActive(data ) {
    active = data;
    open = false;
  }
  let open = false;
  let active = 'Inbox';

</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div>

	<TopAppBar
      variant="static"
      {prominent}
      {dense}
      color={secondaryColor ? 'secondary' : 'primary'}
    >
      <Row>
        <Section>
          <IconButton class="material-icons" on:click={() => (open = !open)}>menu</IconButton>
          <Title>Test</Title>
        </Section>
        <Section align="end" toolbar>
          <IconButton class="material-icons" aria-label="Download"
            >file_download</IconButton
          >
          <IconButton class="material-icons" aria-label="Print this page"
            >print</IconButton
          >
          <IconButton class="material-icons" aria-label="Bookmark this page"
            >bookmark</IconButton
          >
        </Section>
      </Row>
    </TopAppBar>

	<Drawer variant="modal" fixed={false} bind:open>
		<Header>
		  <Title>Test 01</Title>
		  <Subtitle>test router</Subtitle>
		</Header>
		<Content>
		  <List>
			<Item
			  href="javascript:void(0)"
			  on:click={() => {setActive('Inbox')
				goto('/about')
			  }}
			  activated={active === 'Inbox'}
			>
			  <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
			  <Text>About</Text>
			</Item>
			<Item
			  href="javascript:void(0)"
			  on:click={() => {setActive('Star')
				goto("/tutorial")
			   }}
			  activated={active === 'Star'}
			>
			  <Graphic class="material-icons" aria-hidden="true">star</Graphic>
			  <Text>Tutorial</Text>
			</Item>
			<Item
			  href="javascript:void(0)"
			  on:click={() => {setActive('Sent Mail')
			  redirect(300, "/token")
			 }}
			  activated={active === 'Sent Mail'}
			>
			  <Graphic class="material-icons" aria-hidden="true">send</Graphic>
			  <Text>Token</Text>
			</Item>
			<Item
			  href="javascript:void(0)"
			  on:click={() => {setActive('Drafts')
			  redirect(300, "/register")
			 }}
			  activated={active === 'Drafts'}
			>
			  <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
			  <Text>Register</Text>
			</Item>
	 
			<Separator />
			<Subheader tag="h6">Labels</Subheader>
			<Item
			  href="javascript:void(0)"
			  on:click={() => setActive('Family')}
			  activated={active === 'Family'}
			>
			  <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
			  <Text>Family</Text>
			</Item>
			<Item
			  href="javascript:void(0)"
			  on:click={() => setActive('Friends')}
			  activated={active === 'Friends'}
			>
			  <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
			  <Text>Friends</Text>
			</Item>
			<Item
			  href="javascript:void(0)"
			  on:click={() => setActive('Work')}
			  activated={active === 'Work'}
			>
			  <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
			  <Text>Work</Text>
			</Item>
		  </List>
		</Content>
	  </Drawer>
</header> -->

<!-- <style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style> -->
<!-- <style>

	.drawer-container {
	  position: relative;
	  display: flex;
	  height: 350px;
	  max-width: 600px;
	  border: 1px solid
		var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
	  overflow: hidden;
	  z-index: 0;
	}
   
	* :global(.app-content) {
	  flex: auto;
	  overflow: auto;
	  position: relative;
	  flex-grow: 1;
	}
   
	.main-content {
	  overflow: auto;
	  padding: 16px;
	  height: 100%;
	  box-sizing: border-box;
	}
  </style>

  
   -->

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
    } from '$lib/features/_common'

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
        /* overflow: hidden; */
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
		padding-top: 50px;
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
        height: calc(100vh - var(--header-height));
        top: var(--header-height);
        overflow: auto;
    }

</style>
