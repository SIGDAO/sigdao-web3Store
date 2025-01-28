    <script>
        import Tab, { Icon, Label } from '@smui/tab'
        import TabBar from '@smui/tab-bar'
        import Button from '@smui/button'
        import { goto } from '$app/navigation'
        import { RouteAccountTokens, RouteHome } from '../../utils/routes'
        import TabAccount from './TabAccount.svelte'
        import TabTokenInfo from './TabTokenInfo.svelte'
        import TabContent from '../_common/TabContent.svelte'
        import TabConfirm from './TabConfirm.svelte'
        import {
            isValidAccount,
            isValidDescription,
            isValidName,
            isValidRepoUrl,
            isValidImageFileUrl
        } from '../../utils/validators'
        import { calculateDataLength, registration$, tokenData } from './registrationStore'
        import {xtWallet$} from "../_common/xtWalletStore";
        import { account$ } from '../_common/accountStore'
        import { loading$ } from '../_common/appStore'
        import Introduction from './Introduction.svelte'
        import { MaxDataLength } from './constants'
        // create new smart contract 
        import { applicationTokenService } from '$lib/services/applicationTokenService'
        import { Events } from '../../utils/events'
        import { dispatchEvent } from '../../utils/dispatchEvent'
        const TabNames = {
            Account: 'Account',
            AppInfo: 'Application Info',
            Confirm: 'Confirm',
        }
        
        const Tabs = [
            TabNames.Account,
            TabNames.AppInfo,
            TabNames.Confirm,
        ]

        let started = false
        let active = TabNames.Account
        let account = null

        $: currentTabIndex = Tabs.indexOf(active)
        $: isFirstTab = currentTabIndex === 0
        $: isLastTab = currentTabIndex === Tabs.length - 1
        $: isInvalid = false

        function handleCancel() {
            goto(RouteHome())
        }

        function handleStart() {
            started = true
        }

        async function handleRegister() {
            try{
            
            const passphraseOrConnection = $xtWallet$.wallet || $registration$.passphrase
                await applicationTokenService.registerToken(tokenData(), passphraseOrConnection)
                await goto(RouteAccountTokens($account$.accountId))
            }catch(e){
                // noop yet
            }
        }
    
        async function handleNext() {
            // console.log("currentTabIndex: " , currentTabIndex)
            try {
            if (currentTabIndex === 1){
            //console.log("currnetTab01")
            const response = await fetch($registration$.img);
            //console.log("response: ", response)
               if (response.ok) {
               // console.log("handleNextRes: ", response);
                const nextIndex = Math.min(currentTabIndex + 1, Tabs.length - 1)
                active = Tabs[nextIndex]
               }
            }else{
            const nextIndex = Math.min(currentTabIndex + 1, Tabs.length - 1)
            active = Tabs[nextIndex]
            }
        } catch (e) {
            dispatchEvent(Events.Error, "failed to fetch the image url");
        }
        }

        function handlePrevious() {
            const prevIndex = Math.max(currentTabIndex - 1, 0)
            active = Tabs[prevIndex]
        }

        $: isValidAccountStep = () => isValidAccount($registration$.account)
        $: isValidApplicationInfoStep = () => isValidAccountStep()
                && isValidName($registration$.name)
                && isValidDescription($registration$.desc)
                && isValidImageFileUrl($registration$.img)
                && isValidRepoUrl($registration$.repo)
             
        // $: isValidApplicationInfoStep = () => isValidAccountStep()
        //         && isValidName($registration$.name)
        //         && isValidDescription($registration$.desc)
        //         && isValidUrl($registration$.img)
        //         && isValidUrl($registration$.repo)
            //    $: isValidApplicationInfoStep = () => true
    $: isValidConfirmationStep = () => isValidApplicationInfoStep()
            && $registration$.isPassphraseValid
            && calculateDataLength() < MaxDataLength

    $: isNextEnabled = () => {
        if($loading$) return false;

        switch (active) {
            case TabNames.Account:
                return isValidAccountStep()
            case TabNames.AppInfo:
                return isValidApplicationInfoStep()
            case TabNames.Confirm:
                return isValidConfirmationStep()
            default:
                return false
        }
    }

</script>

<div class="registration">
    <div class="registration--header">
        <h4 class="mdc-typography--headline4">
            Register A New Application
        </h4>
    </div>
    {#if started}
        <TabBar tabs={Tabs} let:tab bind:active  disabled={true}>
            <Tab {tab} disabled={true}>
                <Label disabled={true}>{tab}</Label>
            </Tab>
        </TabBar>

        <TabContent>
            {#if active === TabNames.Account}
                <TabAccount accountId={$account$.accountId}/>
            {:else if active === TabNames.AppInfo}
                <TabTokenInfo />
            {:else if active === TabNames.Confirm}
                <TabConfirm />
            {/if}
        </TabContent>

        <div class="registration--footer">
            <Button on:click={handleCancel}>
                <Label>Cancel</Label>
            </Button>
            {#if !isFirstTab}
                <Button on:click={handlePrevious}>
                    <Label>Previous</Label>
                </Button>
            {/if}
            {#if isLastTab}
                <Button on:click={handleRegister} disabled={!isNextEnabled()}>
                    <Label>Register</Label>
                </Button>
            {:else}
                <Button on:click={handleNext} disabled={!isNextEnabled()}>
                    <Label>Next</Label>
                </Button>
            {/if}
        </div>
    {:else}
        <Introduction/>
        <div class="registration--footer">
            <Button on:click={handleCancel}>
                <Label>Cancel</Label>
            </Button>
            <Button on:click={handleStart}>
                <Label>Start</Label>
            </Button>
        </div>
    {/if}
</div>

<style>
    .registration {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .registration--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }
</style>