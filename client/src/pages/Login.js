import React from "react";
import "../styles/RegisterStyle.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../components/images/login.jpg";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
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
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card login-card"
        >
          <div className="row no-gutters">
            <div className="col-md-5">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                src={loginImage}
                alt="login"
                className="login-card-img"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper"></div>
                <p className="login-card-description">Sign into your account</p>
                <Form
                  layout="vertical"
                  onFinish={onFinishHandler}
                  className="register-form"
                >
                  <Form.Item label="Email" name="email">
                    <Input type="email" required />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input type="password" required />
                  </Form.Item>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                  >
                    Login
                  </motion.button>
                </Form>
                <p className="login-card-footer-text">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-reset">
                    Register here
                  </Link>
                </p>
                <nav className="login-card-footer-nav"></nav>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
