
import { dbConnect } from "@/lib/dbCon";
import Contact from "@/lib/models/Contact";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "phoneNumber",
      "companyName",
      "serviceInterestedIn",
      "projectBudget",
      "projectDetails",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ success: false, error: `${field} is required` }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate projectBudget format (e.g., "15000 PKR")
    const budgetMatch = body.projectBudget.match(/^(\d+\.?\d*)\s*(PKR|USD|INR|EUR|GBP)$/);
    if (!budgetMatch) {
      return new Response(JSON.stringify({ success: false, error: "Invalid project budget format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const amount = parseFloat(budgetMatch[1]);
    const currency = budgetMatch[2];
    const minBudgets = {
      PKR: 15000,
      USD: 54,
      INR: 4500,
      EUR: 48,
      GBP: 41,
    };
    if (amount < minBudgets[currency]) {
      return new Response(
        JSON.stringify({ success: false, error: `Budget must be at least ${minBudgets[currency]} ${currency}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create new contact
    const newContact = new Contact({
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      companyName: body.companyName,
      serviceInterestedIn: body.serviceInterestedIn,
      projectBudget: body.projectBudget,
      projectDetails: body.projectDetails,
      createdAt: body.createdAt || new Date(),
      updatedAt: body.updatedAt || new Date(),
      status: "pending",
      priority: "medium",
      source: "website",
      notes: "",
      responses: [],
    });

    await newContact.save();

    return new Response(JSON.stringify({ success: true, data: newContact }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}