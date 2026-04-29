import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Smart Medical System</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/qr">QR Scanner</Nav.Link>
          <Nav.Link as={Link} to="/emotion">Emotional Health Monitoring</Nav.Link>
          <Nav.Link as={Link} to="/overdose">Overdose Control</Nav.Link>
          <Nav.Link as={Link} to="/predict">Predict</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
