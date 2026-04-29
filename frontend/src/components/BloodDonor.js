import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Table, Row, Col } from "react-bootstrap";

function BloodDonor() {
  const [formData, setFormData] = useState({
    name: "",
    blood_group: "",
    contact: ""
  });

  const [message, setMessage] = useState("");
  const [donors, setDonors] = useState([]);
  const [searchGroup, setSearchGroup] = useState("");

  const loadDonors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/view_donors");
      const data = await res.json();
      setDonors(data);
    } catch (error) {
      console.error("Load donors error:", error);
    }
  };

  useEffect(() => {
    loadDonors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:4000/bloodbank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Donor added successfully");
        setFormData({
          name: "",
          blood_group: "",
          contact: ""
        });
        loadDonors();
      } else {
        setMessage(data.error || "Failed to add donor");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("❌ Failed to connect to backend");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/delete_donor/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Donor deleted successfully");
        loadDonors();
      } else {
        setMessage(data.error || "Failed to delete donor");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("❌ Failed to delete donor");
    }
  };

  const filteredDonors = searchGroup
    ? donors.filter((donor) => donor.blood_group === searchGroup)
    : donors;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Blood Donor</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </Form.Group>

          <Button type="submit" variant="danger">
            Add Donor
          </Button>
        </Form>

        {message && <h5 className="mt-3 text-center">{message}</h5>}

        <hr className="my-4" />

        <Row className="mb-3">
          <Col md={4}>
            <Form.Select
              value={searchGroup}
              onChange={(e) => setSearchGroup(e.target.value)}
            >
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Form.Select>
          </Col>
        </Row>

        <h3 className="mb-3">Donor List</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.id}</td>
                  <td>{donor.name}</td>
                  <td>{donor.blood_group}</td>
                  <td>{donor.contact}</td>
                  <td>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleDelete(donor.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No donors found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default BloodDonor;