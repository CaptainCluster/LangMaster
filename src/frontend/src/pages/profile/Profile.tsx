import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Params, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../stores/store";
import Header from "../../components/Header";
import { ApiProfile } from "../../api/ApiProfile";

function Profile() {
  const { updateCurrentPageName } = useStore(); // State management
  const username: string | undefined = useParams().username; // URL parameter recognition

  // Unauthenticated users are redirected
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      window.location.href = "/login";
    }
    updateCurrentPageName("Profile");
  }, []);

  if (username == undefined) {
    return <span>Undefined user error.</span>;
  }

  // Query for fetching the profile data
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => ApiProfile.getProfileData(username),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // Returning the intended content upon successful query fetch
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h2>{}</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
