import React, { useState } from "react";
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
  const [links, setLinks] = useState([""]);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        projectTitle,
        description,
        technologies: technologies.split(",").map((t) => t.trim()),
        category,
        submissionDetails,
        ProjectLink: links.filter((link) => link.trim() !== ""),
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

  const addLinkField = () => {
    setLinks([...links, ""]);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const removeLinkField = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
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
            <Form.Group>
              <Form.Label>Project Links</Form.Label>
              {links.map((link, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="url"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    placeholder="Paste a link"
                    required={index === 0}
                  />
                  <Button
                    variant="danger"
                    onClick={() => removeLinkField(index)}
                    className="ml-2 btn-sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="success"
                className=" btn-sm "
                onClick={addLinkField}
              >
                Add Another Link
              </Button>
            </Form.Group>

            <Button variant="primary" className="btn-sm mt-3" type="submit">
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
        </div>
      </Container>
    </div>
  );
};

export default UserSubmit;
