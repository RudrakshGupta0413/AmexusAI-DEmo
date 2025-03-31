"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PhoneInterface } from "@/components/phone-interface"
import { DataCleaningInterface } from "@/components/data-cleaning-interface"

export default function Home() {
  const [agentType, setAgentType] = useState<"voice" | "data-cleaning">("voice")
  const [language, setLanguage] = useState("English")
  const [region, setRegion] = useState("US")
  const [isPlaying, setIsPlaying] = useState(false)
  const [latency, setLatency] = useState("0ms")
  const [message, setMessage] = useState("")
  const synth = useRef<SpeechSynthesis | null>(null)
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synth.current = window.speechSynthesis
      utterance.current = new SpeechSynthesisUtterance()
    }
    return () => {
      if (synth.current) {
        synth.current.cancel()
      }
    }
  }, [])

  const handleStartDemo = () => {
    if (!synth.current || !utterance.current) return
    setIsPlaying(true)
    const startTime = performance.now()
    const text = "Hello, I'm the Voice AI agent. How can I help you today?"
    utterance.current.text = text
    utterance.current.lang = language === "English" ? "en-US" : "en-US"
    const voices = synth.current.getVoices()
    const voice = voices.find((v) => v.lang.includes(language === "English" ? "en" : "en"))
    if (voice) {
      utterance.current.voice = voice
    }
    utterance.current.onstart = () => {
      const endTime = performance.now()
      setLatency(`${Math.round(endTime - startTime)}ms`)
      setMessage(text)
    }
    utterance.current.onend = () => {
      setIsPlaying(false)
    }
    synth.current.speak(utterance.current)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="absolute top-4 left-4">
        {logoError ? (
          <div className="w-[150px] h-[50px] bg-gray-800 rounded flex items-center justify-center">
            <span className="text-sm font-medium">AmeXus</span>
          </div>
        ) : (
          <img
            src="/logo.png"
            alt="AmeXus Logo"
            width={150}
            height={50}
            className="object-contain"
            onError={() => setLogoError(true)}
          />
        )}
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl font-bold">
          Supercharge your <span className="text-green-500">Business with</span>
          <br />
          Custom AI Solutions
        </h1>

        <div className="flex gap-2 mt-4">
          <Button
            variant={agentType === "voice" ? "default" : "outline"}
            className={`rounded-full ${
              agentType === "voice" ? "bg-green-600 hover:bg-green-700" : "bg-transparent hover:bg-gray-800"
            }`}
            onClick={() => setAgentType("voice")}
          >
            Voice Agent
          </Button>
          <Button
            variant={agentType === "data-cleaning" ? "default" : "outline"}
            className={`rounded-full ${
              agentType === "data-cleaning" ? "bg-green-600 hover:bg-green-700" : "bg-transparent hover:bg-gray-800"
            }`}
            onClick={() => setAgentType("data-cleaning")}
          >
            Data Cleaning Agent
          </Button>
        </div>

        <div className="bg-gray-900 rounded-full px-4 py-2 text-sm">
          {agentType === "voice"
            ? "The agent will be able to answer any question using voice AI"
            : "Upload Excel files for automated data cleaning"}
        </div>

        {agentType === "voice" && (
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm text-gray-400">Language</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-40 justify-between bg-transparent border-gray-700">
                    {language} <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("Spanish")}>Spanish</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("French")}>French</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="text-sm text-gray-400">Region</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-40 justify-between bg-transparent border-gray-700">
                    {region} <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setRegion("US")}>US</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion("UK")}>UK</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRegion("EU")}>EU</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {agentType === "voice" ? (
          <PhoneInterface
            onCall={handleStartDemo}
            onEndCall={() => {
              if (synth.current) {
                synth.current.cancel()
                setIsPlaying(false)
              }
            }}
            isCallActive={isPlaying}
            agentType="voice"
          />
        ) : (
          <DataCleaningInterface />
        )}

        {agentType === "voice" && message && <div className="mt-8 text-gray-300 max-w-md">{message}</div>}

        <div className="mt-auto pt-16 flex flex-col items-center gap-4">
          <p className="text-gray-400">Like what you hear?</p>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full bg-transparent border-gray-700 hover:bg-gray-800">
              Get in Touch
            </Button>
            <Button variant="outline" className="rounded-full bg-transparent border-gray-700 hover:bg-gray-800">
              Learn More
            </Button>
          </div>
          {agentType === "voice" && <div className="text-sm text-gray-500 mt-4">Latency: {latency}</div>}
        </div>
      </div>
    </main>
  )
}

