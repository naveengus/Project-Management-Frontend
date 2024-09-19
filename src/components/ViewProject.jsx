import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewProject() {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [category, setCategory] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState("");
  let { projectId } = useParams();
  let navigate = useNavigate();

  let getData = async (projectId) => {
    try {
      let response = await AxiosServise.get(
        `${ApiRoutes.GET_PROJECT_ByID.path}/${projectId}`,
        {
          authenticate: ApiRoutes.GET_PROJECT_ByID.auth,
        }
      );
      console.log(response.data);
      if (response.data) {
        const project = response.data;
        console.log(project);

        if (project) {
          setProjectTitle(project.projectTitle);
          setDescription(project.description);
          setTechnologies(project.technologies.join(", "));
        } else {
          toast.error("Project not found");
        }
      } else {
        toast.error("Failed to fetch project data");
      }
    } catch (error) {
      toast.error("Error fetching project data");
    }
  };

  useEffect(() => {
    if (projectId) {
      getData(projectId);
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
        submissionDetails: "Your submission details here",
      };
      let { data, message } = await AxiosServise.get(
        ApiRoutes.GET_ALL_USER_PROJECT_ByUSERID.path,
        { authenticate: ApiRoutes.GET_ALL_USER_PROJECT_ByUSERID.auth }
      );
      let alreadyData = data.map((project) => project.projectTitle);
      console.log("edata ", edata.projectTitle);
      console.log("alreadyData", alreadyData);

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
    <div className="full-page ">
      <Container className="view-submit">
        <h2>View Project</h2>

        <Form onSubmit={handleSubmit}>
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
        </Form>
      </Container>
    </div>
  );
}

export default ViewProject;
