// "use client"

// import { useState, useEffect, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Mic, MicOff, Volume2 } from "lucide-react"

// interface VoiceControlsProps {
//   onSpeechResult?: (text: string) => void
// }

// export function VoiceControls({ onSpeechResult }: VoiceControlsProps) {
//   const [isListening, setIsListening] = useState(false)
//   const recognitionRef = useRef<SpeechRecognition | null>(null)

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Initialize speech recognition
//       const SpeechRecognition: SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//       if (SpeechRecognition) {
//         recognitionRef.current = new SpeechRecognition()
//         recognitionRef.current.continuous = true
//         recognitionRef.current.interimResults = true

//         recognitionRef.current.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map((result) => result[0])
//             .map((result) => result.transcript)
//             .join("")

//           if (onSpeechResult && event.results[0].isFinal) {
//             onSpeechResult(transcript)
//           }
//         }

//         recognitionRef.current.onerror = (event) => {
//           console.error("Speech recognition error", event.error)
//           setIsListening(false)
//         }

//         recognitionRef.current.onend = () => {
//           setIsListening(false)
//         }
//       }
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }
//     }
//   }, [onSpeechResult])

//   const toggleListening = () => {
//     if (!recognitionRef.current) return

//     if (isListening) {
//       recognitionRef.current.stop()
//       setIsListening(false)
//     } else {
//       recognitionRef.current.start()
//       setIsListening(true)
//     }
//   }

//   return (
//     <div className="flex gap-2">
//       <Button
//         variant="outline"
//         size="icon"
//         className={`rounded-full ${isListening ? "bg-green-600 text-white" : "bg-transparent"}`}
//         onClick={toggleListening}
//       >
//         {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
//       </Button>
//       <Button variant="outline" size="icon" className="rounded-full bg-transparent">
//         <Volume2 className="h-5 w-5" />
//       </Button>
//     </div>
//   )
// }

