import { WEBPAY, webpayHeaders } from './lib/config.js'

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const token = body.token

    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Falta el token de transacción' }) }
    }

    const res = await fetch(`${WEBPAY.basePath}/transactions/${token}`, {
      method: 'PUT',
      headers: webpayHeaders(),
    })

    const data = await res.json()
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ ok: false, error: data.error_message || 'No se pudo confirmar el pago' }),
      }
    }

    const ok = data.status === 'AUTHORIZED'
    return { statusCode: 200, body: JSON.stringify({ ok, response: data }) }
  } catch (error) {
    console.error('webpay-commit error', error)
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: error.message || 'No se pudo confirmar el pago' }) }
  }
}