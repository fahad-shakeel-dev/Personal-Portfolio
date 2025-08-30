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

//     const { fullName, email, role, company, quote, rating, avatar } = await request.json();
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
//       avatar: avatar || "",
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

//     const { id, fullName, email, role, company, quote, rating, avatar } = await request.json();
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
//     testimonial.avatar = avatar || testimonial.avatar;

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
//     const user = await User.findById(decoded.userId).select('fullName email role');
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

//     const {
//       name,
//       email,
//       role,
//       company,
//       quote,
//       rating,
//       avatar,
//       category,
//       projectType,
//       projectUrl,
//       tags,
//       status,
//       featured,
//       displayOnPortfolio,
//     } = await request.json();

//     if (!quote || !rating) {
//       return NextResponse.json(
//         { message: "Quote and rating are required" },
//         { status: 400 }
//       );
//     }

//     // Admin can create testimonials without userId
//     let userId = user.role === 'admin' ? null : user._id;
//     if (user.role !== 'admin') {
//       // Check if non-admin user already has a testimonial
//       const existingTestimonial = await Testimonial.findOne({ userId: user._id });
//       if (existingTestimonial) {
//         return NextResponse.json(
//           { message: "You have already submitted a testimonial" },
//           { status: 400 }
//         );
//       }
//     }

//     const testimonial = new Testimonial({
//       userId,
//       name: user.role === 'admin' ? (name || 'Anonymous') : user.fullName,
//       email: user.role === 'admin' ? (email || '') : user.email,
//       role: role || "Customer",
//       company: company || "",
//       quote,
//       rating,
//       avatar: avatar || "",
//       category: category || "web-development",
//       projectType: projectType || "",
//       projectUrl: projectUrl || "",
//       tags: tags || [],
//       status: user.role === 'admin' ? (status || "pending") : "pending",
//       featured: user.role === 'admin' ? (featured || false) : false,
//       displayOnPortfolio: user.role === 'admin' ? (displayOnPortfolio || false) : false,
//       date: new Date(),
//     });

//     await testimonial.save();
//     return NextResponse.json(
//       { message: "Testimonial created successfully", testimonial },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST testimonial error:", error);
//     return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
//   }
// }

// // READ Testimonials (GET)
// export async function GET(request) {
//   await dbConnect();

//   try {
//     const { searchParams } = new URL(request.url);
//     const featured = searchParams.get('featured') === 'true';
//     const all = searchParams.get('all') === 'true';
//     const user = await getUserFromToken(request);

//     let query = {};
//     if (all && user?.role === 'admin') {
//       // Admin can view all testimonials
//       query = {};
//     } else if (featured) {
//       query.featured = true;
//       query.status = 'approved';
//       query.displayOnPortfolio = true;
//     } else if (user) {
//       query.userId = user._id; // Return user's testimonial if authenticated
//     } else {
//       // Public access: only approved and displayed testimonials
//       query.status = 'approved';
//       query.displayOnPortfolio = true;
//     }

//     const testimonials = await Testimonial.find(query)
//       .populate('userId', 'fullName email')
//       .sort({ date: -1 });

//     // Map testimonials to ensure name is always provided
//     const formattedTestimonials = testimonials.map(testimonial => ({
//       ...testimonial.toObject(),
//       name: testimonial.name || testimonial.userId?.fullName || 'Anonymous',
//       approvedDate: testimonial.status === 'approved' ? testimonial.updatedAt.toISOString().split('T')[0] : null,
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

//     const {
//       id,
//       name,
//       email,
//       role,
//       company,
//       quote,
//       rating,
//       avatar,
//       category,
//       projectType,
//       projectUrl,
//       tags,
//       status,
//       featured,
//       displayOnPortfolio,
//     } = await request.json();

//     if (!id) {
//       return NextResponse.json(
//         { message: "Testimonial ID is required" },
//         { status: 400 }
//       );
//     }

//     let testimonial;
//     if (user.role === 'admin') {
//       // Admins can update any testimonial
//       testimonial = await Testimonial.findById(id);
//     } else {
//       // Non-admins can only update their own testimonial
//       testimonial = await Testimonial.findOne({ _id: id, userId: user._id });
//     }

//     if (!testimonial) {
//       return NextResponse.json(
//         { message: "Testimonial not found or not authorized" },
//         { status: 404 }
//       );
//     }

