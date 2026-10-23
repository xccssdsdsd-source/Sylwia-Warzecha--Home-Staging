const MAX_BODY_BYTES = 10 * 1024
const MESSAGE_TTL_SECONDS = 180 * 24 * 60 * 60
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60
const MESSAGES_LIMIT = 100
const MIN_ADMIN_TOKEN_LENGTH = 32
const TOPICS = new Set(['sprzedaz', 'wynajem', 'konsultacja', 'inwestor', 'inne'])

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'sha256-Du+OJKJSbdUgz5nrHeWWINvez6XKDDU/tyj/5c2uvwo='",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "object-src 'none'",
  "require-trusted-types-for 'script'",
  "trusted-types 'none'",
  'upgrade-insecure-requests'
].join('; ')

const PERMISSIONS_POLICY = [
  'accelerometer=()', 'autoplay=()', 'bluetooth=()',
  'browsing-topics=()', 'camera=()', 'display-capture=()', 'encrypted-media=()',
  'fullscreen=(self)', 'geolocation=()', 'gyroscope=()', 'hid=()', 'identity-credentials-get=()',
  'idle-detection=()', 'interest-cohort=()', 'local-fonts=()', 'magnetometer=()', 'microphone=()',
  'midi=()', 'otp-credentials=()', 'payment=()', 'picture-in-picture=()', 'publickey-credentials-create=()',
  'publickey-credentials-get=()', 'screen-wake-lock=()', 'serial=()', 'storage-access=()', 'usb=()',
  'web-share=()', 'window-management=()', 'xr-spatial-tracking=()'
].join(', ')

const SECURITY_HEADERS = {
  'Content-Security-Policy': CSP,
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': PERMISSIONS_POLICY,
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'X-Frame-Options': 'DENY'
}

const MSG = {
  server: 'Nie udało się wysłać wiadomości. Spróbuj później albo zadzwoń: 574 180 397.',
  method: 'Niedozwolona metoda.',
  origin: 'Nieprawidłowe źródło żądania.',
  tooLarge: 'Wiadomość jest zbyt duża (maks. 10 KB).',
  mediaType: 'Nieobsługiwany format danych.',
  malformed: 'Nieprawidłowe dane formularza.',
  rateLimit: 'Wysłano zbyt wiele wiadomości. Spróbuj ponownie za godzinę.',
  name: 'Podaj imię (od 2 do 80 znaków).',
  email: 'Podaj poprawny adres e-mail.',
  phone: 'Podaj poprawny numer telefonu (cyfry, spacje, +, -, nawiasy; maks. 30 znaków).',
  message: 'Wiadomość powinna mieć od 10 do 2000 znaków.',
  topic: 'Wybierz temat z listy.',
  notFound: 'Nie znaleziono.',
  unauthorized: 'Brak autoryzacji.'
}

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/
const PHONE_RE = /^[0-9+\-() ]+$/
const CONTROL_SINGLE_LINE_RE = /[\u0000-\u001F\u007F-\u009F​-‏‪-‮⁠-⁩﻿]/g
const CONTROL_MULTI_LINE_RE = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F​-‏‪-‮⁠-⁩﻿]/g

const encoder = new TextEncoder()

export default {
  async fetch(request, env) {
    let response
    try {
      response = await route(request, env)
    } catch (err) {
      console.error('unhandled', err && err.name)
      response = json({ ok: false, error: MSG.server }, 500)
    }
    return withSecurityHeaders(response)
  }
}

async function route(request, env) {
  const url = new URL(request.url)
  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }
  const path = url.pathname

  if (path === '/api' || path.startsWith('/api/')) {
    if (path === '/api/contact') return handleContact(request, env, url)
    if (path === '/api/messages') return handleMessages(request, env)
    return json({ ok: false, error: MSG.notFound }, 404)
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
  }

  const asset = await env.ASSETS.fetch(request)
  const res = new Response(asset.body, asset)
  const ct = res.headers.get('Content-Type')
  if (ct && !/charset=/i.test(ct) && /^(?:text\/[a-z+.-]+|application\/(?:javascript|json|xml|manifest\+json))\s*$/i.test(ct)) {
    res.headers.set('Content-Type', `${ct.trim()}; charset=utf-8`)
  }
  const cacheControl = assetCacheControl(path, res)
  if (cacheControl) res.headers.set('Cache-Control', cacheControl)
  return res
}

