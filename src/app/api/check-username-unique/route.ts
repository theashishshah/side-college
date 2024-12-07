import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextResponse } from "next/server";

// this route for checking if particular username is available or not?

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);

    console.log(result); //TODO:remove

    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];

      return NextResponse.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(",")
              : "Invalid Query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "username is already taken" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Username is available" },
      { status: 400 }
    );
  } catch (error) {
    console.log(
      "Error while checking username if the particular username already exists or not",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Error while checking username",
      },
      {
        status: 500,
      }
    );
  }
}
