
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import User from '@/lib/models/User';

// export async function GET(request) {
//   try {
//     // console.log("🔹 Incoming request to /api/auth/check");

//     // Extract authToken from Cookie header
//     const cookies = request.headers.get('cookie');
//     // console.log("🍪 Raw cookies:", cookies);

//     const authToken = cookies
//       ?.split('; ')
//       .find(row => row.startsWith('authToken='))
//       ?.split('=')[1];

//     // console.log("🔑 Extracted authToken:", authToken);

//     if (!authToken) {
//       console.log("❌ No token provided");
//       return NextResponse.json({ message: 'No token provided' }, { status: 401 });
//     }

//     try {
//       // Verify token using jwt.verify
//       const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
//     //   console.log("✅ Decoded token:", decoded);

//       const userId = decoded.userId;
//     //   console.log("👤 UserID from token:", userId);

//       // Fetch user from MongoDB
//       const user = await User.findById(userId).select('-password');
//     //   console.log("📦 User fetched from DB:", user);

//       if (!user) {
//         // console.log("❌ User not found in DB");
//         return NextResponse.json({ message: 'User not found' }, { status: 404 });
//       }

//       // Return user details
//     //   console.log("✅ Authentication successful for user:", user.email);
//       return NextResponse.json({
//         message: 'Authentication successful',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role: user.role,
//           status: user.status,
//         },
//       }, { status: 200 });

//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         console.log("⚠️ Token expired, trying to refresh...");

//         const refreshRes = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
//           method: 'POST',
//           credentials: 'include',
//           headers: { Cookie: cookies || '' },
//         });

//         // console.log("🔄 Refresh token response status:", refreshRes.status);

//         if (refreshRes.ok) {
//           // Extract new authToken from response headers
//           const newCookies = refreshRes.headers.get('set-cookie');
//         //   console.log("🍪 New cookies from refresh:", newCookies);

//           const newAuthToken = newCookies
//             ?.split('; ')
//             .find(row => row.startsWith('authToken='))
//             ?.split('=')[1];

//         //   console.log("🔑 New authToken:", newAuthToken);

//           if (!newAuthToken) {
//             // console.log("❌ Failed to refresh token - no new authToken");
//             return NextResponse.json({ message: 'Failed to refresh token' }, { status: 401 });
//           }

//           // Verify new token
//           const decoded = jwt.verify(newAuthToken, process.env.JWT_SECRET);
//         //   console.log("✅ Decoded refreshed token:", decoded);

//           const userId = decoded.userId;
//         //   console.log("👤 UserID from refreshed token:", userId);

//           // Fetch user from MongoDB
//           const user = await User.findById(userId).select('-password');
//         //   console.log("📦 User fetched after refresh:", user);

//           if (!user) {
//             // console.log("❌ User not found after refresh");
//             return NextResponse.json({ message: 'User not found' }, { status: 404 });
//           }

//           // Return user details with new token in response headers
//         //   console.log("✅ Authentication successful after refresh for user:", user.email);
//           return NextResponse.json({
//             message: 'Authentication successful',
//             user: {
//               id: user._id,
//               name: user.name,
//               email: user.email,
//               phone: user.phone,
//               role: user.role,
//               status: user.status,
//             },
//           }, {
//             status: 200,
//             headers: { 'Set-Cookie': newCookies },
//           });

//         } else {
//         //   console.log("❌ Refresh request failed:", refreshRes.status);
//           return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//         }
//       } else {
//         // console.log("❌ Invalid token error:", error.message);
//         return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//       }
//     }
//   } catch (error) {
//     // console.error("💥 Error in auth check:", error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }






// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import User from '@/lib/models/User';

// export async function GET(request) {
//   try {
//     // Extract authToken from Cookie header
//     const cookies = request.headers.get('cookie');
//     const authToken = cookies
//       ?.split('; ')
//       .find(row => row.startsWith('authToken='))
//       ?.split('=')[1];

//     if (!authToken) {
//       return NextResponse.json({ message: 'No token provided' }, { status: 401 });
//     }

//     try {
//       // Verify token using jwt.verify
//       const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
//       const userId = decoded.userId;

//       // Fetch user from MongoDB
//       const user = await User.findById(userId).select('-password');
//       if (!user) {
//         return NextResponse.json({ message: 'User not found' }, { status: 404 });
//       }

