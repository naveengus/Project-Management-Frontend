import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";

function ViewProject() {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [category, setCategory] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const [status, setStatus] = useState("");

  let { projectId } = useParams();
  let role = sessionStorage.getItem("role");
  let navigate = useNavigate();

  const color = { Approved: "green", Pending: "#ffc107", Rejected: "red" };

  const icon = {
    Approved: (
      <AddReactionRoundedIcon
        className="status-icon"
        style={{ color: "green" }}
      />
    ),
    Pending: (
      <HourglassTopRoundedIcon
        className="status-icon"
        style={{ color: "#AF814D" }}
      />
    ),
    Rejected: (
      <DangerousRoundedIcon className="status-icon" style={{ color: "red" }} />
    ),
  };

  const buttons = [
    {
      label: "Approve",
      variant: "success",
      status: ["Pending", "Rejected"],
      to: "Approved",
    },
    {
      label: "Reject",
      variant: "danger",
      status: ["Pending", "Approved"],
      to: "Rejected",
    },
  ];

  const changeStatus = async (newStatus) => {
    try {
      const { message } = await AxiosServise.put(
        `${ApiRoutes.CHANGE_STATUS_USER.path}/${projectId}`,
        { status: newStatus },
        { authenticate: ApiRoutes.CHANGE_STATUS_USER.auth }
      );
      toast.success(message);
      getData();
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  const getData = async () => {
    try {
      let response;
      if (role === "Admin") {
        response = await AxiosServise.get(
          `${ApiRoutes.GET_USER_PROJECT_ByID.path}/${projectId}`,
          { authenticate: ApiRoutes.GET_USER_PROJECT_ByID.auth }
        );
      } else {
        response = await AxiosServise.get(
          `${ApiRoutes.GET_PROJECT_ByID.path}/${projectId}`,
          {
            authenticate: ApiRoutes.GET_PROJECT_ByID.auth,
          }
        );
      }

      if (response.data) {
        const project = response.data;
        setProjectTitle(project.projectTitle);
        setDescription(project.description);
        setTechnologies(project.technologies.join(", "));
        setSubmittedAt(project.submittedAt);
        setSubmissionDetails(project.submissionDetails);
        setStatus(project.status);
      } else {
        toast.error("Project not found");
      }
    } catch (error) {
      toast.error("Error fetching project data");
    }
  };

  useEffect(() => {
    if (projectId) {
      getData();
    }
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let edata = {
        projectTitle,
        description,
        technologies: technologies.split(",").map((t) => t.trim()),
        category,
        submissionDetails,
      };
      let { data } = await AxiosServise.get(
        ApiRoutes.GET_ALL_USER_PROJECT_ByUSERID.path,
        { authenticate: ApiRoutes.GET_ALL_USER_PROJECT_ByUSERID.auth }
      );
      let alreadyData = data.map((project) => project.projectTitle);

      if (!alreadyData.includes(edata.projectTitle)) {
        let response = await AxiosServise.post(
          ApiRoutes.CREATE_SUBMIT.path,
          edata,
          {
            authenticate: ApiRoutes.CREATE_SUBMIT.auth,
          }
        );
        toast.success("Project submitted successfully!!");
        navigate("/submitProject");
      } else {
        toast.error("You already submitted this project!!");
      }
    } catch (error) {
      toast.error("Failed to create project!!");
    }
  };

  return (
    <div className="full-page">
      <Container className="view-submit">
        <h2>View Project</h2>

        <Form onSubmit={handleSubmit}>
          <h5>Project Title</h5>
          <p>{projectTitle}</p>
          <h5>Description</h5>
          <p>{description}</p>
          <h5>Technologies</h5>
          <p>{technologies}</p>
          {role === "Admin" ? (
            <>
              <h5>Submission Details</h5>
              <p>{submissionDetails}</p>
              <h5>Submitted At</h5>
              <p>{submittedAt}</p>
              <h5>Status</h5>
              <p>
                <span style={{ color: color[status] }}>{icon[status]}</span>{" "}
                {status}
              </p>
              <div>
                <h5>Actions</h5>
                {buttons.map((button, index) =>
                  button.status.includes(status) ? (
                    <Button
                      key={index}
                      variant={button.variant}
                      className="mr-2 btn btn-sm"
                      onClick={() => changeStatus(button.to)}
                    >
                      {button.label}
                    </Button>
                  ) : null
                )}
              </div>
            </>
          ) : (
            <>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="submissionDetails">
                <Form.Label>Submission Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setSubmissionDetails(e.target.value)}
                  required
                />
              </Form.Group>
              <Button className="btn-sm mt-3" variant="primary" type="submit">
                Submit
              </Button>
              <Button
                className="btn-sm mt-3"
                variant="danger"
                type="button"
                onClick={() => window.location.reload()}
              >
                Clear
              </Button>
            </>
          )}
        </Form>
      </Container>
    </div>
  );
}

export default ViewProject;
