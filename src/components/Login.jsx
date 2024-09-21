import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLogOut from "../hooks/useLogout.jsx";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let logout = useLogOut();

  const handleSubmit = async () => {
    try {
      let { message, token, role, userId } = await AxiosServise.post(
        `${ApiRoutes.LOGIN.path}`, // Ensure this is an endpoint on your server
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
      <div className="login-wrapper  pt-5">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="btn-submit"
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
