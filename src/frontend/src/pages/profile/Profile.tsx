import { useEffect } from "react";
import useStore from "../../stores/store";
import Header from "../../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Profile() {
  const { updateCurrentPageName } = useStore();

  // Unauthenticated users are redirected
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      window.location.href = "/login";
    }
    updateCurrentPageName("Profile");
  }, []);

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
