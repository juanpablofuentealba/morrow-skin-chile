import { WebpayPlus, IntegrationCommerceCodes, IntegrationApiKeys } from 'transbank-sdk'
import { CONFIG, buildReturnUrl } from './lib/config.js'

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const amount = Math.round(Number(body.amount))
    const buyOrderRandom = `MS-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    if (!amount || amount <= 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Monto inválido' }) }
    }

    const tx = CONFIG.webpay.isProduction
      ? WebpayPlus.Transaction.buildForProduction(CONFIG.webpay.commerceCode, CONFIG.webpay.apiKey)
      : WebpayPlus.Transaction.buildForIntegration(CONFIG.webpay.commerceCode, CONFIG.webpay.apiKey)

    // En integración (sandbox) el returnUrl debe apuntar a nuestro dominio para recibir el retorno.
    const returnUrl = buildReturnUrl(CONFIG.webpay.baseReturnUrl, '/confirmacion')

    const response = await tx.create(buyOrderRandom, body.sessionId || 'morrow-session', amount, returnUrl)

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: response.url,
        token: response.token,
        buyOrder: buyOrderRandom,
      }),
    }
  } catch (error) {
    console.error('webpay-create error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'No se pudo iniciar el pago Webpay' }),
    }
  }
}