function assetCacheControl(path, res) {
  const type = (res.headers.get('Content-Type') || '').toLowerCase()
  const cacheable = res.status === 200 || res.status === 304
  if (type.startsWith('text/html')) return 'public, max-age=0, must-revalidate'
  if (!cacheable) return 'no-store'
  if (path.startsWith('/img/') || /\.(?:woff2?|ttf|otf|eot)$/i.test(path) || type.startsWith('font/')) {
    return 'public, max-age=31536000, immutable'
  }
  if (/\.(?:css|js|mjs)$/i.test(path) || type.startsWith('text/css') || type.includes('javascript')) {
    return 'public, max-age=86400'
  }
  return 'public, max-age=3600'
}

function withSecurityHeaders(response) {
  const res = new Response(response.body, response)
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v)
  return res
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
      ...extraHeaders
    }
  })
}

function fail(status, error, field, extraHeaders) {
  const body = { ok: false, error }
  if (field) body.field = field
  return json(body, status, extraHeaders)
}

async function handleContact(request, env, url) {
  if (request.method !== 'POST') return fail(405, MSG.method, undefined, { Allow: 'POST' })

  const origin = request.headers.get('Origin')
  if (!origin || origin !== url.origin) return fail(403, MSG.origin)
  const fetchSite = request.headers.get('Sec-Fetch-Site')
  if (fetchSite && fetchSite !== 'same-origin') return fail(403, MSG.origin)

  const declared = request.headers.get('Content-Length')
  if (declared !== null) {
    const n = Number(declared)
    if (!Number.isFinite(n) || n < 0) return fail(400, MSG.malformed)
    if (n > MAX_BODY_BYTES) return fail(413, MSG.tooLarge)
  }

  const contentType = (request.headers.get('Content-Type') || '').toLowerCase()
  const mediaType = contentType.split(';')[0].trim()
  if (!['application/x-www-form-urlencoded', 'multipart/form-data', 'application/json'].includes(mediaType)) {
    return fail(415, MSG.mediaType)
  }

  const bytes = await readCapped(request, MAX_BODY_BYTES)
  if (bytes === null) return fail(413, MSG.tooLarge)

  const raw = await parseBody(bytes, mediaType, request.headers.get('Content-Type'))
  if (raw === null) return fail(400, MSG.malformed)

  if (raw.website.trim() !== '') return json({ ok: true })

  const result = validate(raw)
  if (result.error) return fail(422, result.error, result.field)

  const limited = await checkRateLimit(request, env)
  if (limited) return fail(429, MSG.rateLimit, undefined, { 'Retry-After': String(limited) })

  const now = new Date()
  const key = `msg:${now.toISOString()}:${crypto.randomUUID()}`
  const record = { receivedAt: now.toISOString(), ...result.data }
  await env.CONTACT.put(key, JSON.stringify(record), { expirationTtl: MESSAGE_TTL_SECONDS })

  return json({ ok: true })
}

async function readCapped(request, max) {
  if (!request.body) return new Uint8Array(0)
  const reader = request.body.getReader()
  const chunks = []
  let size = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > max) {
      await reader.cancel().catch(() => {})
      return null
    }
    chunks.push(value)
  }
  const out = new Uint8Array(size)
  let offset = 0
  for (const c of chunks) {
    out.set(c, offset)
    offset += c.byteLength
  }
  return out
}

const FIELDS = ['name', 'email', 'phone', 'message', 'topic', 'website']

async function parseBody(bytes, mediaType, contentTypeHeader) {
  const out = Object.create(null)
  try {
    if (mediaType === 'multipart/form-data') {
      const form = await new Request('https://form.invalid/', {
        method: 'POST',
        headers: { 'Content-Type': contentTypeHeader },
        body: bytes
      }).formData()
      for (const f of FIELDS) {
        const v = form.get(f)
        if (v === null) out[f] = ''
        else if (typeof v === 'string') out[f] = v
        else return null
      }
      return out
    }

    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes)

    if (mediaType === 'application/x-www-form-urlencoded') {
      const params = new URLSearchParams(text)
      for (const f of FIELDS) out[f] = params.get(f) ?? ''
      return out
    }

    const data = JSON.parse(text)
    if (data === null || typeof data !== 'object' || Array.isArray(data)) return null
    for (const f of FIELDS) {
      const v = Object.hasOwn(data, f) ? data[f] : undefined
      if (v === undefined || v === null) out[f] = ''
      else if (typeof v === 'string') out[f] = v
      else return null
    }
    return out
  } catch {
    return null
  }
}

function cleanLine(s) {
  return s.normalize('NFC').replace(CONTROL_SINGLE_LINE_RE, ' ').replace(/\s+/g, ' ').trim()
}

