import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

type SwayProps = {
  amp?: number
  dur?: number
  delay?: number
  children: ReactNode
}

function Sway({ amp = 3, dur = 8, delay = 0, children }: SwayProps) {
  const style = {
    '--amp': `${amp}deg`,
    '--dur': `${dur}s`,
    '--delay': `${-delay}s`,
  } as CSSProperties
  return (
    <g className="sway" style={style}>
      {children}
    </g>
  )
}

// Deterministic pseudo-random so the layout is stable between renders.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function Dots({
  seed,
  count = 16,
  color = '#fff',
  width = 400,
  height = 500,
}: {
  seed: number
  count?: number
  color?: string
  width?: number
  height?: number
}) {
  return (
    <g fill={color}>
      {Array.from({ length: count }, (_, i) => {
        const r = 1.4 + rand(seed + i * 3) * 2.2
        const style = {
          '--dur': `${3 + rand(seed + i * 7) * 4}s`,
          '--delay': `${-rand(seed + i * 11) * 6}s`,
        } as CSSProperties
        return (
          <circle
            key={i}
            className="twinkle"
            style={style}
            cx={rand(seed + i) * width}
            cy={rand(seed + i * 5 + 1) * height}
            r={r}
          />
        )
      })}
    </g>
  )
}

function Defs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" result="blur" />
          <feFlood floodColor="#ffffff" floodOpacity="0.4" />
          <feComposite in2="blur" operator="in" result="halo" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feFlood floodColor="#ffffff" floodOpacity="0.3" />
          <feComposite in2="blur" operator="in" result="halo" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

/* ---------------------------------- Campanula ---------------------------------- */

function Bell({ bud = false }: { bud?: boolean }) {
  return (
    <g>
      <g filter="url(#glow)">
        {bud ? (
          <path d="M -9 0 C -24 -22 -20 -52 0 -74 C 20 -52 24 -22 9 0 Z" fill="#f3fbee" />
        ) : (
          <>
            <path
              d="M -10 0 C -28 -14 -44 -50 -46 -92 L -30 -80 L -15 -100 L 0 -84 L 15 -100 L 30 -80 L 46 -92 C 44 -50 28 -14 10 0 Z"
              fill="#f4fbef"
            />
            <ellipse cx="0" cy="-86" rx="26" ry="5" fill="#dff2d6" />
          </>
        )}
      </g>
      <g stroke="#cfeac3" strokeWidth="2" fill="none" strokeLinecap="round">
        {bud ? (
          <path d="M 0 -4 L 0 -66" />
        ) : (
          <>
            <path d="M 0 -4 L 0 -82" />
            <path d="M -6 -4 Q -20 -40 -30 -78" />
            <path d="M 6 -4 Q 20 -40 30 -78" />
          </>
        )}
      </g>
      {!bud && (
        <g fill="#f6d43a">
          <path d="M 0 -84 L 0 -104" stroke="#f6d43a" strokeWidth="2.5" />
          <circle cx="-5" cy="-106" r="2.6" />
          <circle cx="0" cy="-110" r="2.6" />
          <circle cx="5" cy="-106" r="2.6" />
        </g>
      )}
      <path d="M -10 -2 Q -24 -18 -32 -32 Q -14 -26 -3 -8 Z" fill="#3e9f4b" />
      <path d="M 10 -2 Q 24 -18 32 -32 Q 14 -26 3 -8 Z" fill="#3e9f4b" />
      <path d="M -14 -6 C -24 4 -16 16 -6 14 L 0 8 L 6 14 C 16 16 24 4 14 -6 Q 0 2 -14 -6 Z" fill="#2c8a3c" />
    </g>
  )
}

/* ---------------------------------- Magnolia ---------------------------------- */

function MagnoliaFlower() {
  return (
    <g>
      <g filter="url(#glow)">
        <path d="M -4 -14 C -46 -12 -62 -62 -42 -82 C -26 -94 -8 -70 -4 -14 Z" fill="#eef3f6" />
        <path d="M 4 -14 C 46 -12 62 -62 42 -82 C 26 -94 8 -70 4 -14 Z" fill="#eef3f6" />
        <path d="M -12 -16 C -32 -60 -24 -98 0 -100 C 24 -98 32 -60 12 -16 Z" fill="#fbfdfe" />
      </g>
      <ellipse cx="0" cy="-22" rx="16" ry="8" fill="#bfe1f8" opacity="0.85" />
      <path d="M -14 0 Q -22 -14 -8 -22 L 8 -22 Q 22 -14 14 0 Z" fill="#79bdee" />
    </g>
  )
}