//       // Return user details
//       return NextResponse.json({
//         message: 'Authentication successful',
//         user: {
//           id: user._id,
//           fullName: user.fullName,
//           email: user.email,
//           isVerified: user.isVerified,
//           isActive: user.isActive,
//         },
//       }, { status: 200 });

//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         const refreshRes = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
//           method: 'POST',
//           credentials: 'include',
//           headers: { Cookie: cookies || '' },
//         });

//         if (refreshRes.ok) {
//           // Extract new authToken from response headers
//           const newCookies = refreshRes.headers.get('set-cookie');
//           const newAuthToken = newCookies
//             ?.split('; ')
//             .find(row => row.startsWith('authToken='))
//             ?.split('=')[1];

//           if (!newAuthToken) {
//             return NextResponse.json({ message: 'Failed to refresh token' }, { status: 401 });
//           }

//           // Verify new token
//           const decoded = jwt.verify(newAuthToken, process.env.JWT_SECRET);
//           const userId = decoded.userId;

//           // Fetch user from MongoDB
//           const user = await User.findById(userId).select('-password');
//           if (!user) {
//             return NextResponse.json({ message: 'User not found' }, { status: 404 });
//           }

//           // Return user details with new token in response headers
//           return NextResponse.json({
//             message: 'Authentication successful',
//             user: {
//               id: user._id,
//               fullName: user.fullName,
//               email: user.email,
//               isVerified: user.isVerified,
//               isActive: user.isActive,
//             },
//           }, {
//             status: 200,
//             headers: { 'Set-Cookie': newCookies },
//           });

//         } else {
//           return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//         }
//       } else {
//         return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//       }
//     }
//   } catch (error) {
//     console.error("Error in auth check:", error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }







import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';

export async function GET(request) {
  try {
    // Extract authToken from Cookie header
    const cookies = request.headers.get('cookie');
    console.log(`[AuthCheck] Cookies received: ${cookies || 'None'}`); // Debug
    const authToken = cookies
      ?.split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (!authToken) {
      console.log('[AuthCheck] No authToken provided');
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
      // Verify token using jwt.verify
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      console.log(`[AuthCheck] Decoded token: ${JSON.stringify({ userId: decoded.userId })}`); // Debug
      const userId = decoded.userId;

      // Fetch user from MongoDB
      const user = await User.findById(userId).select('-password');
      if (!user) {
        console.log(`[AuthCheck] User not found for ID: ${userId}`);
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      // Log user details
      console.log(`[AuthCheck] User found: ${JSON.stringify({
        id: user._id,
        email: user.email,
        role: user.role
      })}`); // Debug

      // Return user details including role
      return NextResponse.json({
        message: 'Authentication successful',
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isVerified: user.isVerified,
          isActive: user.isActive,
          role: user.role,
        },
      }, { status: 200 });

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('[AuthCheck] Token expired, attempting refresh');
        const refreshRes = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { Cookie: cookies || '' },
        });

        if (refreshRes.ok) {
          // Extract new authToken from response headers
          const newCookies = refreshRes.headers.get('set-cookie');
          const newAuthToken = newCookies
            ?.split('; ')
            .find(row => row.startsWith('authToken='))
            ?.split('=')[1];

          if (!newAuthToken) {
            console.log('[AuthCheck] Failed to extract new authToken');
            return NextResponse.json({ message: 'Failed to refresh token' }, { status: 401 });
          }

          // Verify new token
          const decoded = jwt.verify(newAuthToken, process.env.JWT_SECRET);
          console.log(`[AuthCheck] New token decoded: ${JSON.stringify({ userId: decoded.userId })}`); // Debug
          const userId = decoded.userId;

          // Fetch user from MongoDB
          const user = await User.findById(userId).select('-password');
          if (!user) {
            console.log(`[AuthCheck] User not found for new token ID: ${userId}`);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
          }

          // Log user details
          console.log(`[AuthCheck] User found after refresh: ${JSON.stringify({
            id: user._id,
            email: user.email,
            role: user.role
          })}`); // Debug

          // Return user details including role with new token in response headers
          return NextResponse.json({
            message: 'Authentication successful',
            user: {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
              isVerified: user.isVerified,
              isActive: user.isActive,
              role: user.role,
            },
          }, {
            status: 200,
            headers: { 'Set-Cookie': newCookies },
          });

        } else {
          console.log('[AuthCheck] Token refresh failed');
          return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
      } else {
        console.log(`[AuthCheck] Token verification error: ${error.message}`);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }
  } catch (error) {
    console.error('[AuthCheck] Error:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}