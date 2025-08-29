import mongoose from 'mongoose';
import User from '@/lib/models/User';
import { dbConnect } from '@/lib/dbCon';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('searchTerm') || '';
  const role = searchParams.get('role') || 'all';

  try {
    const query = {};

    if (searchTerm) {
      query.$or = [
        { fullName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    const users = await User.find(query)
      .select('fullName email role isActive createdAt updatedAt')
      .lean();

    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      role: user.role,
      status: user.isActive ? 'active' : 'inactive',
      joinDate: user.createdAt.toISOString().split('T')[0],
      lastLogin: user.updatedAt.toISOString().split('T')[0],
      avatar: '/diverse-user-avatars.png',
    }));

    return new Response(JSON.stringify({ success: true, data: formattedUsers }), {
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

export async function POST(req) {
  await dbConnect();
  try {
    const { name, email, role, status } = await req.json();

    if (!name || !email || !role) {
      return new Response(JSON.stringify({ success: false, error: 'Name, email, and role are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, error: 'Email already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = new User({
      fullName: name,
      email,
      role,
      isActive: status === 'active',
    });

    await user.save();

    const formattedUser = {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      role: user.role,
      status: user.isActive ? 'active' : 'inactive',
      joinDate: user.createdAt.toISOString().split('T')[0],
      lastLogin: user.updatedAt.toISOString().split('T')[0],
      avatar: '/diverse-user-avatars.png',
    };

    return new Response(JSON.stringify({ success: true, data: formattedUser }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const { id, name, email, role, status } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    user.fullName = name || user.fullName;
    user.email = email || user.email;
    user.role = role || user.role;
    user.isActive = status ? status === 'active' : user.isActive;

    await user.save();

    const formattedUser = {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      role: user.role,
      status: user.isActive ? 'active' : 'inactive',
      joinDate: user.createdAt.toISOString().split('T')[0],
      lastLogin: user.updatedAt.toISOString().split('T')[0],
      avatar: '/diverse-user-avatars.png',
    };

    return new Response(JSON.stringify({ success: true, data: formattedUser }), {
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

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  try {
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'User deleted successfully' }), {
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