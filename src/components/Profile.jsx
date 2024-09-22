import React, { useState, useEffect } from "react";
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
  let [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  let navigate = useNavigate();
  let color = { Approved: "green", Pending: "#ffc107", Rejected: "red" };
  let icon = {
    Approved: <AddReactionRoundedIcon style={{ color: "#ffc107" }} />,
    Pending: <HourglassTopRoundedIcon style={{ color: "#AF814D" }} />,
    Rejected: <DangerousRoundedIcon style={{ color: "red" }} />,
  };
  let role = sessionStorage.getItem("role");

  const getData = async () => {
    try {
      let { data, message } =
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
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      let { message } = await AxiosServise.delete(
        `${ApiRoutes.DELETE_PROJECT.path}/${projectId}`,
        { authenticate: ApiRoutes.DELETE_PROJECT.auth }
      );
      setProject((prevProjects) =>
        prevProjects.filter((project) => project.projectId !== projectId)
      );
      toast.success(message);
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
    <div className="container ">
      {show && (
        <div className="alert-box">
          <Alert show={show} variant="danger" className="delete-alert">
            <Alert.Heading className="alert-head">
              Are you sure you want to delete?
            </Alert.Heading>
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
        </div>
      )}
      <div className="row m-1 mt-3 profile-box ">
        <div className="col-12 w-100  ">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ProjectTitle</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {project.map((projects, i) => (
                <tr key={projects.projectId}>
                  <td>{i + 1}</td>
                  <td
                    onClick={() =>
                      navigate(`/ViewSubmit/${projects.projectId}`)
                    }
                  >
                    {projects.projectTitle}
                  </td>
                  <td style={{ color: `${color[projects.status]}` }}>
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
    </div>
  );
}

export default Profile;
