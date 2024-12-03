import { NextResponse } from "next/server";
import { ChatPrompt } from "@/types";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function POST(req: Request) {
  try {
    const message: ChatPrompt = await req.json();

    if (!message || !message.message) {
      return NextResponse.json({ message: "BAD REQUEST" }, { status: 400 });
    }

    const prompt = `
    Respond to this:

    ${message.message}`;

    const body = JSON.stringify({
      prompt: prompt,
      max_gen_len: 150,
      temperature: 0.3,
      top_p: 0.7,
    });

    const response = await fetch(
      process.env.NEXT_PUBLIC_BEDROCK_API_URL || "",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch response from Bedrock API" },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    let responseText = responseData.generation;

    return NextResponse.json({ data: responseText }, { status: 200 });
  } catch (error) {
    console.error("Error posting prompt:", error);

    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
