import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST() {
  try {
    const scriptPath = path.join(process.cwd(), "scripts", "voice_assistant", "main.py");
    const pythonProcess = spawn("python3", [scriptPath]);

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    return new Promise((resolve) => {
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          resolve(NextResponse.json({ message: "Call executed", output }));
        } else {
          resolve(NextResponse.json({ error: "Python script failed", details: errorOutput }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