function MagnoliaBud() {
  return (
    <g>
      <path d="M -9 0 C -16 -16 -10 -32 0 -36 C 10 -32 16 -16 9 0 Z" fill="#f4f9fc" filter="url(#glow-soft)" />
      <path d="M -9 0 C -12 -10 -6 -16 0 -18 C 6 -16 12 -10 9 0 Z" fill="#7cc0ef" />
    </g>
  )
}

type Cluster = { d: string; flowers: [number, number, number, number][]; buds?: [number, number, number][] }

const clusters: Cluster[] = [
  {
    d: 'M60 560 C 70 470 90 400 120 330 M 92 410 C 60 380 40 340 28 300 M 120 330 C 132 280 150 250 168 212',
    flowers: [
      [28, 300, -25, 0.78],
      [120, 330, 0, 0.9],
      [168, 212, 10, 0.95],
    ],
    buds: [[75, 385, -40]],
  },
  {
    d: 'M240 560 C 230 480 250 420 282 372 M 256 432 C 300 420 330 400 362 360 M 282 372 C 272 322 252 282 232 240',
    flowers: [
      [232, 240, -10, 0.9],
      [282, 372, 10, 1.0],
      [362, 360, 30, 0.85],
    ],
    buds: [[312, 410, 40]],
  },
  {
    d: 'M150 560 C 160 520 180 490 205 468',
    flowers: [[205, 468, 15, 0.95]],
  },
  {
    d: 'M400 560 C 380 520 345 495 312 482',
    flowers: [[312, 482, -30, 0.9]],
  },
  {
    d: 'M10 560 C 20 520 30 500 40 488',
    flowers: [[40, 488, 8, 0.85]],
  },
]

/* ---------------------------------- Tulip ---------------------------------- */

function TulipHead({ white }: { white: boolean }) {
  return (
    <g>
      <path
        d="M -38 -4 C -42 -54 -30 -84 0 -84 C 30 -84 42 -54 38 -4 C 30 12 -30 12 -38 -4 Z"
        fill={white ? '#fdfcff' : '#f2b6d8'}
        filter="url(#glow)"
      />
      {white ? (
        <path
          d="M -22 -64 q 5.5 -7 11 0 t 11 0 t 11 0 t 11 0"
          stroke="#cdc7f4"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <ellipse cx="-4" cy="-60" rx="22" ry="14" fill="#f8d3e8" />
      )}
    </g>
  )
}

/* ---------------------------------- Daisy ---------------------------------- */

function DaisyHead() {
  return (
    <g>
      <g filter="url(#glow)">
        {Array.from({ length: 18 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-28" rx="6.5" ry="19" fill="#ffffff" transform={`rotate(${i * 20})`} />
        ))}
      </g>
      <circle r="15" fill="#e8d84a" />
      <circle r="12" fill="#f5e75e" />
    </g>
  )
}

/* ---------------------------------- Garden ---------------------------------- */

const W = 1600
const H = 520

type Kind = 'bell' | 'bud' | 'tulip' | 'daisy'
type Plant = { kind: Kind; x: number; y: number; s: number; tilt: number; white: boolean; seed: number }

const COUNT = 28
const plants: Plant[] = Array.from({ length: COUNT }, (_, i): Plant => {
  const r = rand(i + 100)
  const kind: Kind = r < 0.3 ? 'bell' : r < 0.36 ? 'bud' : r < 0.68 ? 'tulip' : 'daisy'
  return {
    kind,
    x: (i + 0.5) * (W / COUNT) + (rand(i + 300) - 0.5) * 30,
    y: 270 + rand(i + 200) * 220,
    s: (0.75 + rand(i + 400) * 0.3) * 0.7,
    tilt: (rand(i + 500) - 0.5) * 10,
    white: rand(i + 600) > 0.2,
    seed: i,
  }
}).sort((a, b) => a.y - b.y)

const blades = Array.from({ length: 16 }, (_, i) => ({
  x: (i + 0.5) * (W / 16) + (rand(i + 700) - 0.5) * 40,
  h: 160 + rand(i + 710) * 240,
  lean: (rand(i + 720) - 0.5) * 90,
  color: ['#1d5aa3', '#2468b8', '#1a4f92'][i % 3],
}))

