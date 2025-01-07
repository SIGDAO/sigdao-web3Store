// export const get = async (req, res) => {
//     res.end('DAppository is running fine...')
// }

import { json } from '@sveltejs/kit';

export function GET() {
    console.log("ok");
	return new Response('Web3store is running fine...');
}
