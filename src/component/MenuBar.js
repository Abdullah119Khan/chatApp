import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

const MenuBar = ({ data }) => {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  console.log(data?.getUsers);

  return user ? (
    <Menu pointing secondary size="massive" color="teal" className="menuBar">
      <Menu.Item
        name={user.username}
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to={`/user/${user.id}`}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={() => logout()}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal" className="menuBar">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;

const GET_USER = gql`
  {
    getUsers {
      id
      username
      email
      password
    }
  }
`;
