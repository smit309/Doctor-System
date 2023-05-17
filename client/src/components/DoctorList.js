import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr.{" "}
          {doctor.firstName &&
            doctor.firstName.charAt(0).toUpperCase() +
              doctor.firstName.slice(1)}{" "}
          {doctor.lastName &&
            doctor.lastName.charAt(0).toUpperCase() + doctor.lastName.slice(1)}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization :</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience :</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation :</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
      </div>
      <style>
        {`
          .card {
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
          }

          .card:hover {
            transform: translateY(-5px);
          }

          .card-header {
            background-color: #315287;
            color: #fff;
            padding: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }

          .card-body {
            padding: 10px;
          }

          .card-body p {
            margin: 0;
            font-size: 16px;
          }

          .card-body b {
            font-weight: bold;
            margin-right: 5px;
          }

          .card-body:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        `}
      </style>
    </>
  );
};

export default DoctorList;
