'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { autoScript, secretCommands } from './commands'

interface Line { id: string; type: 'input' | 'output'; text: string }

export default function TerminalPortfolio() {
  const [lines, setLines] = useState<Line[]>([])
  const [inputValue, setInputValue] = useState('')
  const [autoPhase, setAutoPhase] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoPhase >= autoScript.length) return
    const cmd = autoScript[autoPhase]
    const timeout = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        { id: `in-${autoPhase}`, type: 'input', text: cmd.input },
        ...cmd.output.map((o, i) => ({ id: `out-${autoPhase}-${i}`, type: 'output' as const, text: o })),
      ])
      setAutoPhase((p) => p + 1)
    }, cmd.delay ?? 1000)
    return () => clearTimeout(timeout)
  }, [autoPhase])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = inputValue.trim().toLowerCase()
    if (!cmd) return
    const output = secretCommands[cmd] ?? [`Comando non trovato: ${cmd}. Prova "help".`]
    if (output[0] === '__CLEAR__') { setLines([]); setInputValue(''); return }
    setLines((prev) => [
      ...prev,
      { id: `user-in-${Date.now()}`, type: 'input', text: cmd },
      ...output.map((o, i) => ({ id: `user-out-${Date.now()}-${i}`, type: 'output' as const, text: o })),
    ])
    setInputValue('')
  }

  return (
    <div className="min-h-screen bg-[#0a0a00] font-mono text-[#00ff41] p-8 relative overflow-hidden">
      {/* Scanlines overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,65,0.15) 0px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Terminal window */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#00ff41]/20">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
          <div className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
          <span className="ml-4 text-xs opacity-50">brian@gastaldelli:~$</span>
        </div>

        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={line.type === 'input' ? 'text-[#00ff41] mb-1' : 'text-[#00cc34] mb-1 ml-4 opacity-80'}
            >
              {line.type === 'input' && <span className="opacity-50 mr-2">$</span>}
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
          <span className="opacity-50">$</span>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Terminale input"
            className="flex-1 bg-transparent outline-none text-[#00ff41] caret-[#00ff41]"
            placeholder="digita un comando..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
