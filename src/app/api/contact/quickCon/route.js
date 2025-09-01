import QuickContact from "@/lib/models/QuicCon"
import { dbConnect } from "@/lib/dbCon"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    await dbConnect()
    const body = await req.json()
    const contact = new QuickContact(body)
    await contact.save()

    return NextResponse.json({ message: "Quick contact saved!" }, { status: 201 })
  } catch (err) {
    console.error("POST /api/contact/quickCon error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()
    const contacts = await QuickContact.find().sort({ createdAt: -1 })
    return NextResponse.json({ contacts }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
