function checkIsMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}
function checkIsTablet() {
  return window.matchMedia('(max-width: 991px)').matches;
}
function initScript() {
  (initLenis(),
    initLoader(),
    initCursorCoordinates(),
    initGridHover(),
    initBasicFunctions(),
    initAboutSection(),
    initAnimationSection(),
    initGridSection());
}
function initLenis() {
  Webflow.env('editor') ||
    ((lenis = new Lenis({ duration: 0.7, infinite: !0 })),
    lenis.on('scroll', ScrollTrigger.update),
    gsap.ticker.add((e) => {
      (lenis?.raf(1e3 * e), modalLenis?.raf(1e3 * e));
    }),
    gsap.ticker.lagSmoothing(0));
}
function initBasicFunctions() {
  function e() {
    document.querySelectorAll('[data-video-on-hover]').forEach((e) => {
      const t = e.querySelector('video'),
        a = e.getAttribute('data-video-src') || '';
      t &&
        a &&
        (e.addEventListener('mouseenter', () => {
          (t.getAttribute('src') || t.setAttribute('src', a),
            (e.dataset.videoOnHover = 'active'),
            t.play().catch(() => {}));
        }),
        e.addEventListener('mouseleave', () => {
          ((e.dataset.videoOnHover = 'not-active'),
            setTimeout(() => {
              (t.pause(), (t.currentTime = 0));
            }, 200));
        }));
    });
  }
  function t() {
    document.querySelectorAll('[data-stack-list]').forEach((e) => {
      const t = e.querySelectorAll('[data-stack-item]'),
        a = 1.75,
        o = 3.3;
      t.forEach((e, t) => {
        ((e.style.position = 'sticky'), (e.style.top = `${a + t * o}rem`));
      });
    });
  }
  (t(), e());
}
function initMenu() {
  document.querySelector('.nav_menu');
}
function animateMenuOpen() {
  const e = document.querySelectorAll('[navbtn]'),
    t = document.querySelector('.nav_menu'),
    a = document.querySelectorAll('[data-nav-text]');
  let o = gsap.matchMedia(),
    r = gsap.timeline({ paused: !0 }),
    n = !1;
  (r
    .set(t, { display: 'flex' })
    .from(
      t,
      {
        opacity: 0,
        delay: 0.3,
        duration: 0.8,
        height: 0,
        ease: 'ease-secondary',
      },
      0
    )
    .to(
      a,
      {
        stagger: 0.1,
        duration: 0.8,
        scrambleText: { tweenLength: !0, text: '{original}', chars: '-_x0$9' },
      },
      0
    )
    .to(
      '.page_main',
      { delay: 0.2, opacity: 0.6, duration: 0.6, ease: 'ease-secondary' },
      0
    ),
    e.forEach((e) => {
      e.addEventListener('click', () => {
        (n ? r.reverse(0) : r.play(), (n = !n));
      });
    }),
    a.forEach((t) => {
      const r = gsap.timeline({ paused: !0 });
      (t.addEventListener('mouseenter', () => {}),
        o.add('(max-width: 768px)', () => {
          let t = gsap.timeline({ paused: !0 }),
            o = !1;
          const n = document.querySelector('.nav_menu');
          (r
            .set(n, { display: 'flex', height: '100%' })
            .from(
              n,
              {
                opacity: 0,
                delay: 0.3,
                duration: 0.8,
                ease: 'ease-secondary',
                onComplete: () => {},
              },
              0
            )
            .to(
              a,
              {
                stagger: 0.1,
                duration: 0.8,
                scrambleText: {
                  tweenLength: !0,
                  text: '{original}',
                  chars: '-_x0$9',
                },
              },
              0
            )
            .to(
              '.page_main',
              {
                delay: 0.2,
                opacity: 0.6,
                duration: 0.6,
                ease: 'ease-secondary',
              },
              0
            ),
            e.forEach((e) => {
              e.addEventListener('click', () => {
                (o ? t.reverse(0) : t.play(), (o = !o));
              });
            }));
        }));
    }));
}
function animateMenuClose() {}
function initLoader() {
  function e() {
    const e = gsap.timeline(),
      t = document.querySelectorAll('.hero-logo-path'),
      a = document.querySelectorAll('[bracket]');
    (e.set(t, { opacity: 0 }).set(a, { opacity: 0 }, 0),
      t.forEach((t) => {
        let a = gsap.timeline({ repeat: 0 });
        (a
          .to(t, { delay: 0.25, opacity: 1, duration: 0.05 })
          .to(t, { delay: 0.02, opacity: 0, duration: 0.04 })
          .to(t, { delay: 0.1, opacity: 1, duration: 0.06 })
          .to(t, { delay: 0.2, opacity: 1, duration: 0.07 }),
          e.add(a, 0.5 * Math.random()));
      }),
      a.forEach((t) => {
        let a = gsap.timeline({ repeat: 0 });
        (a
          .to(t, { delay: 0.25, opacity: 1, duration: 0.03 })
          .to(t, { delay: 0.02, opacity: 0, duration: 0.04 })
          .to(t, { delay: 0.1, opacity: 1, duration: 0.02 })
          .to(t, { delay: 0.01, opacity: 1, duration: 0.04 }),
          e.add(a, 0.5 * Math.random()));
      }));
  }
  function t() {
    (gsap.to(
      '.loader-mid-wrap, .loader-dials, .loader_percentt, .loader-details-wrap, .loader_text',
      { autoAlpha: 1, duration: 0.5 }
    ),
      gsap.set(n, { opacity: 0 }));
    const e = gsap.timeline();
    n.forEach((t) => {
      let a = gsap.timeline();
      (a
        .to(t, { delay: 0.4, opacity: 1, duration: 0.04 })
        .to(t, { delay: 0.02, opacity: 0, duration: 0.03 })
        .to(t, { opacity: 1, duration: 0.04 })
        .to(t, { opacity: 1, duration: 0.05, ease: 'power4.out' }),
        e.add(a, 0.3 * Math.random()));
    });
  }
  function a() {
    let t = gsap.timeline({ delay: 3.5 });
    const a = document.querySelectorAll('[barcodeLine]'),
      o = document.querySelectorAll('[heroMono]'),
      r = Array.from(o).map((e) => e.textContent);
    t.call(e, null, 0)
      .set(a, { yPercent: -101 }, 0)
      .to(
        o,
        {
          duration: 1e-5,
          scrambleText: {
            chars: ' ',
            text: ' ',
            speed: 0.6,
            tweenLength: !1,
            rightToLeft: !1,
          },
        },
        0
      )
      .to(
        o,
        {
          duration: 0.5,
          stagger: 0.1,
          scrambleText: (e) => ({
            chars: ' ',
            text: r[e],
            speed: 0.5,
            tweenLength: !1,
            rightToLeft: !1,
          }),
        },
        0
      )
      .to(
        a,
        {
          delay: 0.3,
          yPercent: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'ease-preloader',
        },
        0
      );
  }
  function o() {
    function e() {
      let e = Math.round(i.value);
      $('[loader-percent]').text(e);
    }
    let a = gsap.matchMedia(),
      o = gsap.timeline({}),
      i = { value: 0 };
    SplitText.create('[loader-percent]', { type: 'chars' }).chars;
    const s = document.querySelectorAll('[loader-text]'),
      l = Array.from(s).map((e) => e.textContent),
      c = document.querySelector('[loader-div]');
    (gsap.from(c, { autoAlpha: 0, duration: 0.3, ease: 'steps(2)' }),
      a.add('(max-width: 768px)', () => {
        o.call(t)
          .to(i, {
            delay: 1.2,
            onUpdate: e,
            ease: 'ease-preloader',
            value: 100,
            duration: 2,
          })
          .to(
            c,
            { delay: 1.2, duration: 1.8, ease: 'ease-preloader', y: '-88dvh' },
            0
          )
          .to(
            s,
            {
              duration: 1e-5,
              scrambleText: {
                chars: ' ',
                text: ' ',
                speed: 0.6,
                tweenLength: !1,
                rightToLeft: !1,
              },
            },
            0
          )
          .to(
            s,
            {
              delay: 0.6,
              duration: 0.2,
              stagger: 0.14,
              scrambleText: (e) => ({
                chars: ' ',
                text: l[e],
                speed: 0.5,
                tweenLength: !1,
                rightToLeft: !1,
              }),
            },
            0
          )
          .to('.loader-dial', {
            duration: 0.4,
            xPercent: 100,
            stagger: 0.07,
            ease: 'ease-preloader',
          })
          .to(
            s,
            {
              delay: 3,
              duration: 0.1,
              stagger: 0.03,
              scrambleText: () => ({
                chars: ' ',
                text: ' ',
                speed: 0.5,
                tweenLength: !1,
                rightToLeft: !0,
              }),
            },
            0
          )
          .to(
            n,
            {
              stagger: { amount: 0.1, from: 'random' },
              duration: 0.4,
              ease: 'steps(4)',
              opacity: 0,
            },
            '<.2'
          )
          .to(r, { autoAlpha: 0, duration: 0.3, ease: 'steps(7)' }, '<.4')
          .set('.loader-wrap', { display: 'none' }, '<1');
      }),
      o
        .call(t)
        .to(i, {
          delay: 1.2,
          onUpdate: e,
          ease: 'ease-preloader',
          value: 100,
          duration: 2,
        })
        .to(
          c,
          { delay: 1.2, duration: 1.8, ease: 'ease-preloader', height: '100%' },
          0
        )
        .to(
          s,
          {
            duration: 1e-5,
            scrambleText: {
              chars: ' ',
              text: ' ',
              speed: 0.6,
              tweenLength: !1,
              rightToLeft: !1,
            },
          },
          0
        )
        .to(
          s,
          {
            delay: 0.6,
            duration: 0.2,
            stagger: 0.14,
            scrambleText: (e) => ({
              chars: ' ',
              text: l[e],
              speed: 0.5,
              tweenLength: !1,
              rightToLeft: !1,
            }),
          },
          0
        )
        .to('.loader-dial', {
          duration: 0.4,
          xPercent: 100,
          stagger: 0.07,
          ease: 'ease-preloader',
        })
        .to(
          s,
          {
            delay: 3,
            duration: 0.1,
            stagger: 0.03,
            scrambleText: () => ({
              chars: ' ',
              text: ' ',
              speed: 0.5,
              tweenLength: !1,
              rightToLeft: !0,
            }),
          },
          0
        )
        .to(
          n,
          {
            stagger: { amount: 0.1, from: 'random' },
            duration: 0.4,
            ease: 'steps(4)',
            opacity: 0,
          },
          '<.2'
        )
        .to(r, { autoAlpha: 0, duration: 0.3, ease: 'steps(7)' }, '<.4'));
  }
  const r = document.querySelector('.loader_wrap');
  const n = SplitText.create('[loader-blink]', { type: 'chars' }).chars;
  (o(), a());
}
function initGlobalParallax() {
  gsap
    .matchMedia()
    .add(
      {
        isMobile: '(max-width:479px)',
        isMobileLandscape: '(max-width:767px)',
        isTablet: '(max-width:991px)',
        isDesktop: '(min-width:992px)',
      },
      (e) => {
        const { isMobile: t, isMobileLandscape: a, isTablet: o } = e.conditions,
          r = gsap.context(() => {
            document
              .querySelectorAll('[data-parallax="trigger"]')
              .forEach((e) => {
                const r = e.getAttribute('data-parallax-disable');
                if (
                  ('mobile' === r && t) ||
                  ('mobileLandscape' === r && a) ||
                  ('tablet' === r && o)
                )
                  return;
                const n = e.querySelector('[data-parallax="target"]') || e,
                  i =
                    'horizontal' ===
                    (e.getAttribute('data-parallax-direction') || 'vertical')
                      ? 'xPercent'
                      : 'yPercent',
                  s = e.getAttribute('data-parallax-scrub'),
                  l = !s || parseFloat(s),
                  c = e.getAttribute('data-parallax-start'),
                  d = null !== c ? parseFloat(c) : 20,
                  u = e.getAttribute('data-parallax-end'),
                  p = null !== u ? parseFloat(u) : -20,
                  g = `clamp(${e.getAttribute('data-parallax-scroll-start') || 'top bottom'})`,
                  m = `clamp(${e.getAttribute('data-parallax-scroll-end') || 'bottom top'})`;
                gsap.fromTo(
                  n,
                  { [i]: d },
                  {
                    [i]: p,
                    ease: 'none',
                    scrollTrigger: { trigger: e, start: g, end: m, scrub: l },
                  }
                );
              });
          });
        return () => r.revert();
      }
    );
}
function initAboutSection() {
  function e() {
    let e = gsap.timeline();
    const t = document.querySelector('.about_p1_contain'),
      a = document.querySelector('.about_card_sticky'),
      o = document.querySelectorAll('[data-about-heading]'),
      r = document.querySelector('[data-about-tech]');
    const n = SplitText.create(o, { type: 'chars' }).chars;
    (ScrollTrigger.create({
      trigger: a,
      pin: !0,
      start: 'top top',
      end: 'bottom bottom',
    }),
      gsap.set(n, { yPercent: -100 }),
      gsap.to(n, {
        yPercent: 0,
        duration: 0.7,
        stagger: { amount: 0.2 },
        ease: 'ease-primary',
        scrollTrigger: {
          trigger: '.about_h1_t',
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      }),
      ScrollTrigger.create({
        trigger: r,
        start: 'top 40%',
        end: 'bottom 50%',
        id: 'scramble-debug',
        onEnter: () => {
          gsap.to(r, {
            duration: 1.6,
            scrambleText: {
              chars: '+_1x><*^0!~`',
              text: '</TECHNICALITY>',
              tweenLength: !0,
              revealDelay: 0.4,
              speed: 0.1,
            },
          });
        },
        onLeaveBack: () => {
          gsap.to(r, {
            duration: 0.8,
            scrambleText: { chars: '+_1x><*^0!~`', text: '</ >', speed: 0.2 },
          });
        },
      }),
      e
        .to(t, {
          width: '100%',
          height: '100%',
          scrollTrigger: {
            trigger: a,
            scrub: !0,
            start: 'top top',
            end: 'bottom bottom',
          },
        })
        .to('.card-plus', {
          rotation: 180,
          transformOrigin: '50% 50%',
          scrollTrigger: {
            trigger: a,
            scrub: !0,
            start: 'top top',
            end: 'bottom bottom',
          },
        }));
  }
  function t() {
    const e = document.querySelectorAll('.about_p2_text'),
      t = new SplitText(e, { type: 'words' }).words,
      a = document.querySelector('.about_p2_sticky');
    (t.forEach((e) => {
      const t = document.createElement('div');
      ((t.className = 'word-wrapper'),
        e.parentNode.insertBefore(t, e),
        t.appendChild(e));
      const a = document.createElement('div');
      ((a.className = 'overlay-block'), t.appendChild(a));
    }),
      ScrollTrigger.create({
        trigger: a,
        pin: !0,
        start: 'top top',
        end: 'bottom bottom',
      }),
      gsap.to('.overlay-block', {
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: a,
          start: 'top 20%',
          end: 'bottom 70%',
          scrub: 1,
        },
      }));
    document.querySelectorAll('[path-group]').forEach((e) => {
      const t = e.querySelectorAll('path');
      gsap.from(t, {
        opacity: 0,
        ease: 'steps(1)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: a,
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    });
  }
  function a() {
    const e = document.querySelector('.pixel_transition'),
      t = Array.from(document.querySelectorAll('.pixel_item')),
      a = t
        .map((e, a) => ({ pixel: e, sort: Math.random() + a / t.length }))
        .sort((e, t) => t.sort - e.sort)
        .map((e) => e.pixel);
    gsap.timeline();
    (gsap.set(t, { opacity: 0 }),
      gsap.to(a, {
        opacity: 1,
        stagger: { amount: 1.3, grid: [10, 9], axis: 'y' },
        ease: 'ease-transition',
        scrollTrigger: {
          trigger: e,
          scrub: !0,
          start: 'top bottom',
          end: 'bottom top',
        },
      }));
  }
  (e(), t(), a());
}
function initSectionEnd() {
  const e = document.querySelectorAll('[data-section-end]');
  (document.querySelectorAll('[data-split="sectionEnd"]').forEach((t) => {
    SplitText.create(t, {
      type: 'chars',
      autoSplit: !0,
      mask: 'chars',
      charsClass: 'chars-split',
      onSplit: (t) =>
        gsap.to(t.chars, {
          opacity: 0,
          stagger: { amount: 0.8, from: 'random' },
          ease: 'steps (5)',
          scrollTrigger: {
            trigger: e,
            start: 'bottom bottom',
            end: '+=150%',
            scrub: !0,
          },
        }),
    });
  }),
    e.forEach((e) => {
      ScrollTrigger.create({
        trigger: e,
        pin: !0,
        start: 'bottom bottom',
        end: '+=100%',
        scrub: !0,
        onLeave: () => {
          gsap.set(e, { scale: 1, opacity: 1 });
        },
        onEnterBack: () => {
          gsap.set(e, { scale: 1, opacity: 1 });
        },
        animation: gsap.to(e, { scale: 0.85, opacity: 0.1, ease: 'none' }),
      });
    }));
}
function initHeadings() {
  document.querySelectorAll('[data-split="heading"]').forEach((e) => {
    SplitText.create(e, {
      type: 'words',
      autoSplit: !0,
      mask: 'words',
      wordsClass: 'words-split',
      onSplit: (t) =>
        gsap.from(t.words, {
          duration: 0.9,
          yPercent: 101,
          stagger: 0.02,
          ease: 'ease-transition',
          scrollTrigger: { trigger: e, start: 'top 80%', once: !0 },
        }),
    });
  });
}
function initGlobalSplit() {
  document.querySelectorAll('[data-split="global"]').forEach((e) => {
    SplitText.create(e, {
      type: 'lines',
      autoSplit: !0,
      linesClass: 'lines-split',
      mask: 'lines',
      onSplit: (t) =>
        gsap.from(t.lines, {
          duration: 0.9,
          yPercent: 100,
          stagger: 0.15,
          ease: 'ease-transition',
          scrollTrigger: { trigger: e, start: 'top 80%', once: !0 },
        }),
    });
  });
}
function initGridHover() {
  function e(e, t) {
    let a;
    return function (...o) {
      (clearTimeout(a), (a = setTimeout(() => e.apply(this, o), t)));
    };
  }
  function t(t) {
    function a() {
      ((m.width = t.offsetWidth),
        (m.height = t.offsetHeight),
        (y = window.innerWidth < 768 ? c : l),
        (b = m.width / y),
        (f = Math.ceil(m.height / b)),
        (S = []));
      for (let e = 0; e < f; e++)
        for (let t = 0; t < y; t++)
          S.push({ x: t * b, y: e * b, color: 'white', alpha: 0 });
    }
    function o() {
      (h.clearRect(0, 0, m.width, m.height),
        S.forEach((e) => {
          ((h.fillStyle = e.color),
            (h.globalAlpha = e.alpha),
            h.fillRect(e.x, e.y, b, b),
            (h.globalAlpha = 1),
            (h.strokeStyle = u),
            (h.lineWidth = d),
            h.strokeRect(e.x, e.y, b, b));
        }),
        requestAnimationFrame(o));
    }
    function r(e) {
      gsap.to(e, {
        alpha: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'ease-primarys',
      });
    }
    function n() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    const i = {
        gridBackground: '#transparent',
        gridSizeDesktop: 64,
        gridSizeMobile: 8,
        gridBorderSize: 0.15,
        gridBorderColor: '#0C0C0C',
        gridColors: ['#EAEAEA'],
      },
      s = t.getAttribute('data-grid-background') || i.gridBackground,
      l =
        parseInt(t.getAttribute('data-grid-size-desktop')) || i.gridSizeDesktop,
      c = parseInt(t.getAttribute('data-grid-size-mobile')) || i.gridSizeMobile,
      d =
        parseFloat(t.getAttribute('data-grid-border-size')) || i.gridBorderSize,
      u = t.getAttribute('data-grid-border-color') || i.gridBorderColor;
    let p = i.gridColors;
    const g = t.getAttribute('data-grid-colors');
    if (g)
      try {
        p = JSON.parse(g);
      } catch (e) {
        try {
          p = JSON.parse(g.replace(/'/g, '"'));
        } catch (e) {
          p = i.gridColors;
        }
      }
    t.style.backgroundColor = s;
    const m = document.createElement('canvas');
    t.appendChild(m);
    const h = m.getContext('2d');
    let y,
      f,
      b,
      S,
      x = null;
    (n() ||
      m.addEventListener('mousemove', (e) => {
        const t = m.getBoundingClientRect(),
          a = e.clientX - t.left,
          o = e.clientY - t.top,
          n = S.findIndex(
            (e) => a >= e.x && a < e.x + b && o >= e.y && o < e.y + b
          );
        if (-1 !== n && n !== x) {
          const e = S[n];
          ((e.color = p[Math.floor(Math.random() * p.length)]),
            gsap.to(e, { alpha: 1, duration: 0.1, overwrite: !0 }),
            r(e),
            (x = n));
        }
      }),
      window.addEventListener('resize', e(a, 200)),
      a(),
      o());
  }
  function a() {
    document.querySelectorAll('[data-grid]').forEach((e) => t(e));
  }
  a();
}
function initCursorCoordinates() {
  const e = document.querySelector('[data-coordinates-x]'),
    t = document.querySelector('[data-coordinates-y]');
  e &&
    t &&
    document.addEventListener('mousemove', (a) => {
      ((e.textContent = Math.round(a.pageX)),
        (t.textContent = Math.round(a.pageY)));
    });
}
function initGridSection() {
  function e() {
    gsap.set(t, { opacity: 0 });
    const e = gsap.timeline();
    return (
      t.forEach((t) => {
        let a = gsap.timeline();
        (a
          .to(t, { delay: 0.8, opacity: 1, duration: 0.04 })
          .to(t, { delay: 0.02, opacity: 0, duration: 0.03 })
          .to(t, { opacity: 1, duration: 0.04 })
          .to(t, { opacity: 1, duration: 0.05, ease: 'none' }),
          e.add(a, 0.5 * Math.random()));
      }),
      e
    );
  }
  const t = document.querySelectorAll('.grids_guide_item');
  ScrollTrigger.create({
    trigger: '.grids_guide_item',
    start: 'top bottom',
    once: !1,
    onEnter: () => e(),
  });
}
function initAnimationSection() {
  function e() {
    document
      .querySelectorAll('[data-accelerating-globe]')
      .forEach(function (e) {
        function t() {
          const e = performance.now(),
            t = window.scrollY - i,
            a = e - s;
          ((i = window.scrollY), (s = e));
          const r = a > 0 ? (t / a) * 1e3 : 0,
            l = Math.abs(0.005 * r) + 1;
          (o.timeScale(l),
            clearTimeout(n),
            (n = setTimeout(() => {
              gsap.to(o, {
                timeScale: 1,
                duration: 0.6,
                ease: 'power2.out',
                overwrite: !0,
              });
            }, 100)));
        }
        const a = e.querySelectorAll('[data-accelerating-globe-circle]');
        if (a.length < 8) return;
        const o = gsap.timeline({
            repeat: -1,
            defaults: { duration: 1, ease: 'none' },
          }),
          r = [
            ['50%', '37.5%'],
            ['37.5%', '25%'],
            ['25%', '12.5%'],
            ['calc(12.5% + 1px)', 'calc(0% + 1px)'],
            ['calc(0% + 1px)', 'calc(12.5% + 1px)'],
            ['12.5%', '25%'],
            ['25%', '37.5%'],
            ['37.5%', '50%'],
          ];
        a.forEach((e, t) => {
          const [a, n] = r[t];
          o.fromTo(e, { width: a }, { width: n }, 0 === t ? 0 : '<');
        });
        let n,
          i = window.scrollY,
          s = performance.now();
        window.addEventListener('scroll', t, { passive: !0 });
      });
  }
  function t() {
    let e = Math.round(s.value);
    $(n).text(e);
  }
  function a() {
    document
      .querySelectorAll('[data-marquee-scroll-direction-target]')
      .forEach((e) => {
        const t = e.querySelector('[data-marquee-collection-target]'),
          a = e.querySelector('[data-marquee-scroll-target]');
        if (!t || !a) return;
        const {
            marqueeSpeed: o,
            marqueeDirection: r,
            marqueeDuplicate: n,
            marqueeScrollSpeed: i,
          } = e.dataset,
          s = parseFloat(o),
          l = 'right' === r ? 1 : -1,
          c = parseInt(n || 0),
          d = parseFloat(i),
          u =
            window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
        let p = s * (t.offsetWidth / window.innerWidth) * u;
        if (
          ((a.style.marginLeft = -1 * d + '%'),
          (a.style.width = 2 * d + 100 + '%'),
          c > 0)
        ) {
          const e = document.createDocumentFragment();
          for (let a = 0; a < c; a++) e.appendChild(t.cloneNode(!0));
          a.appendChild(e);
        }
        const g = e.querySelectorAll('[data-marquee-collection-target]'),
          m = gsap
            .to(g, { xPercent: -100, repeat: -1, duration: p, ease: 'linear' })
            .totalProgress(0.5);
        (gsap.set(g, { xPercent: 1 === l ? 100 : -100 }),
          m.timeScale(l),
          m.play(),
          e.setAttribute('data-marquee-status', 'normal'),
          ScrollTrigger.create({
            trigger: e,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (t) => {
              const a = 1 === t.direction,
                o = a ? -l : l;
              (m.timeScale(o),
                e.setAttribute(
                  'data-marquee-status',
                  a ? 'normal' : 'inverted'
                ));
            },
          }));
        const h = gsap.timeline({
            scrollTrigger: {
              trigger: e,
              start: '0% 100%',
              end: '100% 0%',
              scrub: 0,
            },
          }),
          y = -1 === l ? d : -d,
          f = -y;
        h.fromTo(a, { x: `${y}vw` }, { x: `${f}vw`, ease: 'none' });
      });
  }
  function o() {
    const e = document.querySelectorAll("[data-button='1']"),
      t = document.querySelector("[data-ease='1']"),
      a = document.querySelector("[data-draw='1']");
    e.forEach((e) => {
      const o = e.querySelector('[split-hover-text]'),
        r = new SplitText(o, { type: 'chars' }).chars;
      (e.addEventListener('mouseenter', function () {
        const o = gsap.timeline();
        (o
          .to(
            r,
            {
              yPercent: -93,
              duration: 0.6,
              ease: 'ease-primary',
              stagger: { amount: 0.075 },
              overwrite: !0,
            },
            0
          )
          .to(
            a,
            {
              duration: 0.57,
              ease: 'ease-primary',
              motionPath: {
                path: t,
                align: t,
                autoRotate: !0,
                alignOrigin: [0.5, 0.5],
              },
            },
            0
          ),
          (e.hoverTimeline = o));
      }),
        e.addEventListener('mouseleave', function () {
          e.hoverTimeline && e.hoverTimeline.reverse();
        }));
    });
    const o = document.querySelector("[data-button='2']"),
      r = document.querySelector("[data-ease='2']"),
      n = document.querySelector("[data-draw='2']");
    (CustomEase.create('ease-button', '0.16, 1, 0.3, 1'),
      o.addEventListener('mouseenter', function () {
        const e = gsap.timeline();
        (e.to(
          n,
          {
            duration: 0.45,
            ease: 'ease-button',
            motionPath: {
              path: r,
              align: r,
              autoRotate: !0,
              alignOrigin: [0.5, 0.5],
            },
          },
          0
        ),
          (o.hoverTimeline = e));
      }),
      o.addEventListener('mouseleave', function () {
        o.hoverTimeline && o.hoverTimeline.reverse();
      }));
  }
  function r() {
    gsap.to('.animations_organic_bg_column', {
      yPercent: 50,
      duration: 0.6,
      ease: 'power1.inOut',
      transformOrigin: 'bottom',
      stagger: { each: 0.08, from: 'center', repeat: -1, yoyo: !0 },
    });
  }
  e();
  const n = document.querySelector('[data-anim=number]'),
    i = document.querySelector('.animation_types-wrap');
  let s = { value: 0 };
  gsap.to(s, {
    delay: 0.2,
    onUpdate: t,
    ease: 'power1.inOut',
    value: 50,
    duration: 3,
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: !0,
    scrollTrigger: { trigger: i, start: 'top bottom' },
  });
  const l = document.querySelectorAll('[star]');
  (gsap.set(l, { transformPerspective: 1e3, transformOrigin: 'center center' }),
    l.forEach((e) => {
      gsap.to(e, {
        rotationY: 360,
        duration: 4,
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center',
      });
    }),
    a(),
    o(),
    r());
}
let lenis, modalLenis;
(gsap.registerPlugin(ScrollTrigger, SplitText),
  CustomEase.create('ease-primary', '0.87, 0, 0.13, 1'),
  CustomEase.create('ease-secondary', '0.31,0.75,0.22,1'),
  CustomEase.create('ease-fade', '0.76, 0, 0.24, 1'),
  CustomEase.create('ease-preloader', '.64,.04,.42,.99'),
  CustomEase.create('ease-transition', '0.16, 1, 0.35, 1'));
let transitionOffset = 375,
  transitionFaster = 0.25,
  transitionFast = 0.4,
  transitionNormal = 0.65,
  transitionSlow = 1,
  transitionSlower = 1.25,
  staggerNormal = 0.055,
  isTablet = checkIsTablet(),
  isMobile = checkIsMobile();
const mm = gsap.matchMedia();
(initMenu(),
  animateMenuOpen(),
  initGlobalParallax(),
  initSectionEnd(),
  initHeadings(),
  initScript());
