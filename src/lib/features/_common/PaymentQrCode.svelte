<script>
  import Button, {Label} from '@smui/button'
  import QrCode from 'qrcode'
  import {mountDeepLink} from '../../utils/deeplink'
  import {assureAccountId} from '../../utils/assureAccountId'
  import {dispatchEvent} from '../../utils/dispatchEvent'
  import {theme$} from './appStore'
  import {ThemeNames} from '../../utils/themeNames'
  import {convertNumericIdToAddress} from "./convertNumericIdToAddress";
  import {Amount, FeeQuantPlanck} from "@signumjs/util";
  import {xtWallet$} from "./xtWalletStore";
  import {Events} from "../../utils/events";
  import Link from "./Link.svelte";
  import {getXtWalletLink} from "../../utils/getXtWalletLink";
  import {ledgerService} from "../../services/ledgerService";

  export let recipient = ""
  export let costs = []
  export let fee = Amount.fromPlanck(FeeQuantPlanck.toString())
  export let sigdaoAmount = ""
  export let message = null
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

  let info = []
  let QrCodeCanvas = null
  let walletOpen = false

  $: wallet = $xtWallet$.wallet
  $: totalCosts = costs.reduce((sum, [_, value]) => sum.add(value), Amount.fromSigna(0))
  $: {
    info = []
    const recipientAddress = convertNumericIdToAddress(assureAccountId(recipient))
    info.push(['Recipient:', recipientAddress])
    info.push(...costs)
    info.push(['Sigdao Donation:', (sigdaoAmount+' SIGDAO')])
    info.push(['Fee:', fee])
    info.push(['---', ''])
    info.push(['Total:', (Amount.fromSigna(totalCosts.getSigna()).add(fee) + " & " + sigdaoAmount+ " SIGDAO")])
  }

  $: deepLink = mountDeepLink(recipient, totalCosts, fee, message)

  $: {
    if (QrCodeCanvas !== null) {
      QrCode.toCanvas(QrCodeCanvas, deepLink, {
        width: 256,
        color: {
          light: $theme$ === ThemeNames.Dark ? '#323f65ff' : '#ffffffff',
          dark: $theme$ === ThemeNames.Dark ? '#b2b2d4ff' : '#001e35ff',
        },
      })
    }
  }

  async function payNow() {
    if (wallet) {
      const paySigdaoResult = await paySigdaoWithXtWallet();
      console.log("paySigdaoResult:",paySigdaoResult);
      if (paySigdaoResult === true ){
        dispatchEvent(Events.Success, "Sigdao Transaction successfully transmitted")
        await payWithXtWallet()
      }else {
        dispatchEvent(Events.Error, "Sigdao Transaction not sent")
      }
      // await payWithXtWallet()
    } else {
      openDeeplink()
    }
  }

  async function payWithXtWallet() {
    walletOpen = true
    try {
      const {unsignedTransactionBytes} = await ledgerService.client.transaction.sendAmountToSingleRecipient({
        senderPublicKey: wallet.connection.publicKey,
        feePlanck: fee.getPlanck(),
        amountPlanck: totalCosts.getPlanck(),
        recipientId: recipient
      })
      await wallet.confirm(unsignedTransactionBytes)
      dispatchEvent(Events.Success, "Transaction successfully transmitted")
    } catch (e) {
      dispatchEvent(Events.Error, "Transaction not sent")
    } finally {
      walletOpen = false
    }

  }
  async function paySigdaoWithXtWallet(){
        console.log("token:",token);
        console.log("recipient:",recipient);
        console.log("xtWallet:", $xtWallet$.wallet );
        console.log("currentNodeHost:", $xtWallet$.wallet._connection.currentNodeHost);
        console.log("fee:",fee);
        console.log("cost",totalCosts.getPlanck());
        // get Get Token Transfers => check the sigdao is enough or not  => send the request to xt-wallet => sign the transaction 
        try {
        const responseByGetAccountAssets = await fetch(`${$xtWallet$.wallet._connection.currentNodeHost}/api?requestType=getAccountAssets&account=${$xtWallet$.wallet._connection.accountId}`);
        const dataByGetAccountAssets = await responseByGetAccountAssets.json();
        if (dataByGetAccountAssets) {
            console.log("dataByGetAccountAssets:",dataByGetAccountAssets);
            let sigdao = dataByGetAccountAssets.assetBalances.filter(assetBalance => assetBalance.asset === "5453974739826751020")
            console.log("sigdao:",sigdao);
            if (sigdao.length === 0) {
                throw new Error("no sigdao");
            }
            if (sigdao[0].balanceQNT < 10000000) {
                console.log("not enough balance");
                throw new Error("not enough balance");
            }
            console.log(dataByGetAccountAssets.assetBalances);
            console.log(`enough balance`);
            const responseByTransferAsset = await fetch(`${$xtWallet$.wallet._connection.currentNodeHost}/api?requestType=transferAsset&recipient=${token.creator}&asset=5453974739826751020&quantityQNT=${parseInt(sigdaoAmount)*1000000}&amountNQT=0&feeNQT=1000000&publicKey=${wallet.connection.publicKey}&deadline=60`);
            const dataByTransferAsset = await responseByTransferAsset.json();
            console.log(dataByTransferAsset);
            const confirmResult = await $xtWallet$.wallet.confirm(dataByTransferAsset.unsignedTransactionBytes);
            console.log("confirmResult:",confirmResult);
            return true
        }
      } catch (error) {
        console.error('Error:', error);
        return false
      }
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
//                         return true
//                     })
//                     .catch(() => {
//                         console.log("Transaction not sent");
//                         return false
//                     });
//                     })  
//                     .catch(error => {
//                         console.error('Error:', error);
//                     });
//                         return false 
//                     }
//                 }
//             )
//             .catch(error => {
//                 console.error('Error:', error);
//                 return false
//             });
  }
  function openDeeplink() {
    window.open(deepLink, '_blank')
  }

</script>

<div class="form--qrcode">
    <!-- <a href={deepLink}>
        <canvas bind:this={QrCodeCanvas}></canvas>
    </a> -->
    <section>
        <!-- <p>
            Scan the code with a QR-Code scanner,
            or click [PAY] button, to open a wallet
        </p> -->

        <ul>
            {#each info as [label, value]}
                <li class="form--qrcode-infoitem">
                    { `${label} ${value}` }</li>
            {/each}
        </ul>


        <div class="paynow">
          {#if wallet}
            <Button on:click={payNow} disabled={walletOpen}>
                <Label>{wallet ? "Pay with XT wallet" : "Pay via Deeplink"}</Label>
            </Button>
          {/if}
            {#if !wallet}
                <p>Please connect to
                  <Label> <Link inline href={getXtWalletLink()} target="_blank">XT Wallet</Link></Label>
                </p>
            {/if}
        </div>

    </section>
</div>

<style>
    .form--qrcode {
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .form--qrcode > canvas {
        cursor: pointer;
    }

    .form--qrcode > section {
        text-align: justify;
        font-size: 0.75rem;
        font-family: sans-serif;
        line-height: 1rem;
    }

    .form--qrcode > section > ul {
        margin: 0;
        padding: 0;
    }

    .form--qrcode > section > .paynow {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form--qrcode-infoitem {
        list-style: none;
    }

    @media (max-width: 480px) {

        .form--qrcode {
            flex-direction: column;
        }

        .form--qrcode > section {
            text-align: center;
        }
    }


</style>
