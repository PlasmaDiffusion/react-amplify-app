import React from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "./loading";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = (props) => {
  //This component does nothing unless user is logged in already.
  //It returns a render of the email, and can also give the username/email to parent components via a passed in function.

  const { user } = useAuth0();
  const { name, picture, email } = user;

  if (!user) return <React.Fragment></React.Fragment>;

  //console.log(user);

  //Call a parent function if it was set
  if (props.onAuthenticated) props.onAuthenticated(name);

  if (props.adminPage && user.email != "scott50000@gmail.com")
    return <p>Not logged in as an admin.</p>;
  else if (props.adminPage || props.invisible) return "";
  else
    return (
      <Container>
        <Row className="align-items-center profile-header text-center text-md-left">
          {/*<Col md={2}>
            <img
              src={picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              width={32}
              height={32}
            />
          </Col>*/}
          <Col md>
            <p className="lead text-muted">{email}</p>
          </Col>
        </Row>
        {/*<Row className="align-items-center profile-header mb-5 text-center text-md-left">
          <Col md>
            <a href="/cart">Cart</a>
            <p className="lead text-muted">{email}</p>
          </Col>
    </Row>*/}
      </Container>
    );
};

export default Profile;
