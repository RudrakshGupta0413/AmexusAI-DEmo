"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhoneInterfaceProps {
  onEndCall: () => void
  isCallActive: boolean
  agentType: "voice" | "data-cleaning"
}

export function PhoneInterface({ onEndCall, isCallActive, agentType }: PhoneInterfaceProps) {
  const [timer, setTimer] = useState(0)
  const [callerNumber, setCallerNumber] = useState("")
  const [speaker, setSpeaker] = useState("")

  // Generate a random phone number when the component mounts
  useEffect(() => {
    const areaCode = Math.floor(Math.random() * 900) + 100
    const firstPart = Math.floor(Math.random() * 900) + 100
    const secondPart = Math.floor(Math.random() * 9000) + 1000
    setCallerNumber(`+1 (${areaCode}) ${firstPart}-${secondPart}`)
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isCallActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } else {
      setTimer(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCallActive])

  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Call start and listen to SSE from /api/call
  const onCall = async () => {
    try {
      const eventSource = new EventSource("/api/call")

      eventSource.onmessage = (event) => {
        const message = event.data
        console.log("Python message:", message)

        if (message.startsWith("SPEAKER:")) {
          setSpeaker(message.replace("SPEAKER:", "").trim())
        }
      }

      eventSource.onerror = (error) => {
        console.error("SSE error:", error)
        eventSource.close()
      }

      // Set call as active externally if needed
    } catch (error) {
      console.error("Error starting call:", error)
    }
  }

  return (
    <div className="mt-8 w-full max-w-xs mx-auto relative">
      {/* Floating Speaker Message */}
      {speaker && (
        <div className="absolute top-[-2.5rem] right-0 bg-white text-black px-4 py-2 rounded shadow text-sm font-semibold">
          {speaker} is speaking...
        </div>
      )}

      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
        {/* Phone display */}
        <div className="p-6 bg-gray-800 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
            <span className="text-2xl">🎙️</span>
          </div>

          <div className="text-center">
            <h3 className="font-medium text-lg">Voice AI Assistant</h3>
            <p className="text-gray-400 text-sm">{callerNumber}</p>
          </div>

          {isCallActive && <div className="mt-4 text-green-500 font-mono">{formatTime(timer)}</div>}

          {!isCallActive && !timer && <div className="mt-4 text-gray-400 text-sm">Ready to call</div>}

          {!isCallActive && timer > 0 && (
            <div className="mt-4 text-gray-400 text-sm">Call ended - {formatTime(timer)}</div>
          )}
        </div>

        {/* Phone buttons */}
        <div className="p-4 flex justify-center gap-8">
          <Button
            onClick={onCall}
            disabled={isCallActive}
            className={`rounded-full w-16 h-16 ${isCallActive ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            <Phone className="h-6 w-6" />
          </Button>

          <Button
            onClick={onEndCall}
            disabled={!isCallActive}
            className={`rounded-full w-16 h-16 ${!isCallActive ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
