import React from "react";
import { gql, useQuery } from "@apollo/client";
import CardList from "../component/CardList";
import { Grid, Image } from "semantic-ui-react";

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POST);

  console.log(data?.getPosts);

  return (
    <Grid columns={3}>
      <Grid.Row centered>
        <h1>Recent Post</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading</p>
        ) : (
          data?.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <CardList post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;

const GET_ALL_POST = gql`
  {
    getPosts {
      id
      body
      username
      likeCount
      commentCount
      comments {
        id
        body
        username
      }
      likes {
        id
        username
      }
    }
  }
`;
