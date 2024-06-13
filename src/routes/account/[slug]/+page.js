
    export async function load({ params, query }) {
        console.log("params: ", params)
        console.log("query: ", query)
        const  accountId  = params.slug;
        const register = false ;
        console.log("accountId", accountId)
        console.log("register", register)
        return { accountId, register }
    }
