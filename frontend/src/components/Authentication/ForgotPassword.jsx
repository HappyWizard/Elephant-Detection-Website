import React, { useState } from "react";
import styles from "./ForgotPassword.module.css"; // Assuming the CSS file is inside components folder
import { useToast } from "@chakra-ui/react";
import { RiLockPasswordLine } from "react-icons/ri";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast(); // Chakra UI's toast hook

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    console.log(`Your OTP: ${OTP}`);
  
    fetch("http://localhost:5000/api/password/verifyEmail", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        OTP: OTP,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // Store email in localStorage before redirecting
          localStorage.setItem("email", email);
          
          toast({
            title: "Success",
            description: "OTP Sent Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
  
          // Redirect to OTP verification page
          window.location.href = "./enterOTP";
        } else if (data.error === "Email Does not Exist") {
          toast({
            title: "Error",
            description: "Email Does not Exist",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "Something else went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };
  
  return (
    <div className={styles["outer-body"]}>
      <div className={styles.wrapper}>
        <div className={`${styles["form-box"]} ${styles.login}`}>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.lockIconDiv}>
              <RiLockPasswordLine size={100} color="#20314d" />
            </div>

            <div className={styles["login-register"]}>
              <p>
                Enter your email and we'll send an OTP to verify your account
              </p>
            </div>

            <div className={styles["input-box"]}>
              <span className={styles.icon}>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${styles[email.length > 0 ? "hasValue" : ""]} `}
              />
              <label>Email</label>
            </div>

            <button type="submit" className={styles.btn}>
              Submit
            </button>

            <div className={styles["login-register"]}>
              <p>
                Go back to{" "}
                <a href="login" className={styles["register-link"]}>
                  Login
                </a>{" "}
                or{" "}
                <a href="signup" className={styles["register-link"]}>
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
