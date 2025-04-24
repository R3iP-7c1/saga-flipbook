export default defineNuxtRouteMiddleware((to) => {
    const config = useRuntimeConfig()
    const expectedToken = config.public.accessToken
    const tokenFromUrl = to.query.auth_token

    if (tokenFromUrl !== expectedToken) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Accès refusé : token manquant ou invalide',
            fatal: true
        })
    }
})
