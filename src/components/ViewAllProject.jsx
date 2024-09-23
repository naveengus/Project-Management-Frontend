import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";

function ViewAllProject() {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [status, setStatus] = useState("");

  const { projectId } = useParams();

  const color = {
    Approved: "green",
    Pending: "#ffc107",
    Rejected: "red",
  };

  const icon = {
    Approved: (
      <AddReactionRoundedIcon
        className="status-icon"
        style={{ color: "green" }}
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
      // Fetching project data
      const { data: projects } = await AxiosServise.get(
        ApiRoutes.GET_ALL_PROJECT_ByUSERID.path,
        { authenticate: ApiRoutes.GET_ALL_PROJECT_ByUSERID.auth }
      );

      const project = projects.find((proj) => proj.projectId === projectId);
      if (project) {
        setProjectTitle(project.projectTitle);
        setDescription(project.description);
        setTechnologies(project.technologies.join(", "));
        setSubmissionDetails(project.submissionDetails);
        setStatus(project.status);
      } else {
        toast.error("Project not found");
      }

      // Fetching additional user details if needed
      const { data: userData } = await AxiosServise.get(
        ApiRoutes.GET_ALL_APPROVED_USER.path,
        { authenticate: ApiRoutes.GET_ALL_APPROVED_USER.auth }
      );

      const userProject = userData.find((proj) => proj.projectId === projectId);
      if (!userProject) {
        toast.error("Failed to fetch project details from user data");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    if (projectId) {
      getData();
    }
  }, [projectId]);

  return (
    <div className="full-page">
      <Container className="view-submit">
        <h5>Project Title</h5>
        <p>{projectTitle}</p>
        <h5>Description</h5>
        <p>{description}</p>
        <h5>Technologies</h5>
        <p>{technologies}</p>
        <h5>Submission Details</h5>
        <p>{submissionDetails}</p>
        <h5>Status</h5>
        <p>
          <span style={{ color: color[status] }}>{icon[status]}</span> {status}
        </p>
      </Container>
    </div>
  );
}

export default ViewAllProject;
