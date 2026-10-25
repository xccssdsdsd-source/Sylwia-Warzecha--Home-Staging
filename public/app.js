const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn()

ready(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  requestAnimationFrame(() => document.body.classList.add('is-loaded'))

  document.querySelectorAll('[data-reveal="words"]').forEach((el) => {
    const words = el.textContent.split(' ').filter(Boolean)
    el.setAttribute('aria-label', words.join(' '))
    el.textContent = ''
    words.forEach((word, i) => {
      const span = document.createElement('span')
      span.className = 'w'
      span.setAttribute('aria-hidden', 'true')
      span.style.setProperty('--i', String(i))
      span.textContent = word
      el.append(span, ' ')
    })
  })

  const reveals = [...document.querySelectorAll('[data-reveal]')]
  const show = (el) => el.classList.add('is-in')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        show(entry.target)
        io.unobserve(entry.target)
      })
    }, { threshold: 0, rootMargin: '0px 0px -9% 0px' })
    reveals.forEach((el) => io.observe(el))
    const sweep = () => {
      const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      reveals.forEach((el) => {
        if (!el.classList.contains('is-in') && (atEnd || el.getBoundingClientRect().top < innerHeight * 0.91)) show(el)
      })
    }
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

  const floats = [...document.querySelectorAll('.project-main img, .project-detail img')]
  if (!reduce && floats.length && 'IntersectionObserver' in window) {
    const live = new Set()
    const watch = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) live.add(entry.target)
        else live.delete(entry.target)
      })
      glide()
    }, { rootMargin: '10% 0px 10% 0px' })
    floats.forEach((img) => watch.observe(img))
    let gliding = false
    function glide() {
      if (gliding) return
      gliding = true
      requestAnimationFrame(() => {
        gliding = false
        live.forEach((img) => {
          const box = img.getBoundingClientRect()
          const t = (box.top + box.height / 2 - innerHeight / 2) / (innerHeight / 2 + box.height / 2)
          img.style.setProperty('--py', (Math.max(-1, Math.min(1, t)) * -3).toFixed(2) + '%')
        })
      })
    }
    addEventListener('scroll', glide, { passive: true })
    addEventListener('resize', glide)
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

  const frames = [...document.querySelectorAll('.hero-frames .frame')]
  const caption = document.querySelector('.hero-caption-text')
  const progress = document.querySelector('.hero-progress')
  if (frames.length > 1 && !reduce) {
    let current = 0
    const restart = () => {
      if (!progress) return
      progress.classList.remove('is-running')
      void progress.offsetWidth
      progress.classList.add('is-running')
    }
    const next = () => {
      if (document.hidden) return
      const from = frames[current]
      current = (current + 1) % frames.length
      const to = frames[current]
      const img = to.querySelector('img')
      if (img.loading === 'lazy') img.loading = 'eager'
      to.classList.add('is-entering')
      void to.offsetWidth
      to.classList.remove('is-entering')
      to.classList.add('is-active')
      from.classList.remove('is-active')
      from.classList.add('is-leaving')
      setTimeout(() => from.classList.remove('is-leaving'), 1800)
      if (caption) {
        caption.classList.add('is-changing')
        setTimeout(() => {
          caption.textContent = img.dataset.caption || ''
          caption.classList.remove('is-changing')
        }, 500)
      }
      restart()
    }
    setTimeout(() => frames.slice(1).forEach((f) => { f.querySelector('img').loading = 'eager' }), 2500)
    restart()
    setInterval(next, 6500)
  }

  const viewer = document.querySelector('.viewer')
  const shots = [...document.querySelectorAll('.shot')]
  if (viewer && shots.length && typeof viewer.showModal === 'function') {
    const vImg = viewer.querySelector('.viewer-img')
    const vText = viewer.querySelector('.viewer-text')
    const vCount = viewer.querySelector('.viewer-count')
    let set = []
    let index = 0
    let startX = null
    let opener = null
    const render = () => {
      const shot = set[index]
      const img = shot.querySelector('img')
      const title = shot.closest('.project')?.querySelector('h3')
      vImg.src = shot.href
      vImg.alt = img ? img.alt : ''
      vText.textContent = title ? title.textContent : ''
      vCount.textContent = set.length > 1 ? (index + 1) + ' / ' + set.length : ''
    }
    const go = (step) => {
      if (set.length < 2) return
      index = (index + step + set.length) % set.length
      if (reduce) return render()
      vImg.classList.add('is-changing')
      setTimeout(render, 200)
    }
    vImg.addEventListener('load', () => vImg.classList.remove('is-changing'))
    shots.forEach((shot) => shot.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      const project = shot.closest('.project')
      set = project ? [...project.querySelectorAll('.shot')] : [shot]
      index = set.indexOf(shot)
      opener = shot
      viewer.classList.toggle('is-single', set.length < 2)
      vImg.classList.remove('is-changing')
      render()
      viewer.showModal()
    }))
    viewer.querySelector('.viewer-prev').addEventListener('click', () => go(-1))
    viewer.querySelector('.viewer-next').addEventListener('click', () => go(1))
    viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close())
    viewer.addEventListener('close', () => {
      if (opener) opener.focus({ preventScroll: true })
    })
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer || e.target.classList.contains('viewer-figure')) viewer.close()
    })
    viewer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    })
    viewer.addEventListener('pointerdown', (e) => { startX = e.pointerType === 'mouse' ? null : e.clientX })
    viewer.addEventListener('pointerup', (e) => {
      if (startX === null) return
      const dx = e.clientX - startX
      startX = null
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1)
    })
  }

  const consent = document.querySelector('.consent')
  if (consent) {
    const KEY = 'styli-consent'
    const read = () => {
      try { return localStorage.getItem(KEY) } catch { return null }
    }
    const write = (value) => {
      try { localStorage.setItem(KEY, value) } catch {}
    }
    const apply = (value) => {
      document.documentElement.dataset.consent = value
      document.dispatchEvent(new CustomEvent('consentchange', { detail: value }))
    }
    const open = () => {
      consent.hidden = false
      requestAnimationFrame(() => requestAnimationFrame(() => consent.classList.add('is-open')))
    }
    const close = () => {
      consent.classList.remove('is-open')
      setTimeout(() => { consent.hidden = true }, reduce ? 0 : 700)
    }
    const saved = read()
    if (saved === 'granted' || saved === 'denied') apply(saved)
    else setTimeout(open, reduce ? 0 : 1600)
    consent.querySelectorAll('[data-consent]').forEach((button) => button.addEventListener('click', () => {
      write(button.dataset.consent)
      apply(button.dataset.consent)
      close()
    }))
    document.querySelectorAll('[data-consent-open]').forEach((button) => button.addEventListener('click', () => {
      open()
      consent.querySelector('[data-consent]').focus({ preventScroll: true })
    }))
  }

  const form = document.querySelector('#formularz')
  if (!form) return
  const status = form.querySelector('.form-status')
  const submit = form.querySelector('button[type="submit"]')
  const fields = ['name', 'phone', 'email', 'message']
  const messages = {
    name: 'Podaj imię (co najmniej 2 znaki).',
    phone: 'Podaj poprawny numer telefonu albo zostaw to pole puste.',
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
