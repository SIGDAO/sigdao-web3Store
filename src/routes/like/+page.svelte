

<script>
    import { onMount } from "svelte";
    import { goto, preloadData } from "$app/navigation";
    import { RouteRegister } from "$lib/utils/routes";
    import LikeTokenList from "$lib/features/like/LikeTokenList.svelte";
    import { RegisterFabButton, GenericMetaHead } from "$lib/features/_common";

    function redirectToRegister() {
        goto(RouteRegister());
    }

    const prefetchRegisterRoute = () => {
        preloadData(RouteRegister());
    };
    export let data;
    export let accountId;
    export let register;

    onMount(() => {
        if (register) {
            redirectToRegister();
        }
    });
    $: accountId = data.accountId;
    $: register = data.register;
</script>

<GenericMetaHead/>
<div>
    <!-- {#if accountId} -->
    <LikeTokenList />
    <!-- <RegisterFabButton on:mouseenter={prefetchRegisterRoute} on:click={redirectToRegister}/> -->
    <!-- {/if} -->
</div>