import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import { useNavigate } from "react-router-dom";
import sampleProfile from "../assets/sampleProfile.webp";

function Dashboard() {
  let [project, setProject] = useState([]);
  let navigate = useNavigate();
  let color = { Approved: "green", Pending: "#ffc107", Rejected: "red" };
  let icon = {
    Approved: (
      <AddReactionRoundedIcon
        className="status-icon"
        style={{ color: "#ffc107" }}
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

  const getData = async () => {
    try {
      let { data, message } = await AxiosServise.get(
        ApiRoutes.GET_ALL_SUBMIT.path,
        { authenticate: ApiRoutes.GET_ALL_SUBMIT.auth }
      );
      //  const filteredData = data.filter(
      //    (project) => project.status !== "Rejected"
      //  );
      //  setProject(filteredData);
      setProject(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div classname="container ">
      <div className="row m-1 mt-3">
        <div className="col-12  w-100">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>@UserName</th>
                <th>ProjectTitle</th>
                <th>SubmittedAt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {project.map((projects, i) => {
                return (
                  <tr
                    key={projects.projectId}
                    onClick={() =>
                      navigate(`/ViewSubmit/${projects.projectId}`)
                    }
                  >
                    <td>{i + 1}</td>
                    <td>
                      {" "}
                      <img src={sampleProfile} className="profile" />
                      {projects.name}
                    </td>
                    <td>{projects.projectTitle}</td>
                    <td>
                      <div className="SubmittedAt">
                        {projects.submittedAt.split("T")[0]}
                      </div>
                    </td>
                    <td
                      style={{
                        color: `${color[projects.status]}`,
                      }}
                    >
                      {icon[projects.status]} {projects.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
