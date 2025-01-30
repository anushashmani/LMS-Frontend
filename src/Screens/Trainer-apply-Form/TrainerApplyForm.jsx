
import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import smit from "../../assets/images/smit.png";
import axios from "axios";

const { Option } = Select;

export default function TrainerApplyForm() {
  const countriesData = [
    { country: "Turkey", cities: ["Istanbul"] },
    {
      country: "Pakistan",
      cities: ["Karachi", "Faisalabad", "Ghotki", "Quetta", "Islamabad"],
    },
  ];

  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    const countryData = countriesData.find((c) => c.country === value);
    setCities(countryData ? countryData.cities : []);
    form.setFieldsValue({ city: "" });
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt1M = file.size / 1024 / 1024 < 1;

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }
    if (!isLt1M) {
      message.error("Image must be smaller than 1MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => setImageUrl(url));
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    // You can send this data to your backend
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=> {
    axios()
  }, [])



  return (
    <div className="max-w-5xl mx-auto  rounded-lg">
      <div className="bg-gray-100 w-full h-36 mb-16 inline-block align-top ">
        <img src={smit} alt="SMIT Logo" className="h-20 absolute top-2 left-1/2  transform -translate-x-1/2"
      />
      
<div>
<h1 className="text-3xl font-bold  text-gray-800 mb-3 mt-16 ">
          Registration Form - SMIT
        </h1>
        
        <p className="text-gray-500">Services - Education - Registration</p>
        </div> </div>
      
      <Form
        form={form}
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Form.Item
          name="country"
          label={<span className="text-[#0D6DB7] font-serif">Select Country</span>}
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select
            placeholder="Select a Country"
            className="text-left"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            {countriesData.map((data, index) => (
              <Option key={index} value={data.country}>
                {data.country}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="city"
          label={<span className="text-[#0D6DB7] font-serif">Select City</span>}
          rules={[{ required: true, message: "Please select your city!" }]}
        >
          <Select placeholder="Select City"
          className="text-left"
          disabled={!selectedCountry}>
            {cities.map((city, index) => (
              <Option key={index} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="course"
          label={
            <span className="text-[#0D6DB7] font-serif">
              Select course or event
            </span>
          }
          rules={[
            { required: true, message: "Please select a course or event!" },
          ]}
        >
          <Select
            placeholder="Select course or event"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          >
            <Option value="web">Web Development</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="proficiency"
          label={
            <span className="text-[#0D6DB7] font-serif">
              Select your computer proficiency
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please select your computer proficiency!",
            },        
            ]}
        >
          <Select
            placeholder="Select your computer proficiency"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          >
              <Option value="None">None</Option>
            <Option value="beginner">Beginner</Option>
            <Option value="intermediate">Intermediate</Option>
            <Option value="expert">Advanced</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="fullName"
          label={<span className="text-[#0D6DB7] font-serif">Full name</span>}
          rules={[
            { required: true, message: "Please input your Fullname" },
            { type: "fullName", message: "Please enter a valid Fullname!" },
          ]}
        >
          <Input
            placeholder="Full Name"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="fatherName"
          label={<span className="text-[#0D6DB7] font-serif">FatherName</span>}
          rules={[
            {
              required: false,
              message: "This field is optional",
            },
          ]}
        >
          <Input
            placeholder="Father Name"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-[#0D6DB7] font-serif">Email</span>}
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
           ]}
        >
          <Input
            placeholder="Email"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<span className="text-[#0D6DB7] font-serif">Phone</span>}
          rules={[
            
              { required: true, message: "Please input your phone number!" },
              { type: "phone", message: "Please input your phone number!" },
             
          ]}
        >
          <Input
            placeholder="Phone"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="cnic"
          label={<span className="text-[#0D6DB7] font-serif">CNIC</span>}
          rules={[
            { required: true, message: "Please input your CNIC!" },
            {
               type: "cnic", message: "Please enter a valid CNIC in the format XXXXX-XXXXXXX-X!",
            },
          ]}
        >
          <Input
            placeholder="CNIC"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="fatherCnic"
          label={
            <span className="text-[#0D6DB7] font-serif">
              Father's CNIC (optional)
            </span>
          }
        >
          <Input
            placeholder="Father CNIC"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="dob"
          label={
            <span className="text-[#0D6DB7] font-serif">Date of Birth</span>
          }
          rules={[
            { required: true, message: "Please select your date of birth!" },
            {
              type: "date", 
              message: "Please enter a valid date of birth!",
            },
          ]}

          
        >
          <DatePicker className="w-full" style={{ borderColor: "#8dc63f" }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<span className="text-[#0D6DB7] font-serif">Gender</span>}
          rules={[{ required: true, message: "Please select your gender!" },
            {
              type: "gender", 
              message: "Please select your gender!",
            }

          ]}
        >
          <Select
            placeholder="Select gender"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="address"
          label={<span className="text-[#0D6DB7] font-serif">Address</span>}
          rules={[{ required: true, message: "Please input your address!" },
            {type: "address", 
              message: "Please input your address!"
            }
          ]}
          className="col-span-full"
        >
          <Input.TextArea
            placeholder="Address"
              className="text-left"
            style={{ borderColor: "#8dc63f" }}
          />
        </Form.Item>

        <Form.Item
          name="qualification"
          label={
            <span className="text-[#0D6DB7] font-serif">Qualification</span>
          }
          rules={[
            {
              required: true,
              message: "Please select your last qualification!",
            },
            {
              type: "qualification",
              message: "Please select your last qualification!",
            }
          ]}
        >
          <Select placeholder="Last Qualification"   className="text-left">
            <Option value="matric">Matric</Option>
            <Option value="intermediate">Intermediate</Option>
            <Option value="bachelor">Bachelor</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="hasLaptop"
          label={
            <span className="text-[#0D6DB7] font-serif">
              Do you Have a Laptop?
            </span>
          }
          style={{ color: "#0561a7" }}
          rules={[
            { required: true, message: "Please select if you have a laptop!" },
            { type: "haslaptop", message: "Please select if you have a laptop!" },
          ]}
        >
          <Select placeholder="Do you have a Laptop?"    className="text-left">
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="picture"
          label={<span className="text-[#0D6DB7] font-serif">Picture</span>}
          rules={[{ required: true, message: "Please upload your picture!" },
            { type: "picture", message: "Please upload your picture!" }
          ]}
        >
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 sm:space-y-0 space-y-4">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  <UploadOutlined className="text-2xl" />
                  <div className="mt-2">Upload</div>
                </div>
              )}
            </Upload>
            <div className="text-sm text-left text-gray-500 mt-2 sm:mt-0 sm:text-left sm:mx-0 mx-4">
              <p>With white or blue background</p>
              <p>File size must be less than 1MB</p>
              <p>File type: jpg, jpeg, png</p>
              <p>Upload your recent passport size picture</p>
              <p>Your Face should be clearly visible without any Glasses</p>
            </div>
          </div>
        </Form.Item>

        <div className="col-span-full text-left text-sm text-gray-700 space-y-3">
          <p>
            1. I hereby, solemnly declare that the data and facts mentioned
            herein are true and correct to the best of my knowledge. Further, I
            will abide by all the established and future regulations and
            policies of SWIT
          </p>
          <p>
            2. I hereby accept the responsibilities of good conduct and
            guarantee that I will not be involved in any other activity,
            political or ethical, but learning during my stay in the program.
          </p>
          <p>
            3. Defiance will render my admission canceled at any point in time.
          </p>
          <p>
            4. Upon completion, of the course, I will complete the required
            project by SWIT.
          </p>
          <p>
            5. It's mandatory for female students to wear abaya/hijab in the
            class
          </p>
        </div>

        <Form.Item className="col-span-full pt-10">
          <Link to={"/studentQuiz"}>
            <Button
              style={{
                backgroundColor: "#0561a7",
                color: "#fff",
                fontSize: "16px",
              }}
              htmlType="submit"
              className="w-full"
            >
              Submit
            </Button>
          </Link>
        </Form.Item>
       
      </Form>
    </div>
  );
}