const magnoliaOffsets = [0, 400, 800, 1200]

type Register = (i: number, kind: 'body' | 'aura', el: SVGElement | null) => void

const auraY: Record<Kind, number> = { bell: -50, bud: -36, tulip: -42, daisy: 0 }

function PlantView({ p, index, register }: { p: Plant; index: number; register: Register }) {
  const len = (H + 60 - p.y) / p.s
  const sway = { amp: 2.2 + rand(p.seed + 50) * 1.8, dur: 7 + rand(p.seed + 51) * 4, delay: rand(p.seed + 52) * 8 }
  const side = p.seed % 2 ? 1 : -1

  return (
    <g transform={`translate(${p.x} ${p.y}) rotate(${p.tilt}) scale(${p.s})`}>
      <Sway {...sway}>
        {/* Body is lifted and scaled from JS when the plant is watered. */}
        <g ref={(el) => register(index, 'body', el)}>
          <circle
            ref={(el) => register(index, 'aura', el)}
            cy={auraY[p.kind]}
            r="78"
            fill="url(#aura)"
            opacity="0"
          />
          {(p.kind === 'bell' || p.kind === 'bud') && (
            <>
              <path
                d={`M 0 10 Q ${side * 6} ${len * 0.5} 0 ${len}`}
                stroke="#3a9945"
                strokeWidth={p.kind === 'bud' ? 5 : 6}
                fill="none"
                strokeLinecap="round"
              />
              <Sway amp={3.5} dur={5 + rand(p.seed + 2) * 3} delay={rand(p.seed + 6) * 5}>
                <Bell bud={p.kind === 'bud'} />
              </Sway>
            </>
          )}
          {p.kind === 'tulip' && (
            <>
              <path d={`M 0 0 Q ${side * 8} ${len * 0.5} 0 ${len}`} stroke="#4f9a6a" strokeWidth="7" fill="none" />
              <TulipHead white={p.white} />
            </>
          )}
          {p.kind === 'daisy' && (
            <>
              <path
                d={`M 0 0 Q ${side * 10} ${len * 0.5} ${-side * 4} ${len}`}
                stroke="#69b347"
                strokeWidth="5"
                fill="none"
              />
              <path
                d={`M ${side * 3} 90 Q ${side * 30} 70 ${side * 44} 84 Q ${side * 26} 100 ${side * 3} 96 Z`}
                fill="#78c255"
              />
              <DaisyHead />
            </>
          )}
        </g>
      </Sway>
    </g>
  )
}

function Garden({ register }: { register: Register }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="A night garden of campanula, magnolia, tulips and daisies swaying in the breeze"
    >
      <defs>
        <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2677cf" />
          <stop offset="1" stopColor="#3794e0" />
        </linearGradient>
        <radialGradient id="aura">
          <stop offset="0" stopColor="#fffbe0" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#fff2a8" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff2a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#night)" />
      <Dots seed={21} count={50} width={W} height={H * 0.7} />
      <path
        d="M 1482 50 A 22 22 0 1 0 1504 84 A 17 17 0 1 1 1482 50 Z"
        fill="#fbfbf5"
        filter="url(#glow-soft)"
        className="breathe"
      />

      {magnoliaOffsets.map((ox, k) => (
        <g key={ox} transform={`translate(${ox} 0)`}>
          {clusters
            .filter((_, j) => j < 2 || (j + k) % 2 === 0)
            .map((c, i) => (
              <Sway
                key={i}
                amp={1.6 + rand(i + k * 9 + 30) * 1.2}
                dur={9 + rand(i + k + 31) * 4}
                delay={rand(i + k * 4 + 32) * 8}
              >
                <path d={c.d} stroke="#22457c" strokeWidth="7" fill="none" strokeLinecap="round" />
                {c.buds?.map(([x, y, r], j) => (
                  <g key={j} transform={`translate(${x} ${y}) rotate(${r})`}>
                    <MagnoliaBud />
                  </g>
                ))}
                {c.flowers.map(([x, y, r, s], j) => (
                  <g key={j} transform={`translate(${x} ${y}) rotate(${r}) scale(${s * 0.7})`}>
                    <Sway amp={3} dur={6 + rand(i * 5 + j + k) * 3} delay={rand(i * 3 + j + k) * 6}>
                      <MagnoliaFlower />
                    </Sway>
                  </g>
                ))}
              </Sway>
            ))}
        </g>
      ))}

      {blades.map((b, i) => (
        <Sway key={i} amp={2} dur={10 + (i % 5)} delay={i * 1.3}>
          <path
            d={`M ${b.x - 22} ${H + 40} Q ${b.x - 30} ${H + 40 - b.h * 0.5} ${b.x + b.lean} ${H + 40 - b.h} Q ${b.x + 30} ${H + 40 - b.h * 0.5} ${b.x + 22} ${H + 40} Z`}
            fill={b.color}
            opacity="0.85"
          />
        </Sway>
      ))}

      {plants.map((p, i) => (
        <PlantView key={p.seed} p={p} index={i} register={register} />
      ))}
    </svg>
  )
}

