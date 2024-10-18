import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLogOut from "../hooks/useLogout.jsx";
import Groups3RoundedIcon from "@mui/icons-material/Groups3Rounded";
import { blue } from "@mui/material/colors";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let logout = useLogOut();

  const handleSubmit = async () => {
    try {
      let { message, token, role, userId } = await AxiosServise.post(
        `${ApiRoutes.LOGIN.path}`,
        { email, password },
        { authenticate: ApiRoutes.LOGIN.auth }
      );

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("userId", userId);

      toast.success(message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="container-fluid">
      <div className="login-wrapper  pt-3">
        <div className="logo-name">
          <Groups3RoundedIcon
            // fontSize="medium"
            sx={{ fontSize: 50 }}
            className="userlogo"
          />
          <p>Project-Tracker</p>
        </div>
        <h1 className="login-head" style={{ textAlign: "center" }}>
          {" "}
          Login{" "}
        </h1>
        <div className="form-wrapper">
          <Form>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <a
              className="forgot-password mb-2"
              href="#"
              onClick={(e) => {
                e.preventDefault();

                navigate("/ForgotPassword");
              }}
            >
              {" "}
              Forgot Password?
            </a>
            <br></br>
            <Button
              variant="primary"
              className="btn-submit mt-3"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <div className="loginp">
              <p>
                Don't have an account ?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                >
                  {" "}
                  Sign Up
                </a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
