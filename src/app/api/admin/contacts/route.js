// import { dbConnect } from "@/lib/dbCon";
// import Contact from "@/lib/models/Contact";

// export async function GET(request) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (id) {
//       const contact = await Contact.findById(id);
//       return new Response(JSON.stringify({ success: true, data: contact }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     return new Response(JSON.stringify({ success: true, data: contacts }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function PATCH(request) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     const body = await request.json();

//     if (!id) {
//       return new Response(JSON.stringify({ success: false, error: 'Contact ID is required' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const updateData = {};
//     if (body.status) updateData.status = body.status;
//     if (body.notes !== undefined) updateData.notes = body.notes;
//     if (body.response) {
//       updateData.$push = {
//         responses: {
//           message: body.response,
//           sentDate: new Date().toISOString().split("T")[0],
//           sentBy: "Admin",
//         },
//       };
//     }

//     const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
//     if (!contact) {
//       return new Response(JSON.stringify({ success: false, error: 'Contact not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify({ success: true, data: contact }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, error: error.message }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function DELETE(request) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return new Response(JSON.stringify({ success: false, error: 'Contact ID is required' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const deletedContact = await Contact.findByIdAndDelete(id);
//     if (!deletedContact) {
//       return new Response(JSON.stringify({ success: false, error: 'Contact not found' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify({ success: true, message: "Contact deleted successfully" }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }





import { dbConnect } from "@/lib/dbCon";
import Contact from "@/lib/models/Contact";
import nodemailer from "nodemailer";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const contact = await Contact.findById(id);
      return new Response(JSON.stringify({ success: true, data: contact }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, data: contacts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Contact ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updateData = {};
    if (body.status) updateData.status = body.status;
    if (body.priority) updateData.priority = body.priority;
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.response) {
      updateData.$push = {
        responses: {
          message: body.response.message,
          sentDate: body.response.sentDate || new Date().toISOString().split("T")[0],
          sentBy: body.response.sentBy || "Admin",
        },
      };
    }
    updateData.updatedAt = new Date();

    const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
    if (!contact) {
      return new Response(JSON.stringify({ success: false, error: 'Contact not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email if a response is added
    if (body.response) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Portfolio Team" <${process.env.EMAIL_USER}>`,
        to: contact.email,
        subject: `Response to Your Inquiry - ${contact.serviceInterestedIn}`,
        html: `
          <h2>Hello ${contact.fullName},</h2>
          <p>Thank you for reaching out to us regarding your ${contact.serviceInterestedIn} inquiry. We have reviewed your request and have the following response:</p>
          <p><strong>Message:</strong> ${body.response.message}</p>
          <p>We look forward to assisting you further. Please feel free to reply to this email or contact us at ${process.env.EMAIL_USER}.</p>
          <p>Best regards,<br/>The Portfolio Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    return new Response(JSON.stringify({ success: true, data: contact }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Contact ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return new Response(JSON.stringify({ success: false, error: 'Contact not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Contact deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}