// Configuración compartida para las funciones serverless de Netlify.
// En sandbox usamos los valores de integración públicos de cada pasarela.
// Para producción, define las variables en Netlify (Site settings > Environment variables).

import { IntegrationCommerceCodes, IntegrationApiKeys } from 'transbank-sdk'

export function getEnv(name, fallback = '') {
  return process.env[name] || fallback
}

// Netlify expone automáticamente la URL del sitio en `URL` (ej: https://my-site.netlify.app).
// La usamos como base preferente para las URLs de retorno en deployments.
function resolveSiteUrl() {
  const env = process.env.PUBLIC_SITE_URL || process.env.URL || process.env.NETLIFY_URL || 'http://localhost:8888'
  return env
}

export const CONFIG = {
  // Transbank / Webpay Plus
  webpay: {
    commerceCode: getEnv('TBK_COMMERCE_CODE', IntegrationCommerceCodes.WEBPAY_PLUS),
    apiKey: getEnv('TBK_API_KEY', IntegrationApiKeys.WEBPAY),
    isProduction: getEnv('TBK_ENV') === 'production',
    baseReturnUrl: resolveSiteUrl(),
  },
  // Mercado Pago
  mercadopago: {
    accessToken: getEnv('MP_ACCESS_TOKEN', ''),
    isProduction: getEnv('MP_ENV') === 'production',
    publicKey: getEnv('MP_PUBLIC_KEY', ''),
  },
}

// Construye la URL de retorno a la que Transbank redirige al cliente después de pagar.
export function buildReturnUrl(base, path) {
  return `${base.replace(/\/$/, '')}${path}`
}