/* ---------------------------------- Watering can cursor ---------------------------------- */

// Drawn upright in the poster's flat style, then tilted to pour.
const CAN_W = 140
const CAN_H = 112
const CAN_CX = 80
const CAN_CY = 60
const CAN_TILT = -32
const CAN_SCALE = 0.6
const ROSE = { x: 5, y: 55 }
const rad = (CAN_TILT * Math.PI) / 180
const TIP_X = (CAN_CX + (ROSE.x - CAN_CX) * Math.cos(rad) - (ROSE.y - CAN_CY) * Math.sin(rad)) * CAN_SCALE
const TIP_Y = (CAN_CY + (ROSE.x - CAN_CX) * Math.sin(rad) + (ROSE.y - CAN_CY) * Math.cos(rad)) * CAN_SCALE

function WateringCan() {
  return (
    <svg width={CAN_W * CAN_SCALE} height={CAN_H * CAN_SCALE} viewBox={`0 0 ${CAN_W} ${CAN_H}`} aria-hidden="true">
      <g transform={`rotate(${CAN_TILT} ${CAN_CX} ${CAN_CY})`}>
        {/* handles in magnolia-branch navy */}
        <path d="M 99 46 C 120 44 121 78 99 76" fill="none" stroke="#22457c" strokeWidth="7" strokeLinecap="round" />
        <path d="M 54 38 C 56 14 88 14 92 38" fill="none" stroke="#22457c" strokeWidth="7" strokeLinecap="round" />
        <g filter="url(#glow-soft)">
          {/* spout */}
          <path d="M 47 74 L 12 60 Q 9 55 12 51 L 47 60 Z" fill="#eef4f6" />
          {/* body */}
          <path d="M 47 36 L 97 36 Q 101 36 101 40 L 103 82 Q 103 88 97 88 L 47 88 Q 41 88 41 82 L 43 40 Q 43 36 47 36 Z" fill="#f7fafb" />
        </g>
        {/* soft petal-blue shading */}
        <path d="M 47 69 L 12 57 Q 11 59 12 60 L 47 74 Z" fill="#bfe1f8" />
        <path d="M 84 36 L 97 36 Q 101 36 101 40 L 103 82 Q 103 88 97 88 L 86 88 Q 92 62 84 36 Z" fill="#d6eaf8" />
        <path d="M 41.6 78 L 102.6 78 L 103 82 Q 103 88 97 88 L 47 88 Q 41 88 41 82 Z" fill="#79bdee" />
        <ellipse cx="72" cy="36.5" rx="27" ry="4" fill="#22457c" />
        {/* rose, like a magnolia sepal */}
        <path d="M 14 49 L 7 44 Q 1 55 7 66 L 14 61 Z" fill="#79bdee" />
        <g fill="#22457c">
          <circle cx="6" cy="50" r="1" />
          <circle cx="5" cy="55" r="1" />
          <circle cx="6" cy="60" r="1" />
        </g>
        {/* little magnolia emblem */}
        <g transform="translate(66 68)">
          <path d="M -2 0 C -14 -2 -17 -15 -11 -20 C -6 -23 -2 -16 -2 0 Z" fill="#bfe1f8" />
          <path d="M 2 0 C 14 -2 17 -15 11 -20 C 6 -23 2 -16 2 0 Z" fill="#bfe1f8" />
          <path d="M -4 -1 C -9 -14 -6 -25 0 -26 C 6 -25 9 -14 4 -1 Z" fill="#9ccff3" />
          <path d="M -4 2 Q -6 -3 -2 -5 L 2 -5 Q 6 -3 4 2 Z" fill="#79bdee" />
        </g>
        <rect x="49" y="44" width="5" height="26" rx="2.5" fill="#ffffff" />
      </g>
    </svg>
  )
}

