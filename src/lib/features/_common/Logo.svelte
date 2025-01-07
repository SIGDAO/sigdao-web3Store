<script>
    import whiteSvg from "$lib/assets/img/logoWhite.svg"
    import blackSvg from "$lib/assets/img/logoBlack.svg"
    import banner from '$lib/assets/img/badges/banner.svg'
    export let height
    export let dark = false

    // $: src = dark ? whiteSvg : blackSvg
</script>

<div class="logo" style="height:{height}">
    <img src={whiteSvg} alt="Sigdao | Web3 Store" />
    <!-- <img src={src} alt="Sigdao | Web3 Store" role="img" /> -->
</div>

<style>
    .logo img {
        height: 100%;
    }


</style>
