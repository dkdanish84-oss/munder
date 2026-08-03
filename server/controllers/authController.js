import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateOTP } from "../utils/otp.js";

const otpStore = new Map();

export const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number required",
      });
    }

    const otp = generateOTP();
    otpStore.set(mobile, otp);

    const response = await axios.post(
      "https://apitxt.com/api/sendOTP",
      new URLSearchParams({
        authkey: process.env.APITXT_AUTHKEY,
        mobile,
        otp,
        channel: "sms",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log(response.data);

    res.json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "OTP Sending Failed",
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const savedOTP = otpStore.get(mobile);

    if (savedOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpStore.delete(mobile);

    let user = await User.findOne({ phone: mobile });

    if (!user) {
      user = await User.create({
        phone: mobile,
        provider: "mobile",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        phone: user.phone,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

