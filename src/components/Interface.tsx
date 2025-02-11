import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system with improved movement
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      angle: number
      angleSpeed: number
      pulseSpeed: number
    }> = []

    // Create particles with more variation
    for (let i = 0; i < 85; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.35 + 0.15,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.002,
        pulseSpeed: Math.random() * 0.01 + 0.005
      })
    }

    // Animation loop with enhanced movement
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw vignette effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      )
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.12)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        // Enhanced movement with circular patterns
        const time = Date.now() * 0.001
        const moveX = Math.sin(time * particle.pulseSpeed + particle.angle) * 0.3
        const moveY = Math.cos(time * particle.pulseSpeed + particle.angle) * 0.3
        
        particle.x += particle.speedX + moveX
        particle.y += particle.speedY + moveY
        particle.angle += particle.angleSpeed

        // Wrap around screen with smooth transition
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50

        // Draw particle with enhanced glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        const dynamicOpacity = particle.opacity * (0.7 + Math.sin(time * 2 + particle.angle) * 0.3)
        ctx.fillStyle = `rgba(255, 158, 183, ${dynamicOpacity})`
        ctx.fill()
        
        // Add subtle glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        )
        glowGradient.addColorStop(0, `rgba(255, 158, 183, ${dynamicOpacity * 0.2})`)
        glowGradient.addColorStop(1, 'rgba(255, 158, 183, 0)')
        ctx.fillStyle = glowGradient
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 w-full h-[1px] bg-[#ff9eb7]/5 pointer-events-none"
      animate={{
        top: ['-10%', '110%'],
        opacity: [0, 0.15, 0.15, 0],
      }}
      transition={{
        duration: 12,
        times: [0, 0.1, 0.9, 1],
        repeat: Infinity,
        repeatDelay: 3,
        ease: "linear"
      }}
    />
  )
}

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "steps(1)"
      }}
      className="ml-1"
    >
      _
    </motion.span>
  )
}

