import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import sampleProfile from "../../assets/sampleProfile.webp";
function ProjectCard({ title, description, technologies, deadline, name }) {
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-12  w-100">
          <Card className="card-wrapper">
            <div className="profile-head">
              <Card.Header className="mb-2 text-muted">
                <img src={sampleProfile} className="profile" />

                {name ? name : "user name"}
              </Card.Header>
            </div>
            <Card.Body>
              <Card.Title>{title ? title : "Title here"}</Card.Title>
              <Card.Text>
                {description ? description : "Sample description here"}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                {technologies ? technologies : "Technologies not provided"}
              </ListGroup.Item>
              <ListGroup.Item>
                {deadline ? deadline : "Deadline not set"}
              </ListGroup.Item>
              <ListGroup.Item>categeries</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
