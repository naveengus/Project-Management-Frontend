import React, { useState, useEffect } from "react";
import sampleProfile from "../assets/sampleProfile.webp";
import Table from "react-bootstrap/Table";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [project, setProject] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const color = { Approved: "green", Pending: "#ffc107", Rejected: "red" };
  const icon = {
    Approved: <AddReactionRoundedIcon style={{ color: "green" }} />,
    Pending: <HourglassTopRoundedIcon style={{ color: "#AF814D" }} />,
    Rejected: <DangerousRoundedIcon style={{ color: "red" }} />,
  };
  const role = sessionStorage.getItem("role");

  // Fetch Projects
  const getData = async () => {
    try {
      const { data } =
        role === "Admin"
          ? await AxiosServise.get(ApiRoutes.GET_ALL_PROJECT_ByUSERID.path, {
              authenticate: ApiRoutes.GET_ALL_PROJECT_ByUSERID.auth,
            })
          : await AxiosServise.get(
              ApiRoutes.GET_ALL_USER_PROJECT_ByUSERID.path,
              {
                authenticate: ApiRoutes.GET_ALL_USER_PROJECT_ByUSERID.auth,
              }
            );
      setProject(data);
      setFilteredProjects(data); // Initialize filtered projects
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter Projects
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(project);
    } else {
      const filtered = project.filter((p) => p.status === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter, project]);

  const handleDelete = async (projectId) => {
    try {
      const { message } = await AxiosServise.delete(
        `${ApiRoutes.DELETE_PROJECT.path}/${projectId}`,
        { authenticate: ApiRoutes.DELETE_PROJECT.auth }
      );
      toast.success(message);
      setProject((prevProjects) =>
        prevProjects.filter((p) => p.projectId !== projectId)
      );
      setShow(false);
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  const confirmDelete = (projectId) => {
    setSelectedProject(projectId);
    setShow(true);
  };

  return (
    <div className="container">
      {/* Alert Box */}
      {show && (
        <Alert show={show} variant="danger" className="delete-alert">
          <Alert.Heading>Are you sure you want to delete?</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => handleDelete(selectedProject)}
              variant="outline-danger"
            >
              Yes
            </Button>
            <Button
              onClick={() => setShow(false)}
              variant="outline-secondary"
              className="ml-2"
            >
              No
            </Button>
          </div>
        </Alert>
      )}

      {/* Profile Section */}
      <div className="m-4">
        <img src={sampleProfile} className="profile-p" alt="Profile" />
        <h3>@username</h3>
        <p>Ready to filter projects.</p>
      </div>

      <hr />

      {/* Navigation Bar */}
      <ul className="profile-nav">
        {["All", "Approved", "Rejected", "Pending"].map((filter) => (
          <li
            key={filter}
            className={`m-1 p-2 ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter} Projects
          </li>
        ))}
      </ul>
      <hr className="m-0 "></hr>
      {/* Projects Table */}
      <div className="col-12 w-100 mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((projects, i) => (
              <tr key={projects.projectId}>
                <td>{i + 1}</td>
                <td
                  onClick={() => navigate(`/ViewSubmit/${projects.projectId}`)}
                >
                  {projects.projectTitle}
                </td>
                <td style={{ color: color[projects.status] }}>
                  {projects.status} {icon[projects.status]}
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => confirmDelete(projects.projectId)}
                  >
                    <DeleteForeverRoundedIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Profile;