export function Interface() {
  const [showVideo, setShowVideo] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [systemId, setSystemId] = useState('847392-H')
  const [timestamp, setTimestamp] = useState('--:--:--')
  const [statusIndex, setStatusIndex] = useState(0)
  const [isButtonGlitching, setIsButtonGlitching] = useState(false)

  const letters = ['H', 'U', 'M', 'A', 'N']
  const colors = ['#ff9eb7', '#ff9eb7', '#b4a7ff', '#7dd2ff', '#7dd2ff']
  
  const systemStatuses = [
    { text: "Running Integrity Protocols...", blink: true },
    { text: "Verifying Neural Pathways...", blink: false },
    { text: "Scanning Memory Blocks...", blink: false },
    { text: "Analyzing Data Fragments...", blink: true },
    { text: "Checking System Vitals...", blink: false },
    { text: "Awaiting Authorization...", blink: true }
  ]

  const generateSystemId = () => {
    const chars = '0123456789ABCDEF'
    return Array(6).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('') + '-H'
  }

  const generateTimestamp = () => {
    const options = [
      'CALCULATING',
      'ERR_OVERFLOW',
      'BUFFER_FULL',
      'OUT_OF_RANGE',
      'STACK_ERROR',
      'SYNC_FAILED',
      'DATA_CORRUPT',
      'MEMORY_FAULT'
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  useEffect(() => {
    // System ID rotation
    const systemIdInterval = setInterval(() => {
      setSystemId(Math.random() > 0.8 ? '[REDACTED]' : generateSystemId())
    }, 10000)

    // Status rotation
    const statusInterval = setInterval(() => {
      setStatusIndex(current => (current + 1) % systemStatuses.length)
    }, 3000)

    // Timestamp glitching
    const timestampInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const glitchDuration = 1500
        
        setTimeout(() => {
          setTimestamp(generateTimestamp())
        }, 100)
        
        setTimeout(() => {
          setTimestamp('--:--:--')
        }, glitchDuration)
      }
    }, 3000)

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 10000)

    // Button glitch effect on hover
    let buttonGlitchInterval: ReturnType<typeof setInterval> | null = null
    if (isHovering) {
      buttonGlitchInterval = setInterval(() => {
        setIsButtonGlitching(true)
        setTimeout(() => setIsButtonGlitching(false), 100)
      }, 2000)
    }

    return () => {
      clearInterval(systemIdInterval)
      clearInterval(statusInterval)
      clearInterval(timestampInterval)
      clearInterval(glitchInterval)
      if (buttonGlitchInterval) clearInterval(buttonGlitchInterval)
    }
  }, [isHovering])

  return (
    <div className="relative z-10 h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <Particles />
      <ScanLine />
      
      <motion.div 
        className="absolute top-6 w-full text-center text-xs tracking-[0.3em] text-neutral-300 font-light"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        SYSTEM_ID: <span className="font-medium tracking-[0.2em] text-[#ff9eb7]">{systemId}</span>
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center max-w-[600px] w-full px-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-4xl tracking-[1.5em] font-extralight flex relative mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="ml-[1.5em]">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                style={{ 
                  color: colors[i],
                  textShadow: isGlitching 
                    ? '0 0 20px rgba(255,158,183,0.25)'
                    : '0 0 20px rgba(255,158,183,0.15)'
                }}
                animate={
                  isGlitching 
                    ? {
                        x: [-2, 2, -1, 0],
                        y: [1, -1, 0.5, 0],
                        opacity: [0.6, 1, 0.8],
                        filter: ["blur(0px)", "blur(2px)", "blur(0.5px)", "blur(0px)"],
                        color: [colors[i], '#ff9eb7', colors[i]],
                        transition: { 
                          duration: 0.2,
                          times: [0, 0.4, 0.8, 1],
                          ease: "easeInOut"
                        }
                      }
                    : {
                        opacity: [0.9, 1, 0.9],
                        scale: [1, 1.02, 1],
                        y: [0, -2, 0],
                        transition: { 
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }
                      }
                }
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div
          className="flex flex-col items-center gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIndex}
              className="text-base tracking-[0.2em] text-[#ff9eb7]/90 font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {systemStatuses[statusIndex].text}
            </motion.div>
          </AnimatePresence>

          <motion.button
            className="relative text-sm tracking-[0.2em] text-neutral-100 transition-all group mt-2 px-6 py-3"
            onClick={() => setShowVideo(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <motion.div
              animate={isHovering ? {
                color: '#ff9eb7',
                opacity: 1,
                x: isButtonGlitching ? [-1, 1, -1, 0] : 0
              } : {
                opacity: 1
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.6, 1]
              }}
              className="flex flex-col items-center gap-3 relative"
            >
              <span className="flex items-center relative">
                <motion.span
                  animate={isButtonGlitching ? {
                    x: [-1, 1, -0.5, 0.5, 0],
                    filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                  } : {}}
                  transition={{ duration: 0.15 }}
                  className="text-[#ff9eb7]/90 hover:text-[#ff9eb7] transition-colors duration-300"
                >
                  [INITIATE_VISUAL_LOG]
                </motion.span>
              </span>
              <span className="text-[10px] tracking-[0.2em] text-neutral-300 group-hover:text-[#ff9eb7]/90 transition-all duration-300">
                [ACCESS_LEVEL_2_REQUIRED]
              </span>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 flex flex-col items-center gap-[14px]">
        <motion.div 
          className="text-xs tracking-[0.2em] text-neutral-300 flex items-center gap-3"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.span
            animate={systemStatuses[statusIndex].blink ? {
              opacity: [0.9, 1, 0.9]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="font-light tracking-wider"
          >
            SYSTEM_STATUS: <span className="text-[#ff9eb7] font-normal">{systemStatuses[statusIndex].text}</span>
          </motion.span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#ff9eb7]"
          >
            •
          </motion.span>
        </motion.div>

        <motion.div 
          className="text-[11px] tracking-[0.2em] text-neutral-300 font-light"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          CRITICAL_LOGS: <span className="text-[#ff9eb7]">[REDACTED]</span>
        </motion.div>

        <motion.div 
          className="text-xs tracking-[0.2em] text-neutral-300 font-light"
          animate={{
            opacity: timestamp !== 'Estimating...' ? [0.9, 1, 0.9] : [0.85, 0.95, 0.85],
            scale: timestamp !== 'Estimating...' ? [1, 1.004, 1] : [1, 1, 1],
            x: timestamp !== 'Estimating...' ? [-0.5, 0.5, 0] : 0
          }}
          transition={{
            opacity: { duration: timestamp !== 'Estimating...' ? 0.4 : 2, repeat: Infinity },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 0.3 }
          }}
        >
          TIME_REMAINING: <span className={`font-normal ${timestamp !== '--:--:--' ? 'text-[#ff9eb7]' : 'text-[#ff9eb7]/90'}`}>
            {timestamp === '--:--:--' ? 'Estimating...' : timestamp}
          </span>
        </motion.div>
      </div>

      {showVideo && (
        <motion.div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-[80%] max-w-[1000px] aspect-video bg-black/40 rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <video 
              className="w-full h-full object-contain"
              autoPlay 
              loop 
              controls
              playsInline
            >
              <source src="/1.mp4" type="video/mp4" />
            </video>
            <motion.div
              className="absolute top-4 left-4 text-xs tracking-[0.2em] text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.1, 0.9, 1] }}
            >
              [AUDIO_ENABLED]
            </motion.div>
            <motion.button 
              className="absolute top-4 right-4 text-sm tracking-[0.2em] text-white/80 hover:text-[#ff9eb7] transition-all px-3 py-2"
              onClick={() => setShowVideo(false)}
              whileHover={{
                opacity: [0.8, 1, 0.8],
                x: [-1, 1, -1, 0]
              }}
            >
              [TERMINATE_SEQUENCE]
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl font-light mb-2 tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs tracking-widest text-neutral-400 uppercase">
        {label}
      </div>
    </div>
  )
} 