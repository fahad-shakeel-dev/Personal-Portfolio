// import { NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbCon";
// import Testimonial from "@/lib/models/Testimonials";
// import User from "@/lib/models/User";
// import jwt from "jsonwebtoken";

// // Verify authToken and get user
// const getUserFromToken = async (request) => {
//   const cookies = request.headers.get('cookie');
//   const authToken = cookies
//     ?.split('; ')
//     .find(row => row.startsWith('authToken='))
//     ?.split('=')[1];

//   if (!authToken) {
//     return null;
//   }

//   try {
//     const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select('fullName email');
//     return user;
//   } catch (error) {
//     return null;
//   }
// };

// // CREATE Testimonial (POST)
// export async function POST(request) {
//   await dbConnect();

//   try {
//     const user = await getUserFromToken(request);
//     if (!user) {
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 });
//     }

//     // Check if user already has a testimonial
//     const existingTestimonial = await Testimonial.findOne({ userId: user._id });
//     if (existingTestimonial) {
//       return NextResponse.json(
//         { message: "You have already submitted a testimonial" },
//         { status: 400 }
//       );
//     }

//     const { fullName, email, role, company, quote, rating } = await request.json();
//     if (!quote || !rating) {
//       return NextResponse.json(
//         { message: "Quote and rating are required" },
//         { status: 400 }
//       );
//     }

//     const testimonial = new Testimonial({
//       userId: user._id,
//       name: user.fullName, // Use user.fullName
//       email: user.email, // Use user.email
//       role: role || "Customer",
//       company: company || "",
//       quote,
//       rating,
//       avatar: "", // Could integrate Gravatar later
//       featured: false, // Admin-controlled
//     });

//     await testimonial.save();
//     return NextResponse.json(
//       { message: "Testimonial created successfully", testimonial },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST testimonial error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// // READ Testimonials (GET)
// export async function GET(request) {
//   await dbConnect();

//   try {
//     const { searchParams } = new URL(request.url);
//     const featured = searchParams.get('featured') === 'true';
//     const user = await getUserFromToken(request);

//     let query = {};
//     if (featured) {
//       query.featured = true;
//     } else if (user) {
//       query.userId = user._id; // Return user's testimonial if authenticated
//     }

//     const testimonials = await Testimonial.find(query)
//       .populate('userId', 'fullName email')
//       .sort({ date: -1 });

//     // Map testimonials to ensure name is always provided
//     const formattedTestimonials = testimonials.map(testimonial => ({
//       ...testimonial.toObject(),
//       name: testimonial.name || testimonial.userId?.fullName || 'Anonymous',
//     }));

//     return NextResponse.json({ testimonials: formattedTestimonials }, { status: 200 });
//   } catch (error) {
//     console.error("GET testimonials error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// // UPDATE Testimonial (PUT)
// export async function PUT(request) {
//   await dbConnect();

//   try {
//     const user = await getUserFromToken(request);
//     if (!user) {
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 });
//     }

//     const { id, fullName, email, role, company, quote, rating } = await request.json();
//     if (!id) {
//       return NextResponse.json(
//         { message: "Testimonial ID is required" },
//         { status: 400 }
//       );
//     }

//     const testimonial = await Testimonial.findOne({ _id: id, userId: user._id });
//     if (!testimonial) {
//       return NextResponse.json(
//         { message: "Testimonial not found or not authorized" },
//         { status: 404 }
//       );
//     }

//     testimonial.name = user.fullName; // Always use user.fullName
//     testimonial.email = user.email; // Always use user.email
//     testimonial.role = role || testimonial.role;
//     testimonial.company = company || testimonial.company;
//     testimonial.quote = quote || testimonial.quote;
//     testimonial.rating = rating || testimonial.rating;

//     await testimonial.save();
//     return NextResponse.json(
//       { message: "Testimonial updated successfully", testimonial },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("PUT testimonial error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// // DELETE Testimonial (DELETE)
// export async function DELETE(request) {
//   await dbConnect();

//   try {
//     const user = await getUserFromToken(request);
//     if (!user) {
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 });
//     }

//     const { id } = await request.json();
//     if (!id) {
//       return NextResponse.json(
//         { message: "Testimonial ID is required" },
//         { status: 400 }
//       );
//     }

//     const testimonial = await Testimonial.findOneAndDelete({ _id: id, userId: user._id });
//     if (!testimonial) {
//       return NextResponse.json(
//         { message: "Testimonial not found or not authorized" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Testimonial deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE testimonial error:", error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }












import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbCon";
import Testimonial from "@/lib/models/Testimonials";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

// Verify authToken and get user
const getUserFromToken = async (request) => {
  const cookies = request.headers.get('cookie');
  const authToken = cookies
    ?.split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  if (!authToken) {
    return null;
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('fullName email');
    return user;
  } catch (error) {
    return null;
  }
};

// CREATE Testimonial (POST)
export async function POST(request) {
  await dbConnect();

  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    // Check if user already has a testimonial
    const existingTestimonial = await Testimonial.findOne({ userId: user._id });
    if (existingTestimonial) {
      return NextResponse.json(
        { message: "You have already submitted a testimonial" },
        { status: 400 }
      );
    }

    const { fullName, email, role, company, quote, rating, avatar } = await request.json();
    if (!quote || !rating) {
      return NextResponse.json(
        { message: "Quote and rating are required" },
        { status: 400 }
      );
    }

    const testimonial = new Testimonial({
      userId: user._id,
      name: user.fullName, // Use user.fullName
      email: user.email, // Use user.email
      role: role || "Customer",
      company: company || "",
      quote,
      rating,
      avatar: avatar || "",
      featured: false, // Admin-controlled
    });

    await testimonial.save();
    return NextResponse.json(
      { message: "Testimonial created successfully", testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// READ Testimonials (GET)
export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const user = await getUserFromToken(request);

    let query = {};
    if (featured) {
      query.featured = true;
    } else if (user) {
      query.userId = user._id; // Return user's testimonial if authenticated
    }

    const testimonials = await Testimonial.find(query)
      .populate('userId', 'fullName email')
      .sort({ date: -1 });

    // Map testimonials to ensure name is always provided
    const formattedTestimonials = testimonials.map(testimonial => ({
      ...testimonial.toObject(),
      name: testimonial.name || testimonial.userId?.fullName || 'Anonymous',
    }));

    return NextResponse.json({ testimonials: formattedTestimonials }, { status: 200 });
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// UPDATE Testimonial (PUT)
export async function PUT(request) {
  await dbConnect();

  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    const { id, fullName, email, role, company, quote, rating, avatar } = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findOne({ _id: id, userId: user._id });
    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found or not authorized" },
        { status: 404 }
      );
    }

    testimonial.name = user.fullName; // Always use user.fullName
    testimonial.email = user.email; // Always use user.email
    testimonial.role = role || testimonial.role;
    testimonial.company = company || testimonial.company;
    testimonial.quote = quote || testimonial.quote;
    testimonial.rating = rating || testimonial.rating;
    testimonial.avatar = avatar || testimonial.avatar;

    await testimonial.save();
    return NextResponse.json(
      { message: "Testimonial updated successfully", testimonial },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT testimonial error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE Testimonial (DELETE)
export async function DELETE(request) {
  await dbConnect();

  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findOneAndDelete({ _id: id, userId: user._id });
    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE testimonial error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}