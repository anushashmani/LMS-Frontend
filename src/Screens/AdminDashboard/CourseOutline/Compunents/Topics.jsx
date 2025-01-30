import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, message } from "antd";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

const AddTopicForm = ({ modules, onTopicAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(AppRoutes.addModulesTopic, values);
      message.success("Topic added successfully");
      form.resetFields();
      // onTopicAdded(); // Un-comment if you need to call onTopicAdded after success
    } catch (error) {
      console.error("Error adding topic:", error);
      message.error("Failed to add topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-[#0561a6] text-center mb-6">
          Add a New Topic
        </h2>
        <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-6">
          <Form.Item
            name="moduleId"
            label={<span className="font-medium text-[#0561a6] ">Select Module</span>}
            rules={[{ required: true, message: "Please select a module" }]}
          >
            <Select
              className="w-full border border-gray-300 rounded-md focus:ring-[#0561a6]  focus:border-[#0561a6]"
              placeholder="Choose a module"
            >
              {modules.map((module) => (
                <Option key={module._id} value={module._id}>
                  {module.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label={<span className="font-medium text-[#0561a6] ">Topic Title</span>}
            rules={[{ required: true, message: "Please enter the topic title" }]}
          >
            <Input
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#0561a6]  focus:border-[#0561a6] "
              placeholder="Enter topic title"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="font-medium text-[#0561a6] ">Topic Description</span>}
            rules={[{ required: true, message: "Please enter the topic description" }]}
          >
            <Input.TextArea
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#0561a6]  focus:border-[#0561a6]"
              placeholder="Provide a detailed description of the topic"
            />
          </Form.Item>

          <Form.Item>
            <button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={`w-full bg-[#0561a6]  text-white font-medium py-3 rounded-md shadow-md hover:bg-[#2c71a7]  transition duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Add Topic"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddTopicForm;
