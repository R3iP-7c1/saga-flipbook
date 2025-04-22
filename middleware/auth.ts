export default defineNuxtRouteMiddleware((to) => {
    const config = useRuntimeConfig()
    const expectedToken = config.public.accessToken
    const tokenFromUrl = to.query.auth_token

    if (tokenFromUrl !== expectedToken) {
        // return abortNavigation("Clé d'accès invalide")
        return navigateTo('/unauthorized')
    }
})
