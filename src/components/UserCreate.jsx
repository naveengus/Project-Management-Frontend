import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import sampleProfile from "../assets/sampleProfile.webp";

function UserCreate() {
  let navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const color = { Approved: "green", Pending: "#ffc107", Rejected: "red" };
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

  const getData = async () => {
    try {
      const myUserId = sessionStorage.getItem("userId");
      let { data: projectData, message: projectMessage } =
        await AxiosServise.get(ApiRoutes.GET_ALL_APPROVED_PROJECT.path, {
          authenticate: ApiRoutes.GET_ALL_APPROVED_PROJECT.auth,
        });
      let filteredProjects = projectData.filter((project) =>
        project.assignedUsers.includes(myUserId)
      );
      setProjects(filteredProjects);
      // toast.success(projectMessage);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="full-page ">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>@TeamLeaders</th>
            <th>ProjectTitle</th>
            <th>Deadlines</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr key={project.projectId}>
              <td>{i + 1}</td>
              <td onClick={() => navigate(`/ViewProject/${project.projectId}`)}>
                {" "}
                <img src={sampleProfile} className="profile" />
                {project.name}
              </td>
              <td
                className="col-2"
                onClick={() => navigate(`/ViewProject/${project.projectId}`)}
              >
                {project.projectTitle}
              </td>
              <td className="col-1">
                <div className="Deadlines">
                  {project.deadline.split("T")[0]}
                </div>
              </td>
              <td>
                <div className="Action">
                  <Button
                    variant="primary"
                    className="btn-sm"
                    type="submit"
                    onClick={() =>
                      navigate(`/ViewProject/${project.projectId}`)
                    }
                  >
                    Submit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserCreate;
