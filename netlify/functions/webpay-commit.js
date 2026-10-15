import { WebpayPlus, IntegrationCommerceCodes, IntegrationApiKeys } from 'transbank-sdk'
import { CONFIG } from './lib/config.js'

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const token = body.token

    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Falta el token de transacción' }) }
    }

    const tx = CONFIG.webpay.isProduction
      ? WebpayPlus.Transaction.buildForProduction(CONFIG.webpay.commerceCode, CONFIG.webpay.apiKey)
      : WebpayPlus.Transaction.buildForIntegration(CONFIG.webpay.commerceCode, CONFIG.webpay.apiKey)

    const response = await tx.commit(token)

    const ok = response.status === 'AUTHORIZED'
    return {
      statusCode: 200,
      body: JSON.stringify({ ok, response }),
    }
  } catch (error) {
    console.error('webpay-commit error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message || 'No se pudo confirmar el pago' }),
    }
  }
}