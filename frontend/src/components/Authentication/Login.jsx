import React, { useState, useEffect } from "react";
import styles from "./Login.module.css"; // Assuming the CSS file is inside components folder
import { useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode"; // You need to install this library to decode the JWT
import PasswordToggle from "./PasswordToggle";

const Login = () => {
  const [PasswordInputType, TogglePasswordIcon] = PasswordToggle();
  const [inputFocused, setInputFocused] = useState(false); // Track input focus state
  const [toggleClicked, setToggleClicked] = useState(false); // Track toggle icon click state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast(); // Chakra UI's toast hook

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false); // Only blur if the toggle isn't clicked
  };

  const handleToggleClick = (e) => {
    e.preventDefault(); // Prevents focus from leaving the input when clicking the toggle
    setToggleClicked(false); // Toggle the clicked state
  };

  // Load saved credentials if "Remember Me" was previously checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe && savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for login (could add API calls here)
    console.log({ email, password });

    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
        if (data.status == "ok") {
          // alert("login successful")

          const token = data.data;
          const decodedToken = jwtDecode(token); // Decode the token to get expiration time
          const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

          // Store the token and expiration time in localStorage
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("tokenExpiration", expirationTime);

          // Save token based on "Remember Me" selection
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.setItem("rememberMe", "false");
          }

          toast({
            title: "Success",
            description: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          window.location.href = "./"; // transfer me to the home page
        } else if (data.error === "User Not Found") {
          toast({
            title: "Error",
            description: "User Not Found",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (data.error === "Password Incorrect") {
          toast({
            title: "Error",
            description: "Password Incorrect",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
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
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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

            <div
              className={`${styles["input-box"]} ${styles["password-input-box"]}`}
            >
              <span className={`${styles.icon} ${styles["icon-wrapper"]}`}>
                <div
                  className={styles.toggleIcon}
                  onMouseDown={handleToggleClick} // Handle toggle button click
                  style={{
                    visibility:
                      inputFocused || toggleClicked ? "visible" : "hidden", // Control visibility based on both states
                  }}
                >
                  {TogglePasswordIcon}
                </div>
                <div>
                  <ion-icon name="lock-closed"></ion-icon>
                </div>
              </span>
              <input
                type={PasswordInputType}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus} // Handle input focus
                onBlur={handleBlur} // Handle input blur
              />
              <label>Password</label>
            </div>

            <div className={styles["remember-forgot"]}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                &nbsp; Remember me
              </label>
              <a href="forgotpassword">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.btn}>
              Login
            </button>

            <div className={styles["login-register"]}>
              <p>
                Don't have an account?{" "}
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

export default Login;
