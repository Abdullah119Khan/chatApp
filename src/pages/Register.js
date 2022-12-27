import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import "../App.css";

const Register = () => {
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, res) {
      console.log(res.data.register);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: variables,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addUser();
  };

  return (
    <div className="register-form">
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          name="username"
          error={errors.username ? true : false}
          value={variables.username}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          name="email"
          error={errors.email ? true : false}
          value={variables.email}
          onChange={handleChange}
        />
        <Form.Input
          type="password"
          label="Password"
          name="password"
          error={errors.password ? true : false}
          value={variables.password}
          onChange={handleChange}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          value={variables.confirmPassword}
          onChange={handleChange}
        />
        <Button color="teal" type="submit">
          Register
        </Button>
        <Link to="/login">
          <p style={{ marginTop: "10px" }}>
            Have an account <strong style={{ marginLeft: "3px" }}>Login</strong>
          </p>
        </Link>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui message error">
          {Object.values(errors).map((value) => (
            <ul key={value.id}>
              <li>{value}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Register;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      password
      createdAt
    }
  }
`;
