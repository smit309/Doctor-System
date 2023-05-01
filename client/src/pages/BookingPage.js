import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div
        className="card p-3"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        }}
      >
        {doctors && (
          <div className="card p-3">
            <h4 className="card-title mb-3">
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h5 className="card-subtitle mb-2 text-muted">
              Fees : {doctors.feesPerCunsaltation}
            </h5>
            {doctors && doctors.timings && doctors.timings.length >= 2 && (
              <h5 className="card-subtitle mb-4 text-muted">
                Timings : {doctors.timings[0]} - {doctors.timings[1]}
              </h5>
            )}
            <div className="d-flex flex-column align-items-center justify-content-center">
              <DatePicker
                aria-required={"true"}
                className="form-control my-3"
                placeholderText="Select Date"
                dateFormat="dd-MM-yyyy"
                selected={date ? moment(date, "DD-MM-YYYY").toDate() : null}
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                className="form-control my-3"
                placeholder="Select Time"
                format="HH:mm"
                showSecond={false}
                inputReadOnly={true}
                value={time ? moment(time, "HH:mm") : null}
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary my-3"
                onClick={handleAvailability}
                disabled={!date || !time}
              >
                Check Availability
              </button>
              <button
                className="btn btn-dark my-3"
                onClick={handleBooking}
                disabled={!date || !time}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
