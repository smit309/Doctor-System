import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Typography } from "antd";

const { Title } = Typography;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <div className="appointments-page">
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "50px",
            fontWeight: "bold",
            fontSize: "32px",
          }}
        >
          Appointments List
        </Title>{" "}
        <Table
          columns={columns}
          dataSource={appointments}
          pagination={false}
          rowKey="_id"
          className="appointments-table"
        />
      </div>
      <style jsx>{`
        .appointments-page {
          background-color: #ffffff;
          padding: 50px 20px;
          color: white;
        }
        .appointments-title {
          text-align: center;
          margin-bottom: 40px;
        }
        .appointments-table {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout>
  );
};

export default Appointments;
