const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn()

ready(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  requestAnimationFrame(() => document.body.classList.add('is-loaded'))

  const reveals = [...document.querySelectorAll('[data-reveal]')]
  const show = (el) => el.classList.add('is-in')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        show(entry.target)
        io.unobserve(entry.target)
      })
    }, { threshold: 0 })
    reveals.forEach((el) => io.observe(el))
    const sweep = () => reveals.forEach((el) => {
      if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < innerHeight) show(el)
    })
    let ticking = false
    addEventListener('scroll', () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { sweep(); ticking = false })
    }, { passive: true })
    addEventListener('hashchange', sweep)
  } else {
    reveals.forEach(show)
  }

  const bar = document.querySelector('.bar')
  const dock = document.querySelector('.dock')
  const hero = document.querySelector('.hero')
  const contact = document.querySelector('#kontakt')
  let pastHero = false
  let atContact = false
  const syncBars = () => {
    if (bar) {
      const on = pastHero || bar.contains(document.activeElement)
      bar.classList.toggle('is-shown', on)
      bar.toggleAttribute('inert', !on)
    }
    if (dock) {
      const on = (pastHero && !atContact) || dock.contains(document.activeElement)
      dock.classList.toggle('is-shown', on)
      dock.toggleAttribute('inert', !on)
    }
  }
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting
      syncBars()
    }, { rootMargin: '-64px 0px 0px 0px' }).observe(hero)
    if (contact) {
      new IntersectionObserver(([entry]) => {
        atContact = entry.isIntersecting
        syncBars()
      }, { threshold: 0.15 }).observe(contact)
    }
  }

  let lastY = scrollY
  addEventListener('scroll', () => {
    const y = scrollY
    if (Math.abs(y - lastY) < 8) return
    const down = y > lastY && y + innerHeight < document.documentElement.scrollHeight - 40
    if (dock) dock.classList.toggle('is-tucked', down)
    if (bar) bar.classList.toggle('is-tucked', down && y > 400)
    lastY = y
  }, { passive: true })

  const navLinks = [...document.querySelectorAll('.bar-links a[href^="#"]:not(.button)')]
  const targets = [...new Set(navLinks.map((a) => a.getAttribute('href')))].map((h) => document.querySelector(h)).filter(Boolean)
  if (targets.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + entry.target.id)))
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    targets.forEach((t) => spy.observe(t))
  }

  const frames = [...document.querySelectorAll('.hero-frames img')]
  const caption = document.querySelector('.hero-caption-text')
  if (frames.length > 1 && !reduce) {
    let current = 0
    const next = () => {
      if (document.hidden) return
      frames[current].classList.remove('is-active')
      current = (current + 1) % frames.length
      const frame = frames[current]
      if (frame.loading === 'lazy') frame.loading = 'eager'
      frame.classList.add('is-active')
      if (caption) {
        caption.classList.add('is-changing')
        setTimeout(() => {
          caption.textContent = frame.dataset.caption || ''
          caption.classList.remove('is-changing')
        }, 400)
      }
    }
    setTimeout(() => frames.slice(1).forEach((f) => { f.loading = 'eager' }), 2500)
    setInterval(next, 6500)
  }

  const form = document.querySelector('#formularz')
  if (!form) return
  const status = form.querySelector('.form-status')
  const submit = form.querySelector('button[type="submit"]')
  const fields = ['name', 'email', 'message']
  const messages = {
    name: 'Podaj imię (co najmniej 2 znaki).',
    email: 'Podaj poprawny adres e-mail.',
    message: 'Napisz kilka zdań o mieszkaniu (co najmniej 10 znaków).'
  }
  const setError = (id, text) => {
    const input = form.querySelector('#' + id)
    const err = form.querySelector('#' + id + '-error')
    if (!input || !err) return
    err.textContent = text || ''
    if (text) input.setAttribute('aria-invalid', 'true')
    else input.removeAttribute('aria-invalid')
  }
  fields.forEach((id) => {
    const input = form.querySelector('#' + id)
    if (input) input.addEventListener('input', () => setError(id, ''))
  })
  const setStatus = (text, ok) => {
    status.textContent = text
    status.className = 'form-status ' + (ok ? 'is-ok' : 'is-error')
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    setStatus('', true)
    let firstBad = null
    fields.forEach((id) => {
      const input = form.querySelector('#' + id)
      if (!input) return
      const bad = !input.checkValidity()
      setError(id, bad ? messages[id] : '')
      if (bad && !firstBad) firstBad = input
    })
    if (firstBad) {
      firstBad.focus()
      return
    }
    if (submit.getAttribute('aria-disabled') === 'true') return
    submit.setAttribute('aria-disabled', 'true')
    const label = submit.firstChild.textContent
    submit.firstChild.textContent = 'Wysyłam… '
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        form.reset()
        if (document.activeElement) document.activeElement.blur()
        form.classList.add('is-sent')
        setStatus('Dziękuję, wiadomość dotarła. Odezwę się najszybciej, jak to możliwe.', true)
        status.setAttribute('tabindex', '-1')
        status.focus({ preventScroll: true })
        status.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
      } else {
        if (data.field) {
          setError(data.field, data.error)
          const input = form.querySelector('#' + data.field)
          if (input) input.focus()
        }
        setStatus(data.error || 'Nie udało się wysłać wiadomości. Spróbuj ponownie albo zadzwoń: 574 180 397.', false)
      }
    } catch {
      setStatus('Brak połączenia. Sprawdź internet i spróbuj ponownie albo zadzwoń: 574 180 397.', false)
    } finally {
      submit.removeAttribute('aria-disabled')
      submit.firstChild.textContent = label
    }
  })
})
