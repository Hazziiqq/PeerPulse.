/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_KEY) {
      throw new Error("Missing GEMINI_KEY environment variable.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const data = await req.json();
    const prompt = data.body;
    console.log("Received data:", data); 

    if (!prompt || typeof prompt !== "string") {
      throw new Error("Invalid or missing 'body' in request.");
    }

    const result = await model.generateContent(prompt);
    console.log("Generated content:", result);  // Log the full result
    const output = result.response;  // Confirm structure with API documentation

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: error.message.includes("Invalid or missing") ? 400 : 500 }
    );
  }
}
