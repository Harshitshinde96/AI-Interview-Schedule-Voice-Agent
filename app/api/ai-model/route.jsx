import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    console.log(completion.choices[0].message);

    return NextResponse.json(completion.choices[0].message);
    // Ensure we always return a consistent format
    // return NextResponse.json({
    //   success: true,
    //   content: completion.choices[0]?.message?.content || "",
    //   error: null,
    // });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        content: null,
        error: error.message || "Failed to generate questions",
      },
      { status: error.status || 500 }
    );
  }
}

// Free Ai Models ->
// 1)deepseek/deepseek-chat-v3-0324:free
// 2)google/gemini-2.0-flash-exp:free
// 3)deepseek/deepseek-r1-0528:free
// 4)openrouter/horizon-alpha
// 5)z-ai/glm-4.5-air:free
