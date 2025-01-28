
const toQueryString = json => Object.keys(json).map( k => `${k}=${encodeURIComponent(json[k])}`).join('&')

export const withQuery = jsonArgs => route => {
    return `${route}?${toQueryString(jsonArgs)}`
}

export const RouteHome = () => '/'
export const RouteDonate = at => `/vote/${at}`
export const RouteTokenDetail = at => `/token/${at}`
export const RouteActivate = at => `/activate/${at}`
export const RouteDeactivate = at => `/deactivate/${at}`
export const RouteTransfer = at => `/transfer/${at}`
export const RouteRegister = () => `/register`
export const RouteAccountTokens = (accountId, wantsRegister = false) => `/account/${accountId}${wantsRegister?'?register=true':''}`
export const RouteTutorial = () => '/tutorial'
export const RouteAbout = () => '/about'
export const RouteLike = () => '/like'

