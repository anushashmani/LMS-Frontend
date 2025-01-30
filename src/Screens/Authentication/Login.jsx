import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { AppRoutes } from "@/Constant/Constant";
import { Form, Input, Button, Checkbox, message } from "antd";
import { AnimatedBackground } from "../Welcome-Screen/AnimatedBackGround";

export const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(AppRoutes.login, values);
      setUser(res.data);

      // Save token in cookies
      Cookies.set("token", res.data.token);

      const role = res.data.role;
      message.success("Login Successfully");

      setTimeout(() => {
        if (role === "student") navigate("/studentDashboard");
        else if (role === "teacher") navigate("/teacherDashboard");
        else if (role === "admin") navigate("/admin");
      }, 1000);
    } catch (err) {
      console.error("Login failed", err);
      message.error(err?.response?.data?.msg || "Login failed failed!");
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
          //   // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          //   // background: "#ffffff",
          //   zIndex: 999,
          //   fontFamily: "Montserrat, serif",
          // }}
          className="bg-white/2 isolate backdrop-blur-md max-w-[400px] w-full p-[20px] rounded-xl aspect-video ring-1 ring-black/5 shadow-2xl"
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#ffff",
            }}
            className="mb-6 mt-2"
          >
            SMIT Portal
          </h2>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label={
                <label className="text-white text-md uppercase font-bold">
                  Email
                </label>
              }
              name="email"
              // tooltip={"Enter your valid email id"}
              // className="font-[Montserrat]"
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

            {/* Signup Link Styled */}
            <div
              className="mt-8"
              style={{
                fontSize: "18px",
                textAlign: "center",
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#0561a6",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Signup
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="rounded-xl mt-5 border-none py-6 shadow-lg bg-gradient-to-br from-blue-500 to-green-500 text-white hover:text-blue-700 hover:bg-[#0782e0] text-lg font-semibold"
                htmlType="submit"
                style={{ width: "100%" }}
                size="large"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
