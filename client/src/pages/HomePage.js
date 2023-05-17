import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col, Typography } from "antd";
import DoctorList from "../components/DoctorList";

const { Title } = Typography;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // Get all doctors from the API
  const getAllDoctors = async () => {
    try {
      const response = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontWeight: "bold",
            fontSize: "32px",
          }}
        >
          Doctor List
        </Title>
        <Row gutter={[16, 16]}>
          {doctors.map((doctor) => (
            <Col key={doctor._id} xs={24} sm={12} md={8} lg={6}>
              <DoctorList doctor={doctor} />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
