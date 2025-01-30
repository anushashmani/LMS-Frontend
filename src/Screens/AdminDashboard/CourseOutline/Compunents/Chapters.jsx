import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, message } from "antd";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

const AddChapterForm = ({ modules }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);

  // Fetch topics for a selected module
  const fetchTopics = async (moduleId) => {
    try {
      const response = await axios.get(`${AppRoutes.getModulesTopic}/${moduleId}`);
      setTopics(response.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
      message.error("Failed to fetch topics");
    }
  };

  const onModuleChange = (value) => {
    fetchTopics(value);
    form.setFieldsValue({ topicId: null });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(AppRoutes.addChapters, values);
      message.success("Chapter added successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error adding chapter:", error);
      message.error("Failed to add chapter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-[#0561a6] mb-8">
          Add a New Chapter
        </h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="moduleId"
            label={<span className="font-medium text-[#0561a6] ">Select Module</span>}
            rules={[{ required: true, message: "Please select a module" }]}
          >
            <Select
              className="w-full border-gray-300 rounded-md focus:ring-[#0561a6] focus:border-[#0561a6]"
              placeholder="Choose a module"
              onChange={onModuleChange}
            >
              {modules.map((module) => (
                <Option key={module._id} value={module._id}>
                  {module.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="topicId"
            label={<span className="font-medium text-[#0561a6] ">Select Topic</span>}
            rules={[{ required: true, message: "Please select a topic" }]}
          >
            <Select
              disabled={!topics.length}
              className={`w-full border-gray-300 rounded-md focus:ring-[#0561a6] focus:border-[#0561a6]${
                topics.length ? "" : "cursor-not-allowed"
              }`}
              placeholder="Choose a topic"
            >
              {topics.map((topic) => (
                <Option key={topic._id} value={topic._id}>
                  {topic.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label={<span className="font-medium text-[#0561a6] ">Chapter Title</span>}
            rules={[{ required: true, message: "Please enter the chapter title" }]}
          >
            <Input
              className="w-full border-gray-300 rounded-md p-3 focus:ring-[#0561a6] focus:border-[#0561a6]"
              placeholder="Enter chapter title"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label={<span className="font-medium text-[#0561a6] ">Chapter Content</span>}
            rules={[{ required: true, message: "Please enter the chapter content" }]}
          >
            <Input.TextArea
              rows={4}
              className="w-full border-gray-300 rounded-md p-3 focus:ring-[#0561a6] focus:border-[#0561a6]"
              placeholder="Write the content of the chapter"
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
              {loading ? "Submitting..." : "Add Chapter"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddChapterForm;
