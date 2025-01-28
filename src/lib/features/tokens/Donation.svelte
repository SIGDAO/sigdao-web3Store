<script>
    import TextField from '@smui/textfield'
    import HelperText from '@smui/textfield/helper-text'
    import Button, { Label } from '@smui/button'
    import {Page, TokenItem, TokenItemVariant, feeStore, PaymentQrCode, xtWalletStore } from '../_common'
    import { TokenContract } from '../../context'
    import {Amount} from "@signumjs/util";
    import {xtWallet$} from "../_common/xtWalletStore";
    import { composeApi } from '@signumjs/core';

    export let token = {
        at: '',
        name: '',
        desc: '',
        repo: '',
        img: null,
        tags: [],
        donationPlanck: '0',
        isActive: true,
    }

    const { fee$ } = feeStore
    const AmountValidationPattern = /^[1-9]\d*$/

    let amount = ''
    let sigdaoAmount = ''
    $: isConnectedtWithXt =  $xtWallet$.wallet !== null
    $: isValidAmount = AmountValidationPattern.test(amount)
    $: isEmptyAmount = amount.length === 0
    $: isValidSigdaoAmount = AmountValidationPattern.test(sigdaoAmount)
    $: isEmptySigdaoAmount = sigdaoAmount.length === 0
    $: isQrCodeVisible = !isEmptyAmount && isValidAmount && !isEmptySigdaoAmount && isValidSigdaoAmount
    $: suggestedFee = $fee$
    $: costs = isQrCodeVisible ? [
        ['Voting amount in SIGNA:', Amount.fromSigna(amount || 0)],
        ['Entitlement (100 SIGNA will be refund):', Amount.fromSigna(TokenContract.DonationEntitlement)],
    ] : []

    function handleCancel() {
        history.back()
    }
//     async function showTheTokenInfo() {
//         console.log("token:",token);
//         console.log("xtWallet:", $xtWallet$.wallet );
//         console.log("currentNodeHost:", $xtWallet$.wallet._connection.currentNodeHost);
//         // get Get Token Transfers => check the sigdao is enough or not  => send the request to xt-wallet => sign the transaction 
  

//         fetch(`${$xtWallet$.wallet._connection.currentNodeHost}/api?requestType=getAccountAssets&account=${$xtWallet$.wallet._connection.accountId}`)
//             .then(response => response.json())
//             .then(data => {
//                 let sigdao = data.assetBalances.filter(assetBalance => assetBalance.asset === "5453974739826751020")
//                 console.log("sigdao:",sigdao);
//                 if (sigdao.length === 0) {
//                     throw new Error("no sigdao");
//                 }
//                 if (sigdao[0].balanceQNT < 10000000) {
//                     console.log("not enough balance");
//                     throw new Error("not enough balance");
//                 }
//                 console.log(data.assetBalances);
//                 console.log(`enough balance`);
//                 return true 
//             })
//             .then(
//                 data => {
//                     if (data) {
//                         console.log("send the request to xt-wallet")
// //                         curl -X POST "https://europe.signum.network/api?requestType=transferAsset&recipient=14679997900395732198&asset=5453974739826751020&quantityQNT=100&amountNQT=0&feeNQT=1000000&publicKey=9bcbf1cc760e81b7c7407646c947495e8224e0de0167a69198050af7aab67d0c&deadline=60&broadcast=true" \
// //  -H "Accept: application/json" \
//                     fetch(`https://europe.signum.network/api?requestType=transferAsset&recipient=14679997900395732198&asset=5453974739826751020&quantityQNT=10000000&amountNQT=0&feeNQT=1000000&publicKey=9bcbf1cc760e81b7c7407646c947495e8224e0de0167a69198050af7aab67d0c&deadline=60&broadcast=true`)
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log(data);
//                     $xtWallet$.wallet.confirm(data.unsignedTransactionBytes)
//                     .then(() => {
//                         console.log("Transaction successfully transmitted");
//                     })
//                     .catch(() => {
//                         console.log("Transaction not sent");
//                     });
//                     })  
//                     .catch(error => {
//                         console.error('Error:', error);
//                     });
                        
