export default {
  LOGIN: {
    path: "/users/login",
    auth: false,
  },
  SIGNUP: {
    path: "/users/signup ",
  },
  FORGOTPASSWORD: {
    path: "/users/forgotPassword ",
  },
  RESETPASSWORD: {
    path: "/users/resetPassword",
  },
  GET_ALL_USER: {
    path: "/users/getAllUsers",
    auth: true,
  },
  CREATE_PROJECT: {
    path: "/project/createProject",
    auth: true,
  },
  GET_ALL_PROJECT: {
    path: "/project/getAllProject",
    auth: true,
  },
  CHANGESTATUS_PROJECT: {
    path: "/project/changStatus",
    auth: true,
  },
  GET_ALL_APPROVED_PROJECT: {
    path: "/project/getAllApprovedProject",
    auth: true,
  },

  GET_ALL_PROJECT_ByUSERID: {
    path: "/project/getAllProjectByUserId",
    auth: true,
  },
  GET_PROJECT_ByID: {
    path: "/project/getProjectById",
    auth: true,
  },
  CREATE_SUBMIT: {
    path: "/userproject/createSubmit",
    auth: true,
  },
  GET_ALL_SUBMIT: {
    path: "/userproject/getAllSubmit",
    auth: true,
  },
  GET_ALL_USER_PROJECT_ByUSERID: {
    path: "/userproject/getAllUserProjectByUserId",
    auth: true,
  },
  CHANGE_STATUS_USER: {
    path: "/userproject/changStatusSubmit",
    auth: true,
  },
  GET_ALL_APPROVED_USER: {
    path: "/userproject/getAllApprovedUser",
    auth: true,
  },
  DELETE_PROJECT: {
    path: "/project/deleteProject",
    auth: true,
  },
  GET_USER_PROJECT_ByID: {
    path: "/userproject/getUserProjectById",
    auth: true,
  },
};
