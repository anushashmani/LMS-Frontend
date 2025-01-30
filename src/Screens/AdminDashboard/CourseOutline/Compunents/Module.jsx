// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { Form, Input, Button, message, Select } from "antd"
// import { AppRoutes } from "@/Constant/Constant"

// const { Option } = Select

// const AddModuleForm = ({ onModuleAdded }) => {
//   const [form] = Form.useForm()
//   const [loading, setLoading] = useState(false)
//   const [courses, setCourses] = useState([])

//   // Fetch Courses
//   useEffect(() => {
//     axios
//       .get(AppRoutes.getCourses)
//       .then((response) => {
//         setCourses(response.data.data)
//       })
//       .catch((error) => {
//         console.error("Error fetching courses:", error)
//       })
//   }, [])

//   const onFinish = async (values) => {
//     setLoading(true)
//     try {
//       await axios.post(AppRoutes.addCoursesModule, values);
//       message.success("Module added successfully")
//       form.resetFields()
//       onModuleAdded()
//     } catch (error) {
//       console.error("Error adding module:", error)
//       message.error("Failed to add module")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Form form={form} onFinish={onFinish} layout="vertical">
//       <Form.Item
//         name="title"
//         label="Module Title"
//         rules={[{ required: true, message: "Please enter the module title" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         name="description"
//         label="Module Description"
//         rules={[{ required: true, message: "Please enter the module description" }]}
//       >
//         <Input.TextArea />
//       </Form.Item>
//       <Form.Item
//         name="duration"
//         label="Module Duration"
//         rules={[{ required: true, message: "Please enter the module duration" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item name="course" label="Course" rules={[{ required: true, message: "Please select a course!" }]}>
//         <Select placeholder="Select a course">
//           {courses.map((course) => (
//             <Option key={course._id} value={course._id}>
//               {course.title}
//             </Option>
//           ))}
//         </Select>
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={loading}>
//           Add Module
//         </Button>
//       </Form.Item>
//     </Form>
//   )
// }

// export default AddModuleForm









import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, message } from "antd";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

const AddModuleForm = ({ onModuleAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  // Fetch Courses
  useEffect(() => {
    axios
      .get(AppRoutes.getCourses)
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(AppRoutes.addCoursesModule, values);
      message.success("Module added successfully");
      form.resetFields();
      onModuleAdded();
    } catch (error) {
      console.error("Error adding module:", error);
      message.error("Failed to add module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-[#0561a6]  text-center mb-6">
          Add a New Module
        </h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="title"
            label={
              <span className="font-medium text-[#0561a6] ">Module Title</span>
            }
            rules={[{ required: true, message: "Please enter the module title" }]}
          >
            <Input
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#0561a6] focus:border-[#0561a6]"
              placeholder="Enter the module title"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="font-medium text-[#0561a6] ">
                Module Description
              </span>
            }
            rules={[
              { required: true, message: "Please enter the module description" },
            ]}
          >
            <Input.TextArea
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#0561a6] focus:border-[#0561a6]"
              placeholder="Provide a detailed description"
            />
          </Form.Item>

          <Form.Item
            name="duration"
            label={
              <span className="font-medium text-[#0561a6] ">Module Duration</span>
            }
            rules={[
              { required: true, message: "Please enter the module duration" },
            ]}
          >
            <Input
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-[#0561a6]  focus:border-[#0561a6]"
              placeholder="Enter duration (e.g., 3 hours)"
            />
          </Form.Item>

          <Form.Item
            name="course"
            label={<span className="font-medium text-[#0561a6] ">Course</span>}
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select
              placeholder="Select a course"
              className="w-full border border-gray-300 rounded-md focus:ring-[#0561a6] focus:border-[#0561a6]"
            >
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className={`w-full bg-[#0561a6]  text-white font-medium py-3 rounded-md shadow-md hover:bg-[#2c71a7]  transition duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add Module"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddModuleForm;
