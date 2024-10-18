import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import useLogOut from "../hooks/useLogout.jsx";
// import Groups3RoundedIcon from "@mui/icons-material/Groups3Rounded";
// import { blue } from "@mui/material/colors";

function ForgotPassword() {
  let [email, setEmail] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let { message, token, role, userId } = await AxiosServise.post(
        `${ApiRoutes.FORGOTPASSWORD.path}`,
        { email },
        { authenticate: ApiRoutes.FORGOTPASSWORD.auth }
      );

      toast.success(message);
      navigate("/ResetPassword");
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  //   useEffect(() => {
  //     logout();
  //   }, []);

  return (
    <div className="container-fluid">
      <div className="login-wrapper  pt-3">
        <h2 className="login-head" style={{ textAlign: "center" }}>
          {" "}
          Enter your Email Id{" "}
        </h2>
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
            <Button
              variant="primary"
              className="btn-submit s-small"
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

export default ForgotPassword;
