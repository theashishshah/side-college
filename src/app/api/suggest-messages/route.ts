import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); // Accept prompt dynamically
    const response = await fetch("https://api.gemini.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // Replace with your Gemini API key
      },
      body: JSON.stringify({
        model: "gemini-large", // Replace with the appropriate Gemini model
        prompt,
        max_tokens: 400,
        stream: true, // Adjust based on Gemini's streaming support
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return NextResponse.json(errorBody, { status: response.status });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
