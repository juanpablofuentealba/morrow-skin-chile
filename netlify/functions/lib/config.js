// Configuración compartida para las funciones serverless de Netlify.
// Llamamos directamente a las APIs REST de cada pasarela con `fetch` nativo,
// sin dependencias pesadas, para máxima compatibilidad en el runtime de Netlify.

export function getEnv(name, fallback = '') {
  return process.env[name] || fallback
}

// Netlify expone la URL del sitio en `URL` automáticamente.
function resolveSiteUrl() {
  return process.env.PUBLIC_SITE_URL || process.env.URL || process.env.NETLIFY_URL || 'http://localhost:8888'
}

const siteUrl = resolveSiteUrl()

// ---------------------------------------------------------------------------
// Transbank / Webpay Plus (REST). Headers de autenticación:
//   Tbk-Api-Key-Id    -> commerceCode
//   Tbk-Api-Key-Secret -> apiKey
// ---------------------------------------------------------------------------
export const WEBPAY = {
  commerceCode: getEnv('TBK_COMMERCE_CODE', '597055555532'), // código de integración estándar
  apiKey: getEnv('TBK_API_KEY', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'), // API key de integración estándar Webpay+
  isProduction: getEnv('TBK_ENV') === 'production',
  basePathProduction: 'https://webpay3g.transbank.cl/rswebpaytransaction/api/webpay/v1.2',
  basePathIntegration: 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2',
  get basePath() {
    return this.isProduction ? this.basePathProduction : this.basePathIntegration
  },
  returnUrl: `${siteUrl.replace(/\/$/, '')}/confirmacion`,
}

// ---------------------------------------------------------------------------
// Mercado Pago
// ---------------------------------------------------------------------------
export const MERCADOPAGO = {
  accessToken: getEnv('MP_ACCESS_TOKEN', ''),
  isProduction: getEnv('MP_ENV') === 'production',
}

// ---------------------------------------------------------------------------
// Helpers para transbank-sdk
// ---------------------------------------------------------------------------
export function webpayHeaders() {
  return {
    'Content-Type': 'application/json',
    'Tbk-Api-Key-Id': WEBPAY.commerceCode,
    'Tbk-Api-Key-Secret': WEBPAY.apiKey,
  }
}