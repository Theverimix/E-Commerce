import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { userLogin } from "../../controller/loginController";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../providers/ToastProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const showToast = useToast();

  const handleLogin = async () => {
    if (await userLogin(username, password)) {
      showToast("success", "Success", "¡Login successfully!");
      navigate(`/`);
    } else {
      showToast("error", "Error", "¡Login error!");
    }
  };

  return (
    <>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <span className="p-float-label">
          <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="username">Email</label>
        </span>
      </div>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-key"></i>
        </span>
        {/* <InputText placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
        <span className="p-float-label">
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            tabIndex={1}
            toggleMask
            className="p-pass-field"
          />
          <label htmlFor="password">Password</label>
        </span>
      </div>
      <Button label="Log in" onClick={handleLogin} />
    </>
  );
}