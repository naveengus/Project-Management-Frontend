import React, { useState, useEffect } from "react";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserSubmit = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [category, setCategory] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        projectTitle,
        description,
        technologies: technologies.split(",").map((t) => t.trim()),
        category,
        submissionDetails: "Your submission details here",
      };
      let response = await AxiosServise.post(
        ApiRoutes.CREATE_SUBMIT.path,
        data,
        {
          authenticate: ApiRoutes.CREATE_SUBMIT.auth,
        }
      );
      toast.success("Project created successfully!!");
      navigate("/Profile");
    } catch (error) {
      toast.error("Failed to create project!!");
    }
  };

  return (
    <div className="full-page ">
      <Container className="view-submit create-form">
        <div className="row m-1 ">
          <h2 className="page-head">Create New Project</h2>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group controlId="projectTitle">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="technologies">
              <Form.Label>Technologies (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                required
              />
            </Form.Group>

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
                value={submissionDetails}
                onChange={(e) => setSubmissionDetails(e.target.value)}
                required
              />
            </Form.Group>
          </Form>{" "}
        </div>
        <Button
          variant="primary"
          className="btn-sm "
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          type="button"
          onClick={() => window.location.reload()}
        >
          Clear
        </Button>
      </Container>
    </div>
  );
};

export default UserSubmit;
