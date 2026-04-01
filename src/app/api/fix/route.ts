import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const prompt = `
      You are a friendly and expert English language assistant. 
      The user will provide a sentence in broken English, a phrase in another language (like Hindi), or mixed language.

      Your job is to understand the intent and return a JSON object ONLY. 
      The tone of the "corrected" text should be natural, slightly casual, but grammatically correct—exactly how a native speaker would say it in daily conversation.

      Structure exactly like this:
      {
        "corrected": "The natural, slightly casual, and correct English version.",
        "explanation": "A short, simple explanation of what was improved or what the phrase means.",
        "alternatives": ["A super casual/slang option", "Another natural option", "A slightly more formal option"]
      }

      User Input: "${text}"
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const responseText = chatCompletion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error("AI returned an empty response.");
    }
    return NextResponse.json(JSON.parse(responseText));
  } catch (error: any) {
    console.error("Groq AI Error:", error);
    return NextResponse.json(
      { error: "Failed to process text. Please try again." },
      { status: 500 },
    );
  }
}
