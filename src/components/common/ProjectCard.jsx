import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import sampleProfile from "../../assets/sampleProfile.webp";
import { useNavigate } from "react-router-dom";

function ProjectCard({
  title,
  description,
  technologies,
  categeries,
  name,
  projectId,
}) {
  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="">
          <Card
            className="pro-card"
            onClick={() => navigate(`/ViewAllProject/${projectId}`)}
          >
            <div className="profile-head">
              <Card.Header className="mb-2 text-muted">
                <img src={sampleProfile} className="profile" alt="Profile" />
                {name || "user name"}
              </Card.Header>
            </div>
            <Card.Body className="card-body" style={{ color: "#cecaca" }}>
              <Card.Title className="cb-title" style={{ color: "#faf7f7" }}>
                {title || "Title here"}
              </Card.Title>
              <Card.Text>{description || "Sample description here"}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                {technologies || "Technologies not provided"}
              </ListGroup.Item>
              <ListGroup.Item>
                {categeries || "Categories not provided"}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
