import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/Constant/Constant";
import { AnimatedBackground } from "../Welcome-Screen/AnimatedBackGround";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Submit Function
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Backend API call
      const response = await axios.post(AppRoutes.signUp, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log("response", response);

      // Success Message
      message.success("Signup successful! Please log in.");
      navigate("/login"); // Redirect to Login
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AnimatedBackground />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f0f2f5",
        }}
      >
        <div
          // style={{
          //   width: "100%",
          //   maxWidth: "400px",
          //   padding: "20px",
          //   borderRadius: "8px",
          //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          //   background: "#ffffff",

          // }}
          className="bg-white/2 isolate backdrop-blur-md max-w-[400px] w-full p-[20px] rounded-xl aspect-video ring-1 ring-black/5 shadow-2xl"
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "26px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#ffff",
            }}
            className="mt-4"
          >
            SMIT Portal Signup
          </h2>
          <Form name="signup" onFinish={onFinish} layout="vertical">
            <Form.Item
              label={
                <label className="text-white text-md uppercase font-bold">
                  Name
                </label>
              }
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" size="large" />
            </Form.Item>
            <Form.Item
              label={
                <label className="text-white text-md uppercase font-bold">
                  {" "}
                  Email
                </label>
              }
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              label={
                <label className="text-white text-md uppercase font-bold">
                  Password
                </label>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="rounded-xl py-6 text-lg mt-5 border-none shadow-lg bg-gradient-to-br from-green-500 to-blue-500 text-white font-semibold"
                htmlType="submit"
                style={{ width: "100%" }}
                size="large"
                loading={loading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          {/* Login Link Styled */}
          <div
            style={{
              fontSize: "18px",
              textAlign: "center",
              color: "#fff",
              marginBottom: "16px",
            }}          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#0561a6",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
