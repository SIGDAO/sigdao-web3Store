import { preloadToken } from "$lib/utils/preloadToken";

export async function load({ params }) {
    console.log("params: " , params.slug)
    // the error by assign the slug to undefined object 
    // const { tokenId } = params.slug;
    const tokenId = params.slug;
    console.log("tokenId: ", tokenId)
    const token = await preloadToken(params.slug);
    console.log("token: ", token)
	return { tokenId, tokenData: token };;
}