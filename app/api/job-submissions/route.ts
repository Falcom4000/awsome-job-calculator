import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SubmissionPayload = {
  inputs?: unknown;
  result?: unknown;
};

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;
  return request.headers.get("x-real-ip") ?? request.headers.get("cf-connecting-ip");
}

async function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  const { neon } = await import("@neondatabase/serverless");
  return neon(databaseUrl);
}

export async function POST(request: Request) {
  let payload: SubmissionPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload.inputs || typeof payload.inputs !== "object") {
    return NextResponse.json({ error: "Missing inputs" }, { status: 400 });
  }

  const sql = await getSql();
  if (!sql) {
    return NextResponse.json({ stored: false, reason: "DATABASE_URL is not configured" }, { status: 202 });
  }

  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent");
  const referer = request.headers.get("referer");

  await sql`
    CREATE TABLE IF NOT EXISTS job_submissions (
      id BIGSERIAL PRIMARY KEY,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      ip_address TEXT,
      user_agent TEXT,
      referer TEXT,
      inputs JSONB NOT NULL,
      result JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const rows = await sql`
    INSERT INTO job_submissions (ip_address, user_agent, referer, inputs, result)
    VALUES (${ip}, ${userAgent}, ${referer}, ${JSON.stringify(payload.inputs)}::jsonb, ${JSON.stringify(payload.result ?? null)}::jsonb)
    RETURNING id, submitted_at
  `;

  return NextResponse.json({ stored: true, submission: rows[0] });
}
