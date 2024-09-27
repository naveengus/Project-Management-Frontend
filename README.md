# Project Management Tool (Frontend)(Project-Tracker)

This is the frontend for a **Project Management Tool** built using **React.js**. The application enables team leaders to manage projects and allows users to submit their work. It incorporates **React Router DOM** for navigation and **Axios** for making API requests to a connected MongoDB backend.

## Features

### Team Leader Features

- **Admin Create Project**: Create new projects, assign them to users, and set deadlines for project completion.
- **Dashboard**: View project statistics and user performance.
- **User Assignment**: Assign users to specific projects and manage their .
- **Delete Project**: Remove projects that are no longer needed.

### User Features

- **Create Project**: Users can create their own projects for submission.
- **Submit Project**: Users can submit completed projects for review.
- **View All Projects**: View all projects assigned to the user.
- **View Submission Status**: Check the submission status of their projects.

### Common Features

- **Profile Management**: Users can view and edit their profiles.
- **Home Page**: Landing page with a brief overview of the application and features.
- **Responsive Design**: The application is designed to be mobile-friendly and works on different screen sizes.

### Folder Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminCreate.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   ├── UserCreate.jsx
│   │   ├── UserSubmit.jsx
│   │   ├── ViewAllProjects.jsx
│   │   ├── ViewSubmit.jsx
│   ├── services/
│   │   ├── AxiosService.js
│   │   ├── AppRouter.jsx
│   │   └── ApiRoutes.js
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

### Components Overview

## AdminCreate.jsx

Functionality: Allows team leaders to create and assign new projects, set deadlines, and select users to whom the projects will be assigned.

## Dashboard.jsx

Displays analytics and statistics regarding projects and users its only for a TeamLeader(Admin).

## Home.jsx

Serves as the landing page for the application.

## Profile.jsx

Allows users to view and Delete their projects.

## UserCreate.jsx

Provides users the option to submit their completed projects.

## UserSubmit.jsx

Enables users to create new projects.

## ViewProjects.jsx

Shows the submission status of the user's projects.

### Services

- **AxiosService.js**:Handles API requests, including authentication tokens and error handling.
- **AppRouterjs**:Sets up the routing for the application using React Router.
- **ApiRoutes.js**:Defines the API endpoints for project management.

### Technologies Used

-**React.js**: For building the user interface. -**Axio\*\*\*\***s: For making HTTP requests to the API. -**React Router DOM**: For routing between different pages in the application. -**.env**: For environment variable configuration.

## Acknowledgements

- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reactrouter.com/)
- [React Hot Toast](https://react-hot-toast.com/)

# website

- [preview](https://project-tracker-tool.netlify.app)
