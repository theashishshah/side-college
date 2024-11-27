import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  console.log("DB is connected in signup route file.");

  try {
    const { email, username, name, password } = await request.json();

    // check user's email already exist in the database
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists.",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // we've found the user but it is not verified yet? then what to do?
      if(existingUserByEmail.isVerified){
        return NextResponse.json(
          {
            success: false,
            message: "User already exist with this email, Please use another email",
          },
          { status: 400 }
        );
      } else{
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

       await existingUserByEmail.save()
      }
    } else {
      // const salt = bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    // now user is saved in our database, then send verification mail
    const emailResponse = await sendVerificationEmail(email, username, verifyCode)

    console.log("What we've got data from sendVerificationEmail in signup route file",emailResponse)

    if(!emailResponse.success){
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message
        }, {status: 500}
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully, Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while signing the user in signup route file", error);

    return NextResponse.json(
      {
        success: false,
        textMessage:
          "Can't sign in new user into the database, in signup route file",
      },
      { status: 500 }
    );
  }
}
