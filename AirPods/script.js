document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to('.title', {
    scale: 1.5,
    autoAlpha: 0,

    scrollTrigger: {
      scrub: 0.5, // hace que la animacion sea fluida cuando se hace el scroll
      start: 'center center',
    },
  })
  const canvas = document.getElementById('hero')
  const ctx = canvas.getContext('2d')

  canvas.width = 1068
  canvas.height = 600

  const TOTAL_FRAMES = 65

  const createURL = (frame) => {
    const id = frame.toString().padStart(4, '0')
    return `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/medium/${id}.png`
  }

  const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const img = new Image()
    img.src = createURL(i)
    return img
  })

  const airpods = {
    frame: 0,
  }

  const subtitle = document.querySelector('.subtitle')

  gsap.to(airpods, {
    frame: TOTAL_FRAMES - 1,
    ease: 'none',
    snap: 'frame',
    scrollTrigger: {
      scrub: 0.5,
      onUpdate: (self) => {
        // Mostrar/ocultar el subtítulo basado en el progreso del scroll
        if (self.progress > 0.95) {
          // Mostrar el subtítulo cuando la animación esté casi terminada (último 5%)
          if (subtitle.style.opacity !== '1') {
            gsap.to(subtitle, {
              autoAlpha: 1,
              scale: 1.5,
              // ease: 'power2.out',
              duration: 0.5,
            })
          }
        } else if (self.progress < 1) {
          // Ocultar el subtítulo cuando el scroll esté por debajo del 90%
          if (subtitle.style.opacity !== '0') {
            gsap.to(subtitle, {
              autoAlpha: 0,
              // ease: 'power2.in',
              duration: 0.1,
              scale: 1,
            })
          }
        }
      },
    },
    onUpdate: render,
  })

  images[0].onload = () => render()

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(images[airpods.frame], 0, 0)
  }
})