/* ---------------------------------- Interaction ---------------------------------- */

type Drop = { x: number; y: number; vx: number; vy: number }
type Fly = { x: number; y: number; a: number; speed: number; phase: number; life: number; max: number }

function makeSprite(stops: [number, string][], size: number) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  stops.forEach(([o, col]) => grad.addColorStop(o, col))
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

export default function App() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canRef = useRef<HTMLDivElement>(null)
  const bodies = useRef<(SVGElement | null)[]>([])
  const auras = useRef<(SVGElement | null)[]>([])

  const register: Register = (i, kind, el) => {
    ;(kind === 'body' ? bodies : auras).current[i] = el
  }

  useEffect(() => {
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const can = canRef.current!
    const ctx = canvas.getContext('2d')!

    let w = 1
    let h = 1
    let k = 1
    let dpr = 1
    const resize = () => {
      const r = stage.getBoundingClientRect()
      w = r.width
      h = r.height
      k = w / W
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)

    const flySprite = makeSprite(
      [
        [0, 'rgba(255,255,225,1)'],
        [0.1, 'rgba(255,238,90,0.95)'],
        [0.3, 'rgba(255,220,40,0.22)'],
        [1, 'rgba(255,200,0,0)'],
      ],
      64,
    )
    const pointer = { x: 0, y: 0, cx: 0, cy: 0, inside: false }
    const vitality = new Float32Array(plants.length)
    const shown = new Float32Array(plants.length)
    const spawned = new Uint8Array(plants.length)
    let drops: Drop[] = []
    let flies: Fly[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h * 0.8,
      a: Math.random() * Math.PI * 2,
      speed: 14 + Math.random() * 18,
      phase: Math.random() * 10,
      life: Infinity,
      max: Infinity,
    }))
    let dropDebt = 0

    const onEnter = (e: PointerEvent) => {
      pointer.inside = true
      onMove(e)
      can.style.opacity = '1'
    }
    const onLeave = () => {
      pointer.inside = false
      can.style.opacity = '0'
    }
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.cx = e.clientX
      pointer.cy = e.clientY
    }
    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)
    stage.addEventListener('pointermove', onMove)

    let raf = 0
    let last = performance.now()
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t

      // Pour water from the spout while the can is over the garden.
      if (pointer.inside) {
        const bob = Math.sin(t / 260) * 3
        can.style.transform = `translate(${pointer.cx - TIP_X}px, ${pointer.cy - TIP_Y}px) rotate(${bob}deg)`
        dropDebt += dt * 240
        while (dropDebt > 1) {
          dropDebt -= 1
          drops.push({
            x: pointer.x + (Math.random() - 0.5) * 6,
            y: pointer.y + (Math.random() - 0.5) * 9,
            vx: -35 - Math.random() * 85,
            vy: 20 + Math.random() * 80,
          })
        }
      }

      // Drops fall and soak any flower head they land on.
      const nextDrops: Drop[] = []
      for (const d of drops) {
        d.vy += 900 * dt
        d.x += d.vx * dt
        d.y += d.vy * dt
        let hit = false
        for (let i = plants.length - 1; i >= 0; i--) {
          const p = plants[i]
          const px = p.x * k
          const py = (p.y + auraY[p.kind] * p.s) * k
          if (Math.abs(d.x - px) < 40 * k * p.s && Math.abs(d.y - py) < 45 * k * p.s) {
            vitality[i] = Math.min(1, vitality[i] + 0.05)
            hit = true
            break
          }
        }
        if (!hit && d.y < h + 10) nextDrops.push(d)
      }
      drops = nextDrops

      // Watered plants perk up, glow, invite fireflies.
      for (let i = 0; i < plants.length; i++) {
        vitality[i] = Math.max(0, vitality[i] - dt * 0.05)
        const target = vitality[i]
        const prev = shown[i]
        const next = prev + (target - prev) * Math.min(1, dt * 3)
        shown[i] = next
        if (Math.abs(next - prev) > 0.0005 || (next === 0 && prev !== 0)) {
          const body = bodies.current[i]
          const aura = auras.current[i]
          if (body) body.style.transform = `translate(0px, ${(-18 * next).toFixed(2)}px) scale(${(1 + 0.16 * next).toFixed(3)})`
          if (aura) aura.setAttribute('opacity', (next * 0.95).toFixed(3))
        }

        const p = plants[i]
        const hx = p.x * k
        const hy = (p.y + auraY[p.kind] * p.s) * k
        if (target > 0.6 && !spawned[i] && flies.length < 16) {
          spawned[i] = 1
          const n = Math.random() < 0.6 ? 1 : 0
          for (let j = 0; j < n; j++) {
            flies.push({
              x: hx,
              y: hy,
              a: Math.random() * Math.PI * 2,
              speed: 18 + Math.random() * 20,
              phase: Math.random() * 10,
              life: 14 + Math.random() * 6,
              max: 20,
            })
          }
        } else if (target < 0.2) {
          spawned[i] = 0
        }
      }

      flies = flies.filter((f) => {
        f.life -= dt
        f.a += (Math.random() - 0.5) * 5 * dt
        if (f.x < 12 || f.x > w - 12 || f.y < 12 || f.y > h - 12) {
          f.a = Math.atan2(h * 0.45 - f.y, w / 2 - f.x) + (Math.random() - 0.5)
        }
        f.x += Math.cos(f.a) * f.speed * dt
        f.y += Math.sin(f.a) * f.speed * dt * 0.7
        return f.life > 0
      })

      // Draw particles.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'source-over'
      ctx.lineCap = 'round'
      const streak = (width: number, color: string, len: number) => {
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.beginPath()
        for (const d of drops) {
          ctx.moveTo(d.x, d.y)
          ctx.lineTo(d.x - d.vx * len, d.y - d.vy * len)
        }
        ctx.stroke()
      }
      streak(3, 'rgba(150,210,255,0.25)', 0.024)
      streak(1.4, 'rgba(225,245,255,0.9)', 0.018)

      ctx.globalCompositeOperation = 'lighter'
      for (const f of flies) {
        const blink = 0.45 + 0.55 * Math.max(0, Math.sin(t / 700 + f.phase))
        const fade = f.max === Infinity ? 1 : Math.min(1, f.life / 2, (f.max - f.life) / 1.5 + 0.2)
        ctx.globalAlpha = blink * fade * 0.6
        const s = 16 + blink * 6
        ctx.drawImage(flySprite, f.x - s / 2, f.y - s / 2, s, s)
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
      stage.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden py-14 font-sans text-[#ece7dc]">
      <Defs />
      <div
        className="breathe pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 52%, rgba(90,160,240,0.22), transparent 70%), radial-gradient(40% 30% at 15% 60%, rgba(150,220,150,0.1), transparent 70%), radial-gradient(40% 30% at 85% 45%, rgba(220,170,255,0.1), transparent 70%)',
        }}
      />

      <div className="relative overflow-x-auto pb-4">
        <div className="mx-auto w-[max(1080px,94vw)] max-w-[1800px] px-[3vw] sm:px-0">
          <div className="rounded-[6px] bg-[#f3eee3] p-3 shadow-[0_40px_120px_-20px_rgba(90,160,240,0.4),0_20px_60px_rgba(0,0,0,0.6)] md:p-4">
            <div ref={stageRef} className="relative aspect-[1600/520] cursor-none touch-none overflow-hidden">
              <Garden register={register} />
              <div
                className="breathe pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(220,240,255,0.14), transparent 65%)' }}
              />
              <div className="grain pointer-events-none absolute inset-0" />
              <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

              <span className="pointer-events-none absolute left-[3%] top-[6%] rounded-full border-[1.5px] border-neutral-900 px-2 py-[1px] font-display text-[10px] uppercase tracking-wide text-neutral-900">
                Created by me
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={canRef}
        className="pointer-events-none fixed left-0 top-0 z-50 opacity-0 drop-shadow-[0_6px_8px_rgba(18,40,80,0.35)] transition-opacity duration-200"
        style={{ transformOrigin: `${TIP_X}px ${TIP_Y}px` }}
      >
        <WateringCan />
      </div>
    </main>
  )
}
