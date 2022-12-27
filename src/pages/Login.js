import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const context = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      Navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser();
  };

  return (
    <div className="register-form">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Email"
          name="email"
          error={errors.email ? true : false}
          values={values.email}
          onChange={handleChange}
        />
        <Form.Input
          type="password"
          label="Password"
          name="password"
          error={errors.password ? true : false}
          values={values.password}
          onChange={handleChange}
        />
        <Button color="teal">Login</Button>
        <Link to="/register">
          <p style={{ marginTop: "10px" }}>
            Don't have account{" "}
            <strong style={{ marginLeft: "3px" }}>Register</strong>
          </p>
        </Link>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui message error">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      password
      token
      createdAt
    }
  }
`;
