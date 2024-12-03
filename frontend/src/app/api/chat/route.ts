import { POST as postPrompt } from "./postPrompt";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return postPrompt(req);
}
