import { Container, Grid } from "@mantine/core";
import { useState } from "react";
import UserCards from "@components/app/ui/UserCards";
import axiosInstance from "./api/axiosInterceptors";

const IndexPage = ({ users }) => {
  const [usersList, setUsersList] = useState(users);

  const handleUserDelete = (userId) => {
    const updatedUsersList = usersList.filter((user) => user.id !== userId);
    setUsersList(updatedUsersList);
  };

  return (
    <Container fluid mt="md">
      <Grid gutter={{ base: 1, xs: "md", md: "xl", xl: "lg" }}>
        {usersList.map((user) => (
          <Grid.Col key={user.id} span={{ base: 12, md: 6, lg: 3 }}>
            <UserCards user={user} onDelete={handleUserDelete} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axiosInstance.get("/users");
    const users = response.data;

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);

    return {
      props: {
        users: [],
        error: "Failed to fetch users",
      },
    };
  }
}

export default IndexPage;
