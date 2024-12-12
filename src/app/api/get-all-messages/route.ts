import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";


// backend to bring all messages to user
export async function GET(request: Request) {
  await dbConnect();

  console.log("DB is connected in all message backend file");
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated user is accessing",
      },
      { status: 404 }
    );
  }
  //now it is mongoose object id, not normal string
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if(!user || user.length === 0){
        return Response.json(
          {
            success: false,
            message: "User not found.",
          },
          { status: 401 }
        );
    }

    return Response.json(
      {
        success: true,
        message: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error got while bringing all the messages for a user", error)
    return Response.json(
      {
        success: false,
        message: "User doesn't exist.",
      },
      { status: 404 }
    );
  }
}
