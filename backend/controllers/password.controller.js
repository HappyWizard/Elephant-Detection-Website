import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const otpStore = {}; // Temporary in-memory store

async function sendEmail({ recipient_email, OTP }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or other email service
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "PASSWORD RECOVERY",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="margin: 50px auto; width: 70%; padding: 20px 0; text-align: center;">
              <h2 style="color: #00466a; display: inline-block; vertical-align: middle; margin: 0;">
                Pompompurin got you covered!
              </h2>
              <img src="cid:emaillogo" alt="Logo" style="display: inline-block; vertical-align: middle; margin-left: 10px; width: 150px; height: auto;">
            </div>
            <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes:</p>
            <div style="text-align: center; padding: 20px 20px;">
              <h2 style="
                  background: #00466a; 
                  color: #fff; 
                  padding: 5px 10px; 
                  border-radius: 4px; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  height: 100px; /* Set the height of the box */
                  margin: 0 auto;">
                  
                  ${OTP}
                  <br>
              </h2>
            </div>

            <p style="font-size:0.9em;">Regards,<br />Mdm Pompompurin</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <p style="color:#aaa;font-size:0.8em;">Mysterious Robots Inc, Malaysia</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "logo.png",
          path: "frontend/src/assets/app-icon.png", // Local file path
          cid: "emaillogo", // Content-ID for referencing the image in the HTML
        },
      ],
    };

    const info = await transporter.sendMail(mail_configs);
    console.log("Email sent:", info.response);
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

// Verify Email and Store OTP
export const verifyEmail = async (req, res) => {
  const { email, OTP } = req.body;
  console.log("Request body:", req.body);

  // Store the OTP in memory (valid for a few minutes)
  otpStore[email] = { OTP, expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 minutes

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    // Store OTP and expiration time (5 minutes)
    oldUser.otp = OTP;
    // oldUser.otpExpires = Date.now() + 5 * 60 * 1000;
    await oldUser.save();

    // Send email
    await sendEmail({ recipient_email: email, OTP });

    return res.send({ status: "ok" });
  } catch (error) {
    console.error("Error in verifyEmail Function:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, OTP } = req.body;
  // console.log(otpStore[email].OTP);
  // console.log(!otpStore[email])
  // console.log(OTP)
  // console.log(!otpStore[email] || otpStore[email].OTP !== OTP)
  try {
    // Check if OTP exists and is valid
    if (otpStore[email].OTP != OTP) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
  
    // OTP verified, remove it from memory
    delete otpStore[email];
  
    return res.json({ status: "ok", message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOTP:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