function cleanText(s) {
  return s
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, ' ')
    .replace(CONTROL_MULTI_LINE_RE, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function len(s) {
  return Array.from(s).length
}

function validate(raw) {
  const name = cleanLine(raw.name)
  const email = cleanLine(raw.email).toLowerCase()
  const phone = cleanLine(raw.phone)
  const message = cleanText(raw.message)
  const topic = cleanLine(raw.topic).toLowerCase()

  if (len(name) < 2 || len(name) > 80) return { error: MSG.name, field: 'name' }
  if (email.length === 0 || email.length > 120 || !EMAIL_RE.test(email)) return { error: MSG.email, field: 'email' }
  if (phone !== '' && (phone.length > 30 || !PHONE_RE.test(phone) || !/[0-9]/.test(phone))) {
    return { error: MSG.phone, field: 'phone' }
  }
  if (len(message) < 10 || len(message) > 2000) return { error: MSG.message, field: 'message' }
  if (topic !== '' && !TOPICS.has(topic)) return { error: MSG.topic, field: 'topic' }

  return { data: { name, email, phone: phone || null, topic: topic || null, message } }
}

async function sha256Hex(input) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(input))
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function randomHex(bytes) {
  return [...crypto.getRandomValues(new Uint8Array(bytes))].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function dailySalt(env, day) {
  const key = `rl-salt:${day}`
  const existing = await env.CONTACT.get(key)
  if (existing) return existing
  const salt = randomHex(32)
  await env.CONTACT.put(key, salt, { expirationTtl: 2 * 24 * 60 * 60 })
  return salt
}

function rateKeyIp(ip) {
  if (!ip.includes(':')) return ip
  const [l, r = ''] = ip.split('%')[0].split('::')
  const left = l ? l.split(':') : []
  const right = r ? r.split(':') : []
  const full = ip.includes('::') ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill('0'), ...right] : left
  return full.slice(0, 4).map(h => parseInt(h || '0', 16).toString(16)).join(':') + '::/64'
}

async function hmacHex(secret, input) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(input))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

async function checkRateLimit(request, env) {
  const ip = rateKeyIp(request.headers.get('CF-Connecting-IP') || 'unknown')
  const nowSec = Math.floor(Date.now() / 1000)
  const day = new Date().toISOString().slice(0, 10)
  const hash = typeof env.RL_SECRET === 'string' && env.RL_SECRET.length >= 32
    ? await hmacHex(env.RL_SECRET, `${day}:${ip}`)
    : await sha256Hex(`${await dailySalt(env, day)}:${ip}`)
  const key = `rl:${hash}`

  const current = await env.CONTACT.get(key, 'json')
  const valid = current && Number.isInteger(current.c) && Number.isInteger(current.exp) && current.exp > nowSec
  const count = valid ? current.c : 0
  const exp = valid ? current.exp : nowSec + RATE_LIMIT_WINDOW_SECONDS

  if (count >= RATE_LIMIT_MAX) return Math.max(1, exp - nowSec)

  try {
    await env.CONTACT.put(key, JSON.stringify({ c: count + 1, exp }), { expiration: Math.max(exp, nowSec + 60) })
  } catch {
    return 60
  }
  return 0
}

async function timingSafeEqualStr(a, b) {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b))
  ])
  return crypto.subtle.timingSafeEqual(ha, hb)
}

async function handleMessages(request, env) {
  const expected = typeof env.ADMIN_TOKEN === 'string' ? env.ADMIN_TOKEN : ''
  if (expected.length < MIN_ADMIN_TOKEN_LENGTH) return json({ ok: false, error: MSG.notFound }, 404)

  if (request.method !== 'GET') return fail(405, MSG.method, undefined, { Allow: 'GET' })

  const auth = request.headers.get('Authorization') || ''
  const match = /^Bearer ([A-Za-z0-9_\-.~+/=]{1,512})$/.exec(auth)
  const ok = match ? await timingSafeEqualStr(match[1], expected) : false
  if (!ok) return fail(401, MSG.unauthorized, undefined, { 'WWW-Authenticate': 'Bearer' })

  const names = []
  let cursor
  do {
    const page = await env.CONTACT.list({ prefix: 'msg:', cursor })
    for (const k of page.keys) names.push(k.name)
    cursor = page.list_complete ? undefined : page.cursor
  } while (cursor)

  names.sort().reverse()
  const selected = names.slice(0, MESSAGES_LIMIT)
  const values = await Promise.all(selected.map(n => env.CONTACT.get(n, 'json')))
  const messages = []
  selected.forEach((id, i) => {
    if (values[i]) messages.push({ id, ...values[i] })
  })

  return json({ ok: true, total: names.length, count: messages.length, messages })
}
