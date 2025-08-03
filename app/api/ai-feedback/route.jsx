import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation || conversation.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Empty conversation provided",
          content: null,
        },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    const response = completion.choices[0].message;

    // Extract JSON content if it's wrapped in markdown code blocks
    let content = response.content;
    const jsonMatch = content.match(/```json([\s\S]*?)```/);
    if (jsonMatch) content = jsonMatch[1].trim();

    return NextResponse.json({
      success: true,
      content: content ? JSON.parse(content) : response.content,
      error: null,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        content: null,
        error: error.message || "Failed to generate Feedback",
      },
      { status: 500 }
    );
  }
}

// Free Ai Models ->
// 1)deepseek/deepseek-chat-v3-0324:free
// 2)google/gemini-2.0-flash-exp:free
// 3)deepseek/deepseek-r1-0528:free
// 4)openrouter/horizon-alpha
// 5)z-ai/glm-4.5-air:free
