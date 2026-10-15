import { WEBPAY, webpayHeaders } from './lib/config.js'

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const amount = Math.round(Number(body.amount))
    const buyOrder = body.buyOrder || `MS-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    if (!amount || amount <= 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Monto inválido' }) }
    }

    const createBody = {
      buy_order: buyOrder,
      session_id: body.sessionId || 'morrow-session',
      amount,
      return_url: WEBPAY.returnUrl,
    }

    const res = await fetch(`${WEBPAY.basePath}/transactions`, {
      method: 'POST',
      headers: webpayHeaders(),
      body: JSON.stringify(createBody),
    })

    const data = await res.json()
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data.error_message || 'No se pudo iniciar el pago Webpay' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.url, token: data.token, buyOrder }),
    }
  } catch (error) {
    console.error('webpay-create error', error)
    return { statusCode: 500, body: JSON.stringify({ error: error.message || 'No se pudo iniciar el pago Webpay' }) }
  }
}