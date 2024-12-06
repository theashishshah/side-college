import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";


// function to toggle to message accepting status
export async function POST(request: Request) {
  await dbConnect();
  console.log("Db is connected in accept message route in POST function.");

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated user",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessage } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessage },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accept messages.",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "User updated for accepting message is successfull.",
          updatedUser,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("failed to update user status to accept messages.", error);
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages.",
      },
      { status: 500 }
    );
  }
}

// function to check isAcceptingMessage
export async function GET(request: Request) {
  await dbConnect();
  console.log("Db is connected in accept message route in GET function.");

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated user",
      },
      { status: 401 }
    );
  }
  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
        message: "Found user.",
        foundUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error getting is accepting message status.", error);
    return Response.json(
      {
        success: false,
        message: "Error getting is accepting message status.",
      },
      { status: 500 }
    );
  }
}


