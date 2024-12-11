import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../stores/store";
import Header from "../../components/Header";
import { api } from "../../api";
import quizStore from "../../stores/quizStore";
import { redirectForNoToken } from "../../utils/checkLocalStorage";
const Profile = () => {
  const { updateCurrentPageName } = useStore(); // State management
  const username: string | undefined = useParams().username; // URL parameter recognition

  const { quizId } = quizStore();

  // Unauthenticated users are redirected
  useEffect(() => {
    console.log(quizId);
    redirectForNoToken();
    updateCurrentPageName("Profile");
  }, []);

  if (username == undefined) {
    return <span>No user found.</span>;
  }

  // Query for fetching the profile data
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.user.getProfileData(username),
  });

  // Handling errors and loading
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (data == undefined) {
    return <span>No data</span>;
  }

  //Displaying the languages the user has studied
  const displayLanguages = (): JSX.Element => {
    if (!data.data.languages || data.data.languages.length === 0) {
      return <span>No languages found.</span>;
    }
    const languagesList: JSX.Element[] = [];
    data.data.languages.map((language: String) => {
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
            <h6>{data.data.bio}</h6>
            {displayLanguages()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
