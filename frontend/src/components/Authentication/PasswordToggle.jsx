import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const PasswordToggle = () => {
  const [visible, setVisibility] = useState(false);
  const Icon = visible ? <FaEye onClick={() => setVisibility(visibility => !visibility)}/> : <FaEyeSlash onClick={() => setVisibility(visibility => !visibility)}/>;

  const InputType = visible ? "text" : "password";

  return [InputType, Icon]
};

export default PasswordToggle;
