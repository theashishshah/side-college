import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";

export async function POST(request: Request) {
  await dbConnect();
  // console.log("DB is connected in verify-email-code file");

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    // console.log(decodedUsername)

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }

    // if we get the user then code should be the same and expiry should be more than the current time

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        {
          status: 200,
        }
      );
      
    }

    // if code time excceds the time
    if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code is expired, please get new one and come again here. Thank you.",
        },
        {
          status: 400,
        }
      );
    }
    
    // if code is invalid
    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid code, Please provide correct code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    // console.log("Error while verifying the code", error);

    return Response.json(
      {
        success: false,
        message: "Error while verifying the code",
      },
      {
        status: 500,
      }
    );
  }
}
