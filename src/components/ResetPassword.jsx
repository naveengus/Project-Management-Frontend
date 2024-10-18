import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("Sending request to:", ApiRoutes.RESETPASSWORD.path);
      console.log("Request data:", { OTP, password });

      const { message, token, role } = await AxiosServise.post(
        ApiRoutes.RESETPASSWORD.path,
        { OTP, password },
        { authenticate: ApiRoutes.RESETPASSWORD.auth }
      );

      console.log("Response data:", { message, token, role });
      toast.success(message);
      navigate("/login");
    } catch (error) {
      //   console.error("Error:", error);
      toast.error(error.message || "Internal Server Error");
    }
  };

  return (
    <div className="container-fluid">
      <div className="login-wrapper pt-3">
        <h2 className="login-head" style={{ textAlign: "center" }}>
          Reset Your Password
        </h2>
        <div className="form-wrapper">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Label className="form-label">Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="form-label">Enter New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
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
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
