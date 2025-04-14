"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface PhoneInterfaceProps {
  agentType: "voice" | "data-cleaning"
}

interface Message {
  time: number
  speaker: string
}

export function PhoneInterface({ agentType }: PhoneInterfaceProps) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [timer, setTimer] = useState(0)
  const [callerNumber, setCallerNumber] = useState("")
  const [speaker, setSpeaker] = useState("")
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const messageTimeline: Message[] = [
    { time: 2, speaker: "Client" },
    { time: 5, speaker: "AI Assistant" },
    { time: 10, speaker: "Vendor 1" },
    { time: 14, speaker: "Vendor 2" },
    { time: 22, speaker: "AI Assistant" },
    { time: 27, speaker: "Client" }
  ]

  useEffect(() => {
    const areaCode = Math.floor(Math.random() * 900) + 100
    const firstPart = Math.floor(Math.random() * 900) + 100
    const secondPart = Math.floor(Math.random() * 9000) + 1000
    setCallerNumber(`+1 (${areaCode}) ${firstPart}-${secondPart}`)
  }, [])

  useEffect(() => {
    if (isCallActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isCallActive])

  useEffect(() => {
    if (!isCallActive || currentMessageIndex >= messageTimeline.length) return

    const currentMessage = messageTimeline[currentMessageIndex]
    if (timer === currentMessage.time) {
      setSpeaker(currentMessage.speaker)
      setCurrentMessageIndex((prev) => prev + 1)

      setTimeout(() => setSpeaker(""), 2000)
    }
  }, [timer, isCallActive, currentMessageIndex])

  useEffect(() => {
    if (
      isCallActive &&
      currentMessageIndex === messageTimeline.length &&
      timer > messageTimeline[messageTimeline.length - 1].time + 2
    ) {
      endCall()
    }
  }, [timer, isCallActive, currentMessageIndex])

  const startCall = () => {
    setTimer(0)
    setSpeaker("")
    setCurrentMessageIndex(0)
    setIsCallActive(true)
  }

  const endCall = () => {
    setIsCallActive(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }

  const getSpeakerColor = (name: string) => {
    if (name.includes("Client")) return "bg-blue-500"
    if (name.includes("AI")) return "bg-green-500"
    if (name.includes("Vendor")) return "bg-yellow-500"
    return "bg-gray-500"
  }

  return (
    <div className="mt-8 w-full max-w-xs mx-auto relative">
      <AnimatePresence>
        {speaker && (
          <motion.div
            key={speaker}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={`absolute top-[-3rem] right-0 px-4 py-2 rounded-lg text-white shadow-lg font-semibold flex items-center gap-2 ${getSpeakerColor(
              speaker
            )}`}
          >
            <span>{speaker} is speaking...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
        <div className="p-6 bg-gray-800 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
            <span className="text-2xl">🎙️</span>
          </div>

          <div className="text-center">
            <h3 className="font-medium text-lg">Voice AI Assistant</h3>
            <p className="text-gray-400 text-sm">{callerNumber}</p>
          </div>

          {isCallActive && (
            <div className="mt-4 text-green-500 font-mono">{formatTime(timer)}</div>
          )}

          {!isCallActive && !timer && (
            <div className="mt-4 text-gray-400 text-sm">Ready to call</div>
          )}

          {!isCallActive && timer > 0 && (
            <div className="mt-4 text-gray-400 text-sm">
              Call ended - {formatTime(timer)}
            </div>
          )}
        </div>

        <div className="p-4 flex justify-center gap-8">
          <Button
            onClick={startCall}
            disabled={isCallActive}
            className={`rounded-full w-16 h-16 ${
              isCallActive ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Phone className="h-6 w-6" />
          </Button>

          <Button
            onClick={endCall}
            disabled={!isCallActive}
            className={`rounded-full w-16 h-16 ${
              !isCallActive ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
