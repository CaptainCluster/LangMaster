import { useEffect, useState } from "react";
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
  const [langElements, setLangElements] = useState<JSX.Element[]>();

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
  console.log(data);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const displayLanguages = (): JSX.Element => {
    if (!data.languages || data.languages.length === 0) {
      return <span>No languages found.</span>;
    }
    const languagesList: JSX.Element[] = [];
    data.languages.map((language: String) => {
      languagesList.push(<li>{language}</li>);
    });
    return <ul>{languagesList}</ul>;
  };

  // Returning the intended content upon successful query fetch
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h2>{username}</h2>
            <h6>{data.bio}</h6>
            {displayLanguages()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
