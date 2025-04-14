import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function GET(req: NextRequest) {
  // Updated the spawn command
  const pythonProcess = spawn("python3", ["-m", "voice_assistant.main"], {
    cwd: path.join(process.cwd(), "scripts"),
  });
  
  const encoder = new TextEncoder();
  let isClosed = false;

  const safeEnqueue = (controller: ReadableStreamDefaultController, data: string) => {
    if (isClosed) return;
    try {
      controller.enqueue(encoder.encode(data));
    } catch (err) {
      console.error("Failed to enqueue:", err);
      isClosed = true;
      controller.close();
    }
  };

  const stream = new ReadableStream({
    start(controller) {
      pythonProcess.stdout.on("data", (data) => {
        data.toString().split("\n").forEach((line: string) => {
          if (line.trim()) {
            safeEnqueue(controller, `data: ${line.trim()}\n\n`);
          }
        });
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("stderr:", data.toString());
        safeEnqueue(controller, `event: error\ndata: ${data.toString()}\n\n`);
      });

      pythonProcess.on("error", (err) => {
        console.error("Python process error:", err);
        safeEnqueue(controller, `event: error\ndata: Python error: ${err.message}\n\n`);
        if (!isClosed) {
          isClosed = true;
          controller.close();
        }
      });

      pythonProcess.on("close", (code) => {
        console.log(`Python exited with code ${code}`);
        safeEnqueue(controller, `event: end\ndata: done\n\n`);
        if (!isClosed) {
          isClosed = true;
          controller.close();
        }
      });

      req.signal.addEventListener("abort", () => {
        console.log("Client aborted connection");
        pythonProcess.kill();
        if (!isClosed) {
          isClosed = true;
          controller.close();
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
