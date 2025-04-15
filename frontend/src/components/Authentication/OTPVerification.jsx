import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import styles from "./OTPVerification.module.css"; // Assuming the CSS file is inside components folder

export default function OTPVerification() {
  const [email, setEmail] = useState(""); // Store user email
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [timerCount, setTimer] = useState(60);
  const [disable, setDisable] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setEmail(localStorage.getItem("email") || ""); // Retrieve email
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = async () => {
    const enteredOTP = OTPinput.join("");
    if (enteredOTP.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter the complete OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/password/verifyOTP", {
        email,
        OTP: enteredOTP,
      });

      if (response.data.status === "ok") {
        toast({
          title: "Success",
          description: "OTP verified successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        const token ="soweriseofihefhsweoirpsw4u0293856893";
        const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
        // Store the token and expiration time in localStorage
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("tokenExpiration", expirationTime);

        window.location.href = "./"; // Redirect to dashboard
        window.alert("Keep using forgot password feature to enter the website for now, reset password feature is not yet available");

      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Invalid OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleResendOTP = async () => {
    if (disable) return;

    try {
      await axios.post("http://localhost:5000/api/password/verifyEmail", { email });
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setDisable(true);
      setTimer(3000);
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };
  return (
    <div className={styles.otpContainer}>
      <div className={styles.otpCard}>
        <h1>Email Verification</h1>
        <p>
          We have sent a code to your email <strong>{email}</strong>
        </p>
  
        <div className={styles.otpInputs}>
          {OTPinput.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className={styles.otpInput}
              value={digit}
              onChange={(e) => {
                const updatedOTP = [...OTPinput];
                updatedOTP[index] = e.target.value;
                setOTPinput(updatedOTP);
              }}
            />
          ))}
        </div>
  
        <button className={styles.verifyBtn} onClick={handleVerifyOTP}>
          Verify OTP
        </button>
  
        <div className={styles.resendContainer}>
          <p>Didn't receive code?</p>
          <button
            className={`${styles.resendBtn} ${disable ? styles.disabled : ""}`}
            onClick={handleResendOTP}
            disabled={disable}
          >
            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );  
}










// import React from "react";
// import { useState } from "react";
// import { useContext } from "react";
// // import { RecoveryContext } from "../App";

// export default function () {
//   // const { email, otp, setPage } = useContext(RecoveryContext);
//   const email = "efyeh2@nottingham.edu.my";
//   const otp = 2455;
//   const [timerCount, setTimer] = React.useState(60);
//   const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
//   const [disable, setDisable] = useState(true);

//   function resendOTP() {
//     if (disable) return;
//     axios
//       .post("http://localhost:5000/verifyEmail", {
//         OTP: otp,
//         recipient_email: email,
//       })
//       .then(() => setDisable(true))
//       .then(() => alert("A new OTP has succesfully been sent to your email."))
//       .then(() => setTimer(60))
//       .catch(console.log);
//   }

//   // function verfiyOTP() {
//   //   if (parseInt(OTPinput.join("")) === otp) {
//   //     setPage("reset");
//   //     return;
//   //   }
//   //   alert(
//   //     "The code you have entered is not correct, try again or re-send the link"
//   //   );
//   //   return;
//   // }

//   React.useEffect(() => {
//     let interval = setInterval(() => {
//       setTimer((lastTimerCount) => {
//         lastTimerCount <= 1 && clearInterval(interval);
//         if (lastTimerCount <= 1) setDisable(false);
//         if (lastTimerCount <= 0) return lastTimerCount;
//         return lastTimerCount - 1;
//       });
//     }, 1000); //each count lasts for a second
//     //cleanup the interval on complete
//     return () => clearInterval(interval);
//   }, [disable]);
//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-header">
//           <h1>Email Verification</h1>
//           <p>We have sent a code to your email {email}</p>
//         </div>

//         <div className="form-container">
//           <form>
//             <div className="otp-inputs">
//               {[...Array(4)].map((_, index) => (
//                 <input
//                   key={index}
//                   maxLength="1"
//                   className="otp-input"
//                   type="text"
//                   onChange={(e) => {
//                     const updatedOTP = [...OTPinput];
//                     updatedOTP[index] = e.target.value;
//                     setOTPinput(updatedOTP);
//                   }}
//                 />
//               ))}
//             </div>
//             <button className="verify-btn">Verify Account</button>
//             <div className="resend-container">
//               <p>Didn't receive code?</p>
//               <button
//                 className={`resend-btn ${disable ? "disabled" : ""}`}
//                 onClick={() => !disable && console.log("Resend OTP")}
//                 disabled={disable}
//               >
//                 {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
