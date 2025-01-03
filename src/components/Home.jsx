import React, { useEffect, useState } from "react";
import ProjectCard from "./common/ProjectCard";
import AxiosServise from "../utils/AxiosServise";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const [cards, setCards] = useState([]);

  const getProjectsAndUsers = async () => {
    try {
      const [{ data: projectData }, { data: userData }] = await Promise.all([
        AxiosServise.get(ApiRoutes.GET_ALL_APPROVED_PROJECT.path, {
          authenticate: ApiRoutes.GET_ALL_APPROVED_PROJECT.auth,
        }),
        AxiosServise.get(ApiRoutes.GET_ALL_APPROVED_USER.path, {
          authenticate: ApiRoutes.GET_ALL_APPROVED_USER.auth,
        }),
      ]);

      // Combine and shuffle cards
      const combinedData = [...projectData, ...userData].sort(
        () => Math.random() - 0.5
      );
      setCards(combinedData);
    } catch (error) {
      toast.error(error.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    getProjectsAndUsers();
  }, []);

  return (
    <div className="home-wrapper full-page">
      <Carousel fade className="carosal-box">
        <Carousel.Item className="carosal-item">
          <h3>Project-Management-Tool</h3>
          <p>Maximize your efficiency with smart task management.</p>
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

      <h2 className="approved-projects text-center m-4">Approved Cards</h2>
      <div className="row">
        {cards.map((card, index) => (
          <div
            className="col-6 col-md-6 col-lg-4 mb-4"
            key={card.projectId || index}
          >
            <ProjectCard
              title={card.projectTitle || "No Title"}
              description={card.description || "No Description"}
              technologies={card.technologies || "N/A"}
              category={card.category || "N/A"}
              name={card.name || "Unknown"}
              deadline={card.deadline || "No Deadline"}
              projectId={card.projectId || index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
