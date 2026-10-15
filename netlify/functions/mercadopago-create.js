import { CONFIG, buildReturnUrl } from './lib/config.js'

const MP_API = 'https://api.mercadopago.com/checkout/preferences'

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const amount = Math.round(Number(body.amount))
    const accessToken = CONFIG.mercadopago.accessToken

    if (!amount || amount <= 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Monto inválido' }) }
    }
    if (!accessToken || accessToken === 'TEST-00000000000000000000000000000000') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          init_point: null,
          sandbox_note: 'Mercado Pago no configurado. Define MP_ACCESS_TOKEN en Netlify.',
        }),
      }
    }

    const externalReference = `MS-${Date.now()}`
    const items = (body.items || []).map((item) => ({
      id: String(item.id),
      title: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: 'CLP',
    }))

    if (items.length === 0) {
      items.push({
        id: 'morrow',
        title: 'Pedido Morrow Skin',
        quantity: 1,
        unit_price: amount,
        currency_id: 'CLP',
      })
    }

    const returnUrl = buildReturnUrl(CONFIG.webpay.baseReturnUrl, '/confirmacion')
    const payload = {
      items,
      external_reference: externalReference,
      notification_url: `${CONFIG.webpay.baseReturnUrl}/api/mercadopago-webhook`,
      back_urls: {
        success: returnUrl,
        pending: returnUrl,
        failure: returnUrl,
      },
      auto_return: 'approved',
      purpose: 'normal_checkout',
    }

    const res = await fetch(MP_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('mercadopago create error', res.status, errText)
      return { statusCode: res.status, body: JSON.stringify({ error: 'Error al contactar Mercado Pago' }) }
    }

    const data = await res.json()
    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: data.init_point,
        sandbox_init_point: data.sandbox_init_point,
        id: data.id,
        external_reference: externalReference,
      }),
    }
  } catch (error) {
    console.error('mercadopago-create error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'No se pudo iniciar el pago con Mercado Pago' }),
    }
  }
}