<script>
    import {showModal} from '../../../stores';

	let dialog; // HTMLDialogElement

	$: if (dialog && $showModal) dialog.showModal();

	import {goto, preloadData} from '$app/navigation'
  import Dialog, {Title, Content, Actions, } from '@smui/dialog'
  import Button, {Label} from '@smui/button'
  import TextField from '@smui/textfield'
  import HelperText from '@smui/textfield/helper-text'
  import {RouteAccountTokens, RouteRegister} from '../../utils/routes'
  import {Events} from '../../utils/events'
  import {assureAccountId} from '../../utils/assureAccountId'
  import {isEmptyString} from '../../utils/isEmptyString'
  import {dispatchEvent} from '../../utils/dispatchEvent'
  import debounce from 'lodash.debounce'
  import {accountService} from '../../services/accountService'
  import {setAccount} from './accountStore'
  import Link from "./Link.svelte";
  import {connectXtWallet} from "./xtWalletStore";
  import {getXtWalletLink} from "../../utils/getXtWalletLink";

  let isRegistering = false
  let account = ''
  let isValidating = false
  let isValid = false
  


  async function validateAccount(accountId) {
    isValidating = true
    isValid = await accountService.existsAccount(accountId)
    isValidating = false
  }

  const debouncedValidateAccount = debounce(validateAccount, 300)

  $: accountId = assureAccountId(account)
  $: {
    debouncedValidateAccount(accountId)
  }

  function handleEnter() {
    preloadData(RouteAccountTokens(accountId))
	dialog.close()
    // dispatchEvent(Events.ShowAccountDialog, false)
    setAccount(accountId)
    setTimeout(() => {
      goto(RouteAccountTokens(accountId))
    }, 500)
  }

  function handleRegister() {
    setAccount(accountId)
    preloadData(RouteRegister())
	dialog.close()
    // dispatchEvent(Events.ShowAccountDialog, false)
    setTimeout(() => {
      goto(RouteRegister())
    }, 500)
  }

  function handleCancel() {
    dispatchEvent(Events.ShowAccountDialog, false)
  }

  function showDialog({detail}) {
    const {isVisible, wantsRegister = false} = detail
    isRegistering = wantsRegister
    if (isVisible) {
      dialog.open()
    } else {
      dialog.close()
    }
  }




</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal.set(false))}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<Title>Enter Account Zone</Title>
		<Content>
			<div class="center">
				<img src="/img/login.svg" alt="Account Zone">
			</div>
			<p>
				In the Account Zone you can see the tokens of a single account. This is especially useful for the token
				owners, because there are more functions like (de)activation and transfer available.
			</p>
			<p>
				It's highly recommended to use the
				<Link inline href={getXtWalletLink()} target="_blank">XT Wallet</Link>
				,
				But you can add any account manually also if you to see only tokens of that account.
				Note: Without XT Wallet one have access to owners token functions only by using the passphrase
			</p>
	
			<TextField
					bind:value={account}
					invalid={!isValid}
					label="Account"
			/>
			{#if isEmptyString(account)}
				<HelperText>Enter a valid account address or id</HelperText>
			{:else}
				<HelperText validationMsg>The account is not valid</HelperText>
			{/if}
		</Content>
		<Actions>
			<Button on:click={() => dialog.close()}>
				<Label>Cancel</Label>
			</Button>
			<Button on:click={isRegistering ? handleRegister : handleEnter} disabled={!isValid || isValidating}>
				<Label>{isValidating ? 'Checking...' : 'Enter'}</Label>
			</Button>
			<Button on:click={() =>  {connectXtWallet()
			setTimeout(() => {
			dialog.close()
			}
		)
			}}>
				<Label>Connect XT Wallet</Label>
			</Button>
		</Actions>
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close</button> -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 50em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
	.center {
        text-align: center;
    }

    .center > img {
        height: 128px;
    }
</style>