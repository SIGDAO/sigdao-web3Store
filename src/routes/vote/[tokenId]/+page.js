import { preloadToken } from "$lib/utils/preloadToken";

export async function load({ params }) {
    // console.log("params: " , params.tokenId)
    // donate
    // the error by assign the slug to undefined object 
    // const { tokenId } = params.slug;
    const tokenId = params.tokenId;
    // console.log("tokenId: ", tokenId)
    const token = await preloadToken(params.tokenId);
    // console.log("token: ", token)
	return { tokenId, tokenData: token };;
}