//     // Update fields
//     if (user.role === 'admin') {
//       testimonial.name = name || testimonial.name || 'Anonymous';
//       testimonial.email = email || testimonial.email || '';
//       testimonial.status = status || testimonial.status;
//       testimonial.featured = typeof featured === 'boolean' ? featured : testimonial.featured;
//       testimonial.displayOnPortfolio = typeof displayOnPortfolio === 'boolean' ? displayOnPortfolio : testimonial.displayOnPortfolio;
//     } else {
//       testimonial.name = user.fullName;
//       testimonial.email = user.email;
//     }

//     testimonial.role = role || testimonial.role;
//     testimonial.company = company || testimonial.company;
//     testimonial.quote = quote || testimonial.quote;
//     testimonial.rating = rating || testimonial.rating;
//     testimonial.avatar = avatar || testimonial.avatar;
//     testimonial.category = category || testimonial.category;
//     testimonial.projectType = projectType || testimonial.projectType;
//     testimonial.projectUrl = projectUrl || testimonial.projectUrl;
//     testimonial.tags = tags || testimonial.tags;

//     // Set approvedDate when status changes to 'approved'
//     if (status === 'approved' && testimonial.status !== 'approved') {
//       testimonial.approvedDate = new Date();
//     } else if (status !== 'approved') {
//       testimonial.approvedDate = null;
//     }

//     await testimonial.save();
//     return NextResponse.json(
//       { message: "Testimonial updated successfully", testimonial },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("PUT testimonial error:", error);
//     return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
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

//     let testimonial;
//     if (user.role === 'admin') {
//       // Admins can delete any testimonial
//       testimonial = await Testimonial.findByIdAndDelete(id);
//     } else {
//       // Non-admins can only delete their own testimonial
//       testimonial = await Testimonial.findOneAndDelete({ _id: id, userId: user._id });
//     }

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
import jwt from "jsonwebtoken"; // Ensure jwt is imported
import mongoose from "mongoose";

