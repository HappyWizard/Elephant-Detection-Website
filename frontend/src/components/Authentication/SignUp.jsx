import React, { useState } from 'react';
import styles from './SignUp.module.css'; // You can use the same or a similar CSS as Login.css
import { useToast } from '@chakra-ui/react'
import PasswordToggle from './PasswordToggle';

const SignUp = () => {
  const [PasswordInputType, TogglePasswordIcon] = PasswordToggle();
  const [inputFocused, setInputFocused] = useState(false); // Track input focus state
  const [toggleClicked, setToggleClicked] = useState(false); // Track toggle icon click state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic for sign-up (API call)
    console.log({ username, email, password });

    fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      crossDomain: true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:JSON.stringify({
        userName:username,
        email:email,
        password:password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userSignUp")
        if (data.status=="ok"){
          // alert("signup successful")
          toast({
            title: "Success",
            description: "Sign Up Successful", 
            status: "success",
            duration: 5000,
            isClosable: true,
          })

        }else if (data.error === "User Already Exists") {
          toast({
            title: "Error",
            description: "User Already Exists",
            status: "error",
            duration: 5000,
            isClosable: true,
          });

        }else {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
  };

  return (
    <div className={styles['outer-body']}>
      <div className={styles.wrapper}>
        <div className={`${styles['form-box']} ${styles.register}`}>
          <h2>Registration</h2>
          <form onSubmit={handleSignUp}>

            <div className={styles['input-box']}>
              <span className={styles.icon}>
                <ion-icon name="person"></ion-icon>
              </span>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <label>Username</label>
            </div>

            <div className={styles['input-box']}>
              <span className={styles.icon}>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={`${styles[email.length > 0 ? 'hasValue' : '']} `}
              />
              <label>Email</label>
            </div>

            <div className={`${styles['input-box']} ${styles['password-input-box']}`}>
              <span className={`${styles.icon} ${styles['icon-wrapper']}`}>
                <div
                  className={styles.toggleIcon} 
                  onMouseDown={handleToggleClick} // Handle toggle button click
                  style={{
                    visibility: inputFocused || toggleClicked ? 'visible' : 'hidden', // Control visibility based on both states
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

            <div className={styles['remember-forgot']}>

            </div>

            <button type="submit" className={styles.btn}>Sign Up</button>

            <div className={styles['login-register']}>
              <p className={styles['light-font-color']} >Already have an account? <a href="login" className={`${styles['register-link']} ${styles['light-font-color']}`}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
