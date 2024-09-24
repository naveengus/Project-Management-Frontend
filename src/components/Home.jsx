import React, { useEffect, useState } from "react";
import ProjectCard from "./common/ProjectCard";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import Carousel from "react-bootstrap/Carousel";

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
      <div>
        <Carousel fade className="carosal-box">
          <Carousel.Item className="carosal-item">
            <div>
              {" "}
              <h3>Project-Management-Tool</h3>
              <p>Maximize your efficiency with smart task management. </p>
            </div>
          </Carousel.Item>
          <Carousel.Item className="carosal-item">
            <h3>Project-Management-Tool</h3>
            <p>Work smarter, not harder—prioritize your tasks effectively.</p>
          </Carousel.Item>
          <Carousel.Item className="carosal-item">
            <h3>Project-Management-Tool</h3>
            <p>Stay on top of your goals with intelligent task tracking.</p>
          </Carousel.Item>
        </Carousel>

        <h2 className="approved-projects">Approved Projects</h2>

        <div className="projects">
          {projects.map((project) => (
            <ProjectCard
              title={project.projectTitle}
              description={project.description}
              technologies={project.technologies}
              categeries={project.category}
              name={project.name}
              deadline={project.deadline}
              projectId={project.projectId}
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
              projectId={user.projectId}
              key={user.projectId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