//                     }
//                 }
//             )
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }
</script>


<Page id="donation">
    <div class="header">
        <img src="/img/donation.svg" alt="donate">
        <div class="mdc-typography--headline6">Voting</div>
    </div>
    <div class="form">
        <div class="form--header">
            <article class="description">
                <!-- <p class="mdc-typography--body1">
                    Exemplary Attitude!
                </p>
                <p class="mdc-typography--body1">
                    Voting not only helps the project itself and fills the owner with pride through
                    the experienced recognition, but also helps the Signum community. Thank you very much.
                </p> -->
                <p class="mdc-typography--body1">
                    Note that you will be charged an <em>Entitlement Fee</em> of {TokenContract.DonationEntitlement} SIGNA and then charged at least 1 SIGDAO and 1 SIGNA for voting amount.
                    But the entitlement fee of 100 SIGNA will be refund entirely once the voting was processed.
                </p>
            </article>
            <div class="item-wrapper">
                <TokenItem data={token} variant={TokenItemVariant.NoActions}/>
            </div>
        </div>
        <div class="form--input">
            <div class="form--input-field">
                <TextField bind:value={amount}
                           invalid={!isEmptyAmount && !isValidAmount}
                           label="Voting Amount in SIGNA"
                />
             
                {#if isEmptyAmount}
                    <HelperText>Enter the amount you like to donate</HelperText>
                {:else}
                    <HelperText validationMsg>Invalid Amount</HelperText>
                {/if}
            </div>
            <span class="mdc-typography--headline6"></span>
        </div>
        
        <div class="form--input">
            <div class="form--input-field">
                <TextField bind:value={sigdaoAmount}
                invalid={!isEmptyAmount && !isValidSigdaoAmount}
                label="Voting Amount in SIGDAO"
                />
                {#if isEmptyAmount}
                    <HelperText>Enter the amount you like to donate</HelperText>
                {:else}
                    <HelperText validationMsg>Invalid Amount</HelperText>
                {/if}
            </div>
            <span class="mdc-typography--headline6"></span>
        </div>
        

        {#if isQrCodeVisible}
            <PaymentQrCode recipient={token.at}
                           costs={costs}
                           fee={$fee$}
                           token={token}
                           sigdaoAmount={sigdaoAmount}
                           />
        {/if}

        <div class="form--footer">
            <Button on:click={handleCancel}>
                <Label>Back</Label>
            </Button>
            <!-- <Button on:click={showTheTokenInfo}>
                <Label>Send 10 sigdao to owner</Label>
            </Button> -->
        </div>
    </div>
</Page>


<style>

    .header {
        text-align: center;
        margin-bottom: 1rem;
    }

    .header img {
        height: 96px;
        width: 96px;
        text-align: center;
    }

    .form {
        display: block;
        max-width: 600px;
        margin: 0 auto
    }

    .form--header {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-bottom: 2rem;
    }

    .form--header > .description {
        text-align: justify;
        width: 50%;
        margin: 0;
    }

    .form--header p {
        margin: 0.5rem 0 0;
    }

    .form--header > .item-wrapper {
        margin-left: 1rem;
        width: 50%;
    }

    .form--footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }

    .form--input {
        display: flex;
        align-items: center;
    }

    .form--input-field {
        display: block;
        width: 100%;
    }

    @media (max-width: 480px) {
        .form--header {
            flex-direction: column;
        }

        .form--header > p {
            width: 100%;
        }

        .form--header > .item-wrapper {
            margin: 1rem 0;
            width: 100%;
        }

        .form--header > .description {
            width: 100%;
        }
    }

    :global(#donation .form .mdc-text-field__input) {
        font-size: 1rem !important;
    }

    :global(.form .mdc-text-field) {
        width: 100% !important;
    }

</style>