// Verify authToken and get user
const getUserFromToken = async (request) => {
  const cookies = request.cookies;
  const authToken = cookies.get('authToken')?.value;

  if (!authToken) {
    console.error("No authToken found in cookies");
    return null;
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('fullName email role');
    if (!user) {
      console.error("User not found for ID:", decoded.userId);
      return null;
    }
    return user;
  } catch (error) {
    console.error("Token verification error:", error.message);
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

    const {
      name,
      email,
      role,
      company,
      quote,
      rating,
      avatar,
      category,
      projectType,
      projectUrl,
      tags,
      status,
      featured,
      displayOnPortfolio,
    } = await request.json();

    if (!quote || !rating) {
      return NextResponse.json(
        { message: "Quote and rating are required" },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Validate quote length
    if (quote.length < 10 || quote.length > 1000) {
      return NextResponse.json(
        { message: "Quote must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Admin can create testimonials without userId
    let userId = user.role === 'admin' ? null : user._id;
    if (user.role !== 'admin') {
      // Check if non-admin user already has a testimonial
      const existingTestimonial = await Testimonial.findOne({ userId: user._id });
      if (existingTestimonial) {
        return NextResponse.json(
          { message: "You have already submitted a testimonial" },
          { status: 400 }
        );
      }
    }

    const testimonial = new Testimonial({
      userId,
      name: user.role === 'admin' ? (name || 'Anonymous') : user.fullName,
      email: user.role === 'admin' ? (email || '') : user.email,
      role: role || "Customer",
      company: company || "",
      quote,
      rating,
      avatar: avatar || "",
      category: category || "web-development",
      projectType: projectType || "",
      projectUrl: projectUrl || "",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []),
      status: user.role === 'admin' ? (status || "pending") : "pending",
      featured: user.role === 'admin' ? (featured || false) : false,
      displayOnPortfolio: user.role === 'admin' ? (displayOnPortfolio || false) : false,
      date: new Date(),
      approvedDate: status === 'approved' ? new Date() : null,
    });

    await testimonial.save();
    return NextResponse.json(
      { message: "Testimonial created successfully", testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST testimonial error:", error.message);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
}

// READ Testimonials (GET)
export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const all = searchParams.get('all') === 'true';
    const user = await getUserFromToken(request);

    let query = {};
    if (all && user?.role === 'admin') {
      // Admin can view all testimonials
      query = {};
    } else if (featured) {
      query.featured = true;
      query.status = 'approved';
      query.displayOnPortfolio = true;
    } else if (user) {
      // query.userId = user._id; // Return user's testimonial if authenticated
       query = {
        $or: [
          { userId: user._id }, // User's own testimonial
          { 
            status: 'approved', 
            displayOnPortfolio: true 
          } // Other approved testimonials
        ]
      };
    } else {
      // Public access: only approved and displayed testimonials
      query.status = 'approved';
      query.displayOnPortfolio = true;
    }

    const testimonials = await Testimonial.find(query)
      .populate('userId', 'fullName email')
      .sort({ date: -1 });

    // Map testimonials to ensure consistent response
    const formattedTestimonials = testimonials.map(testimonial => ({
      ...testimonial.toObject(),
      _id: testimonial._id.toString(),
      name: testimonial.name || testimonial.userId?.fullName || 'Anonymous',
      email: testimonial.email || testimonial.userId?.email || '',
      approvedDate: testimonial.approvedDate ? testimonial.approvedDate.toISOString().split('T')[0] : null,
    }));

    return NextResponse.json({ testimonials: formattedTestimonials }, { status: 200 });
  } catch (error) {
    console.error("GET testimonials error:", error.message);
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

    const {
      id,
      name,
      email,
      role,
      company,
      quote,
      rating,
      avatar,
      category,
      projectType,
      projectUrl,
      tags,
      status,
      featured,
      displayOnPortfolio,
    } = await request.json();

    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Valid Testimonial ID is required" },
        { status: 400 }
      );
    }

    let testimonial;
    if (user.role === 'admin') {
      // Admins can update any testimonial
      testimonial = await Testimonial.findById(id);
    } else {
      // Non-admins can only update their own testimonial
      testimonial = await Testimonial.findOne({ _id: id, userId: user._id });
    }

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found or not authorized" },
        { status: 404 }
      );
    }

    // Update fields
    if (user.role === 'admin') {
      testimonial.name = name !== undefined ? name || 'Anonymous' : testimonial.name;
      testimonial.email = email !== undefined ? email || '' : testimonial.email;
      testimonial.status = status !== undefined ? status : testimonial.status;
      testimonial.featured = typeof featured === 'boolean' ? featured : testimonial.featured;
      testimonial.displayOnPortfolio = typeof displayOnPortfolio === 'boolean' ? displayOnPortfolio : testimonial.displayOnPortfolio;
    } else {
      testimonial.name = user.fullName;
      testimonial.email = user.email;
    }

    testimonial.role = role !== undefined ? role || 'Customer' : testimonial.role;
    testimonial.company = company !== undefined ? company || '' : testimonial.company;
    testimonial.quote = quote !== undefined ? quote : testimonial.quote;
    testimonial.rating = rating !== undefined ? rating : testimonial.rating;
    testimonial.avatar = avatar !== undefined ? avatar || '' : testimonial.avatar;
    testimonial.category = category !== undefined ? category || 'web-development' : testimonial.category;
    testimonial.projectType = projectType !== undefined ? projectType || '' : testimonial.projectType;
    testimonial.projectUrl = projectUrl !== undefined ? projectUrl || '' : testimonial.projectUrl;
    testimonial.tags = tags !== undefined ? (Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : [])) : testimonial.tags;

    // Validate rating and quote if provided
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (quote !== undefined && (quote.length < 10 || quote.length > 1000)) {
      return NextResponse.json(
        { message: "Quote must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    // Set approvedDate when status changes to 'approved'
    if (status === 'approved' && testimonial.status !== 'approved') {
      testimonial.approvedDate = new Date();
    } else if (status && status !== 'approved') {
      testimonial.approvedDate = null;
    }

    await testimonial.save();
    return NextResponse.json(
      { message: "Testimonial updated successfully", testimonial },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT testimonial error:", error.message);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
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
    if (!id || !mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Valid Testimonial ID is required" },
        { status: 400 }
      );
    }

    let testimonial;
    if (user.role === 'admin') {
      // Admins can delete any testimonial
      testimonial = await Testimonial.findByIdAndDelete(id);
    } else {
      // Non-admins can only delete their own testimonial
      testimonial = await Testimonial.findOneAndDelete({ _id: id, userId: user._id });
    }

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
    console.error("DELETE testimonial error:", error.message);
    return NextResponse.json({ message: error.message || "Server error" }, { status: 500 });
  }
  
}
