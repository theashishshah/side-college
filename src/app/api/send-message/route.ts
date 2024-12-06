import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { Message } from "@/models/userModel";

export async function POST(request: Request) {
  await dbConnect();
  console.log("DB is connected in send message route file");

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Internal server error while finding user.",
        },
        { status: 500 }
      );
    }

    // is user accepting the messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "Sorry, you can't send message. Try again later.",
        },
        { status: 403 }
      );
    }

    // craft new message and then push it into the user's data
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Feedback sent successfully.",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Something went wrong while finding your receptive. It's not your fault, its on us.",
      error
    );
    return Response.json(
      {
        success: false,
        message: "Not able to find Receptive",
      },
      { status: 500 }
    );
  }
}
