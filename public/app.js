const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn()

ready(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  requestAnimationFrame(() => {
    document.body.classList.add('is-loaded')
    document.querySelectorAll('.hero-sheet [data-reveal]').forEach((el) => el.classList.add('is-in'))
  })

  const reveals = document.querySelectorAll('[data-reveal]')
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      })
    }, { rootMargin: '0px', threshold: 0 })
    reveals.forEach((el) => io.observe(el))
    const sweep = () => reveals.forEach((el) => {
      if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < innerHeight) el.classList.add('is-in')
    })
    let ticking = false
    addEventListener('scroll', () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { sweep(); ticking = false })
    }, { passive: true })
    addEventListener('hashchange', sweep)
    window.addEventListener('load', () => setTimeout(() => {
      reveals.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in')
      })
    }, 2500))
  } else {
    reveals.forEach((el) => el.classList.add('is-in'))
  }

  const bar = document.querySelector('.bar')
  const dock = document.querySelector('.dock')
  const hero = document.querySelector('.hero-sheet')
  const contact = document.querySelector('#kontakt')
  let pastHero = false
  let atContact = false
  const syncBars = () => {
    if (bar) {
      const shown = pastHero || bar.contains(document.activeElement)
      bar.classList.toggle('is-shown', shown)
      bar.toggleAttribute('inert', !shown)
      document.documentElement.classList.toggle('bar-on', shown)
    }
    if (dock) {
      const shown = (pastHero && !atContact) || dock.contains(document.activeElement)
      dock.classList.toggle('is-shown', shown)
      dock.toggleAttribute('inert', !shown)
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
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting
      syncBars()
    }, { threshold: 0 }).observe(hero)
    if (contact) {
      new IntersectionObserver(([entry]) => {
        atContact = entry.isIntersecting
        syncBars()
      }, { threshold: 0.15 }).observe(contact)
    }
  }

  const navLinks = [...document.querySelectorAll('.bar-links a[href^="#"]:not(.button)')]
  const navTargets = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean)
  if (navTargets.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + entry.target.id)))
      })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ;[...navTargets, document.querySelector('#kontakt'), document.querySelector('.footer')].forEach((t) => t && spy.observe(t))
  }

  const frames = [...document.querySelectorAll('.stage-frames img')]
  const caption = document.querySelector('.stage-caption')
  let current = 0
  const show = (i) => {
    if (i === current || !frames[i]) return
    frames[current].classList.remove('is-active')
    frames[i].classList.add('is-active')
    if (!reduce) {
      frames[i].classList.remove('is-drift')
      void frames[i].offsetWidth
      frames[i].classList.add('is-drift')
    }
    current = i
    if (caption) {
      caption.classList.add('is-changing')
      setTimeout(() => {
        caption.textContent = frames[i].dataset.caption || ''
        caption.classList.remove('is-changing')
      }, 400)
    }
  }
  if (frames.length && !reduce) frames[0].classList.add('is-drift')

  const cues = document.querySelectorAll('[data-photo]')
  if (frames.length && cues.length && 'IntersectionObserver' in window && matchMedia('(min-width: 861px)').matches) {
    const cueIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(Number(entry.target.dataset.photo))
      })
    }, { rootMargin: '-40% 0px -40% 0px' })
    cues.forEach((el) => cueIo.observe(el))
  }

  const tabs = [...document.querySelectorAll('.room-tab')]
  const rooms = [...document.querySelectorAll('.check-room')]
  const selectRoom = (i, focus) => {
    tabs.forEach((t, j) => {
      const on = i === j
      t.setAttribute('aria-selected', String(on))
      t.tabIndex = on ? 0 : -1
      rooms[j].hidden = !on
    })
    if (focus) tabs[i].focus()
  }
  if (tabs.length) {
    selectRoom(0)
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectRoom(i))
      tab.addEventListener('keydown', (e) => {
        const map = { ArrowRight: 1, ArrowLeft: -1 }
        if (e.key in map) {
          e.preventDefault()
          selectRoom((i + map[e.key] + tabs.length) % tabs.length, true)
        } else if (e.key === 'Home') {
          e.preventDefault()
          selectRoom(0, true)
        } else if (e.key === 'End') {
          e.preventDefault()
          selectRoom(tabs.length - 1, true)
        }
      })
    })
  }

  const boxes = [...document.querySelectorAll('.check-item input')]
  const count = document.querySelector('.check-count')
  const word = document.querySelector('.check-word')
  const send = document.querySelector('.check-send')
  const plural = (n) => n === 1 ? 'rzecz' : 'rzeczy'
  const picked = document.querySelector('.check-picked')
  const empty = picked ? picked.querySelector('.check-empty') : null
  const refresh = () => {
    const on = boxes.filter((b) => b.checked)
    const n = on.length
    if (picked) {
      picked.querySelectorAll('.slip-row').forEach((el) => el.remove())
      on.forEach((b) => {
        const row = document.createElement('p')
        row.className = 'slip-row'
        const label = document.createElement('span')
        label.textContent = b.dataset.label
        const room = document.createElement('span')
        room.textContent = b.closest('.check-room').querySelector('legend').textContent.trim()
        row.append(label, room)
        picked.append(row)
      })
      if (empty) empty.hidden = n > 0
    }
    if (count) {
      count.textContent = String(n)
      if (!reduce) {
        count.classList.remove('is-bump')
        void count.offsetWidth
        count.classList.add('is-bump')
      }
    }
    if (word) word.textContent = plural(n)
    if (send) send.hidden = n === 0
  }
  boxes.forEach((b) => b.addEventListener('change', refresh))
  refresh()

  const form = document.querySelector('#contact-form')
  const message = document.querySelector('#message')
  const topic = document.querySelector('#topic')
  if (send && message) {
    send.addEventListener('click', () => {
      const groups = rooms.map((room) => {
        const picked = [...room.querySelectorAll('input:checked')].map((b) => '- ' + b.dataset.label)
        return picked.length ? room.querySelector('legend').textContent.trim() + ':\n' + picked.join('\n') : ''
      }).filter(Boolean)
      if (!groups.length) return
      const list = 'Do poprawy przed zdjęciami:\n\n' + groups.join('\n\n')
      const own = message.value.split('Do poprawy przed zdjęciami:')[0].trim()
      message.value = own
        ? own + '\n\n' + list
        : 'Dzień dobry, wysyłam wynik listy ze strony. ' + list + '\n\nCzy możemy porozmawiać o przygotowaniu mieszkania?'
      message.dispatchEvent(new Event('input'))
      const st = form && form.querySelector('.form-status')
      if (st) {
        st.textContent = 'Lista jest już w wiadomości. Uzupełnij imię i e-mail, a potem wyślij.'
        st.className = 'form-status is-ok'
      }
      document.querySelector('#contact-form').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    })
  }

  if (!form) return
  const status = form.querySelector('.form-status')
  const submit = form.querySelector('button[type="submit"]')
  const fields = ['name', 'email', 'phone', 'topic', 'message']
  const messages = {
    name: 'Podaj imię (co najmniej 2 znaki).',
    email: 'Podaj poprawny adres e-mail.',
    phone: 'Numer telefonu może zawierać cyfry, spacje, +, - i nawiasy.',
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
        boxes.forEach((b) => { b.checked = false })
        refresh()
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
