import React, { useState, useEffect } from "react";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminCreate = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [submissionDetails, setSubmissionDetails] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await AxiosServise.get(ApiRoutes.GET_ALL_USER.path, {
          authenticate: ApiRoutes.GET_ALL_USER.auth,
        });
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        projectTitle,
        description,
        technologies: technologies.split(",").map((t) => t.trim()),
        deadline,
        category,
        assignedUsers: assignedUsers.split(",").map((u) => u.trim()),
        submissionDetails: "Your submission details here",
      };
      let response = await AxiosServise.post(
        ApiRoutes.CREATE_PROJECT.path,
        data,
        {
          authenticate: ApiRoutes.CREATE_PROJECT.auth,
        }
      );
      toast.success("Project created successfully!!");
      navigate("/Profile");
    } catch (error) {
      console.error("Error during project creation:", error);
      toast.error("Failed to create project!!");
    }
  };

  return (
    <div className="full-page ">
      <Container className="view-submit create-form">
        <div className="row m-1 ">
          <h2>Create New Project</h2>
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

            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
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

            <Form.Group controlId="assignedUsers">
              <Form.Label>
                Assigned TeamMembers (Only userIDs, comma separated Each userIDs
                )
              </Form.Label>
              <Form.Control
                type="text"
                value={assignedUsers}
                onChange={(e) => setAssignedUsers(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
        <Button
          className="btn-sm mt-2"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className="btn-sm mt-2"
          variant="danger"
          type="button"
          onClick={() => window.location.reload()}
        >
          Clear
        </Button>
        <Row className="mt-4">
          <Col>
            <Form.Label>
              TeamMembers Details (Users Name & Users IDs)
            </Form.Label>
            {users.length > 0 ? (
              <ListGroup>
                {users.map((user) => (
                  <ListGroup.Item key={user.userId}>
                    {user.firstName} {user.lastName} - "{user.userId}"
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <ListGroup>
                <ListGroup.Item>No user available</ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminCreate;
