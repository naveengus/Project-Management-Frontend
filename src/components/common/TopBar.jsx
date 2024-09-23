import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import useLogOut from "../../hooks/useLogout.jsx";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import HomeIcon from "@mui/icons-material/Home";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Groups3RoundedIcon from "@mui/icons-material/Groups3Rounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
function TopBar() {
  let { pathname } = useLocation();
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  let logout = useLogOut();
  let role = sessionStorage.getItem("role");

  let links = [
    {
      label: "Home",
      path: "/home",
      icon: <HomeIcon sx={{ fontSize: 20 }} className="topicon" />,
      role: ["Admin", "User"],
    },
    {
      label: "Dashboard",
      path: "/Dashboard",
      icon: (
        <DashboardCustomizeIcon sx={{ fontSize: 18 }} className="topicon" />
      ),
      role: ["Admin"],
    },
    {
      label: "Create",
      path: "/create",
      icon: <GroupAddIcon sx={{ fontSize: 20 }} className="topicon" />,
      role: ["Admin"],
    },
    {
      label: "Assignment",
      path: "/submitProject",
      icon: <AssignmentRoundedIcon sx={{ fontSize: 20 }} className="topicon" />,
      role: ["User"],
    },

    {
      label: "CreateProject",
      path: "/CreateProject",
      icon: <GroupAddIcon sx={{ fontSize: 20 }} className="topicon" />,
      role: ["User"],
    },
    {
      label: "My Blogs",
      path: "/Profile",
      icon: (
        <ManageAccountsRoundedIcon sx={{ fontSize: 20 }} className="topicon" />
      ),
      role: ["User", "Admin"],
    },
  ];

  return (
    <>
      <Navbar expand="lg" className=" topbox">
        <Container>
          <Navbar.Brand className="brand">
            <Groups3RoundedIcon
              // fontSize="medium"
              sx={{ fontSize: 32 }}
              className="userlogo"
            />
            <label className="brand-head">Project-Tracker</label>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {links.map((link, i) => {
                if (link.role.includes(role)) {
                  return (
                    <Nav.Link
                      onClick={() => navigate(link.path)}
                      className={link.path === pathname ? "active" : ""}
                      key={i}
                    >
                      {link.icon}
                      {link.label}
                    </Nav.Link>
                  );
                } else <></>;
              })}
            </Nav>
            <Button
              variant="danger"
              className="btn-sm "
              onClick={() => setShow(true)}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {show && (
        <div className="alert-box">
          <Alert show={show} variant="danger" className="delete-alert">
            <Alert.Heading className="alert-head">
              Are you sure you want to LogOut?
            </Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end ">
              <Button onClick={() => logout()} variant="outline-danger">
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
    </>
  );
}

export default TopBar;
