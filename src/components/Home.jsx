import React, { useEffect, useState } from "react";
import ProjectCard from "./common/ProjectCard";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";

function Home() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const getProjectsData = async () => {
    try {
      const { data: projectData } = await AxiosServise.get(
        ApiRoutes.GET_ALL_APPROVED_PROJECT.path,
        { authenticate: ApiRoutes.GET_ALL_APPROVED_PROJECT.auth }
      );
      setProjects(projectData);
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  const getUsersData = async () => {
    try {
      const { data: userData } = await AxiosServise.get(
        ApiRoutes.GET_ALL_APPROVED_USER.path,
        { authenticate: ApiRoutes.GET_ALL_APPROVED_USER.auth }
      );
      setUsers(userData);
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    getProjectsData();
    getUsersData();
  }, []);

  return (
    <div className="home-wrapper full-page ">
      <div className="projects">
        <h2>Approved Projects</h2>
        {projects.map((project) => (
          <ProjectCard
            title={project.projectTitle}
            description={project.description}
            technologies={project.technologies}
            name={project.name}
            deadline={project.deadline}
            key={project.projectId}
          />
        ))}
      </div>
      <div className="projects">
        {users.map((user) => (
          <ProjectCard
            title={user.projectTitle}
            description={user.description}
            technologies={user.technologies}
            name={user.name}
            deadline={user.deadline}
            key={user.projectId}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
