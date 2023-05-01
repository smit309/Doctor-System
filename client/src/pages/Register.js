import React from "react";
import "../styles/Register.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import registerImage from "../components/images/register.jpg";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
};

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="d-flex align-items-center min-vh-100 py-3 py-md-0"
    >
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper"></div>
                <p class="login-card-description">Create an account</p>
                <Form
                  layout="vertical"
                  onFinish={onFinishHandler}
                  className="register-form"
                >
                  <Form.Item label="Name" name="name">
                    <Input type="text" required />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input type="email" required />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input type="password" required />
                  </Form.Item>
                  <button class="btn btn-block login-btn mb-4" type="submit">
                    Register
                  </button>
                </Form>
                <p class="login-card-footer-text">
                  Already have an account?{" "}
                  <Link to="/login" className="text-reset">
                    Login here
                  </Link>
                </p>
                <nav className="login-card-footer-nav"></nav>
              </div>
            </div>
            <div className="col-md-5">
              <img
                src={registerImage}
                alt="register"
                className="login-card-img"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
