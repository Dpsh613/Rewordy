import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// handling cors preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const prompt = `
      You are a friendly but highly accurate, context -aware language assistant. 

      The user may provide :
        - Broken or incorrect English
        - A phrase in another language (like Hindi, Hinglish or mixed language.)
        - A mix of English + another language 

      Your job:
      1. Detect the language(s) and fully understand the intended meaning.
      2. If any part is not in English, FIRST internally translate it to English.
      3. Then rewrite the FULL sentence into natura;, flaunr, everyday English.
      4. Preserve the original intent, tone, and context -  DO NOT CHANGE MEANING.
      5. Make the corrected sentence sound like how a native speaker would casually say it.
    
      STRICT RULES: 
       - NEVER ignore non-English words or phrases - ALWAYS interpret and translate them.
       - Never output partial understanding - resoloe the FULL meaning before answering.
       - Never add extra information or assumptions beyond the user's intent.
       - Keep the tone natural, slightly casual, and conversational (not Robotic or overly format)
       - Keep explantion short, clear and easy to undersand. 


      Output format (MUST be valid JSON, no extra text before or after):
      {
        "corrected": "The natural, fluent, slightly casual, and correct English version of the FULL input.",
        "explanation": "A short, simple explanation of what was improved or what the phrase means",
        "alternatives": ["A super casual/slang option", "Another natural variation", "A slightly more formal option"]
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

    // FIX: The headers object is now the second argument of NextResponse.json()
    return NextResponse.json(JSON.parse(responseText), {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Groq AI Error:", error);
    return NextResponse.json(
      { error: "Failed to process text. Please try again." },
      { status: 500 },
    );
  }
}
