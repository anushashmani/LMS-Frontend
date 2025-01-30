// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Input, Select, Upload, Button, Row, Col, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { AppRoutes } from '@/Constant/Constant';
// import axios from 'axios';

// const AddStudentModal = ({ visible, onClose, onAddStudent }) => {
//     const [form] = Form.useForm(); // Use only Ant Design Form instance
//     const [courses, setCourses] = useState([]);
//     const [batches, setBatches] = useState([]);
//     const [sections, setSections] = useState([]);
//     const [campuses, setCampuses] = useState([]); // New state for Campus
//     const [trainers, setTrainers] = useState([]);
//     const [fileList, setFileList] = useState([]);

//     // Fetch Campuses
//     useEffect(() => {
//         const fetchCampuses = async () => {
//             try {
//                 const response = await fetch(AppRoutes.getCampus);
//                 const data = await response.json();
//                 if (!response.ok) throw new Error('Failed to fetch campuses');
//                 setCampuses(data.data);
//             } catch (error) {
//                 message.error('Failed to fetch campuses.');
//             }
//         };
//         fetchCampuses();
//     }, []);

//     useEffect(() => {
//         const fetchTrainers = async () => {
//             try {
//                 const response = await axios.get(AppRoutes.getTrainer); // Adjust the API endpoint as needed
//                 setTrainers(response.data.data); // Assuming the response contains data in 'data' field
//             } catch (error) {
//                 console.error('Error fetching trainers:', error);
//             }
//         };

//         fetchTrainers();
//     }, []);

//     // Fetch Courses
//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await fetch(AppRoutes.getCourses);
//                 const data = await response.json();
//                 if (!response.ok) throw new Error('Failed to fetch courses');
//                 setCourses(data.data);
//             } catch (error) {
//                 message.error('Failed to fetch courses.');
//             }
//         };
//         fetchCourses();
//     }, []);

//     // Fetch Batches
//     const fetchBatches = async (courseId) => {
//         try {
//             const response = await fetch(AppRoutes.getBatch);
//             const data = await response.json();
//             const filteredBatches = data.data.filter(batch => batch.course?._id === courseId);
//             setBatches(filteredBatches);
//         } catch (error) {
//             message.error('Failed to fetch batches.');
//         }
//     };

//     const fetchSections = async (batchId) => {
//         try {
//             const response = await fetch(AppRoutes.getSections);
//             const data = await response.json();
//             const sections = Array.isArray(data) ? data : data.data;

//             if (sections && Array.isArray(sections)) {
//                 const filteredSections = sections.filter(
//                     section => section.batch && section.batch._id === batchId
//                 );
//                 setSections(filteredSections);
//             } else {
//                 throw new Error('Invalid data format');
//             }
//         } catch (error) {
//             console.error('Error fetching sections:', error);
//             message.error('Failed to fetch sections.');
//         }
//     };

//     // Dropdown Handlers
//     const handleCourseChange = (value) => {
//         form.setFieldsValue({ batch: undefined, section: undefined }); // Reset batch & section
//         fetchBatches(value);
//     };

//     const handleBatchChange = (value) => {
//         form.setFieldsValue({ section: undefined }); // Reset section
//         fetchSections(value);
//     };

//     const handleFileChange = (info) => {
//         setFileList(info.fileList.map(file => ({
//             ...file,
//             preview: URL.createObjectURL(file.originFileObj),
//         })));
//     };

//     const handleOk = async () => {
//         try {
//             const values = await form.validateFields();
//             const formData = new FormData();
    
//             // Append all form values to formData
//             for (let key in values) {
//                 formData.append(key, values[key]);
//             }
    
//             // Append Image File if available
//             if (fileList.length > 0) {
//                 formData.append('image', fileList[0].originFileObj);
//             }
    
//             // Send the data to AppRoutes.addStudent
//             const studentResponse = await axios.post(AppRoutes.addStudent, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
    
//             if (studentResponse.status === 201) {
//                 message.success('Student added successfully!');
//                 // Send only name, email, password, and role to AppRoutes.signUp
//                 const signUpData = {
//                     name: values.name,
//                     email: values.email,
//                     password: values.password,
//                     role: 'student', // Role is set as 'student'
//                 };
    
//                 // Send the data to AppRoutes.signUp
//                 const signUpResponse = await axios.post(AppRoutes.signUp, signUpData);
    
//                 if (signUpResponse.status === 201) {
//                     message.success('Student signed up successfully!');
//                     onClose();
//                     form.resetFields();
//                     setFileList([]); // Reset file list
//                 }
//             }
//         } catch (error) {
//             console.error('Error adding student:', error);
//             message.error('Failed to add student.');
//         }
//     };
    

//     return (
//         <Modal
//             title="Add Student"
//             visible={visible}
//             onOk={handleOk}
//             onCancel={onClose}
//             width={800}
//         >
//             <Form
//                 layout="vertical"
//                 form={form}
//                 style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}
//             >
//                 <Row gutter={16}>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//                             <Input placeholder="Enter Name" />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="email" label="Email" rules={[{ required: true }]}>
//                             <Input placeholder="Enter Email" />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="password" label="Password" rules={[{ required: true }]}>
//                             <Input.Password placeholder="Enter Password" />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="fatherName" label="Father's Name" rules={[{ required: true }]}>
//                             <Input placeholder="Enter Father's Name" />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="phoneNo" label="Phone No" rules={[{ required: true }]}>
//                             <Input placeholder="Enter Phone No" />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="whatsappNo" label="WhatsApp No (Optional)">
//                             <Input placeholder="Enter WhatsApp No" />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="cnic" label="CNIC" rules={[{ required: true }]}>
//                             <Input placeholder="Enter CNIC" />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="fatherCnic" label="Father's CNIC" rules={[{ required: true }]}>
//                             <Input placeholder="Enter Father's CNIC" />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
//                             <Input placeholder="Enter Qualification" />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="campus" label="Campus" rules={[{ required: true }]}>
//                             <Select placeholder="Select Campus">
//                                 {campuses.map(campus => (
//                                     <Select.Option key={campus._id} value={campus._id}>
//                                         {campus.title}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="trainer" label="Trainer" rules={[{ required: true }]}>
//                             <Select placeholder="Select Trainer">
//                                 {trainers.map(trainer => (
//                                     <Select.Option key={trainer._id} value={trainer._id}>
//                                         {trainer.name}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="course" label="Course" rules={[{ required: true }]}>
//                             <Select placeholder="Select Course" onChange={handleCourseChange}>
//                                 {courses.map(course => (
//                                     <Select.Option key={course._id} value={course._id}>
//                                         {course.title}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="batch" label="Batch" rules={[{ required: true }]}>
//                             <Select placeholder="Select Batch" onChange={handleBatchChange}>
//                                 {batches.map(batch => (
//                                     <Select.Option key={batch._id} value={batch._id}>
//                                         {batch.title}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={16}>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="section" label="Section" rules={[{ required: true }]}>
//                             <Select placeholder="Select Section">
//                                 {sections.map(section => (
//                                     <Select.Option key={section._id} value={section._id}>
//                                         {section.title}
//                                     </Select.Option>
//                                 ))}
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12}>
//                         <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
//                             <Select placeholder="Select Gender">
//                                 <Select.Option value="Male">Male</Select.Option>
//                                 <Select.Option value="Female">Female</Select.Option>
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//                     <Input placeholder="Enter Address" />
//                 </Form.Item>
//                 <Form.Item name="image" label="Upload Image">
//                     <Upload
//                         beforeUpload={() => false}
//                         listType="picture"
//                         fileList={fileList}
//                         onChange={handleFileChange}
//                     >
//                         <Button icon={<UploadOutlined />}>Upload Image</Button>
//                     </Upload>
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };

// export default AddStudentModal;



import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, Row, Col, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AppRoutes } from '@/Constant/Constant';
import axios from 'axios';

const AddStudentModal = ({ visible, onClose, onAddStudent }) => {
    const [form] = Form.useForm(); // Use only Ant Design Form instance
    const [courses, setCourses] = useState([]);
    const [batches, setBatches] = useState([]);
    const [sections, setSections] = useState([]);
    const [campuses, setCampuses] = useState([]); // New state for Campus
    const [trainers, setTrainers] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false); // State for loader

    // Fetch Campuses
    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                const response = await fetch(AppRoutes.getCampus);
                const data = await response.json();
                if (!response.ok) throw new Error('Failed to fetch campuses');
                setCampuses(data.data);
            } catch (error) {
                message.error('Failed to fetch campuses.');
            }
        };
        fetchCampuses();
    }, []);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get(AppRoutes.getTrainer); // Adjust the API endpoint as needed
                setTrainers(response.data.data); // Assuming the response contains data in 'data' field
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        fetchTrainers();
    }, []);

    // Fetch Courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(AppRoutes.getCourses);
                const data = await response.json();
                if (!response.ok) throw new Error('Failed to fetch courses');
                setCourses(data.data);
            } catch (error) {
                message.error('Failed to fetch courses.');
            }
        };
        fetchCourses();
    }, []);

    // Fetch Batches
    const fetchBatches = async (courseId) => {
        try {
            const response = await fetch(AppRoutes.getBatch);
            const data = await response.json();
            const filteredBatches = data.data.filter(batch => batch.course?._id === courseId);
            setBatches(filteredBatches);
        } catch (error) {
            message.error('Failed to fetch batches.');
        }
    };

    const fetchSections = async (batchId) => {
        try {
            const response = await fetch(AppRoutes.getSections);
            const data = await response.json();
            const sections = Array.isArray(data) ? data : data.data;

            if (sections && Array.isArray(sections)) {
                const filteredSections = sections.filter(
                    section => section.batch && section.batch._id === batchId
                );
                setSections(filteredSections);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
            message.error('Failed to fetch sections.');
        }
    };

    // Dropdown Handlers
    const handleCourseChange = (value) => {
        form.setFieldsValue({ batch: undefined, section: undefined }); // Reset batch & section
        fetchBatches(value);
    };

    const handleBatchChange = (value) => {
        form.setFieldsValue({ section: undefined }); // Reset section
        fetchSections(value);
    };

    const handleFileChange = (info) => {
        setFileList(info.fileList.map(file => ({
            ...file,
            preview: URL.createObjectURL(file.originFileObj),
        })));
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true); // Start loader before adding student
            const formData = new FormData();
    
            // Append all form values to formData
            for (let key in values) {
                formData.append(key, values[key]);
            }
    
            // Append Image File if available
            if (fileList.length > 0) {
                formData.append('image', fileList[0].originFileObj);
            }
    
            // Send the data to AppRoutes.addStudent
            const studentResponse = await axios.post(AppRoutes.addStudent, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            if (studentResponse.status === 201) {
                message.success('Student added successfully!');
                // Send only name, email, password, and role to AppRoutes.signUp
                const signUpData = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: 'student', // Role is set as 'student'
                };
    
                // Send the data to AppRoutes.signUp
                const signUpResponse = await axios.post(AppRoutes.signUp, signUpData);
    
                if (signUpResponse.status === 201) {
                    message.success('Student signed up successfully!');
                    onClose();
                    form.resetFields();
                    setFileList([]); // Reset file list
                }
            }
        } catch (error) {
            console.error('Error adding student:', error);
            message.error('Failed to add student.');
        } finally {
            setLoading(false); // Stop loader
        }
    };

    return (
        <Modal
            title="Add Student"
            visible={visible}
            onOk={handleOk}
            onCancel={onClose}
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading} // Show loader on button click
                    onClick={handleOk}
                >
                    Add Student
                </Button>,
            ]}
        >
            <Spin spinning={loading}>
                <Form
                    layout="vertical"
                    form={form}
                    style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input placeholder="Enter Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                                <Input placeholder="Enter Email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                                <Input.Password placeholder="Enter Password" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="fatherName" label="Father's Name" rules={[{ required: true }]}>
                                <Input placeholder="Enter Father's Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="phoneNo" label="Phone No" rules={[{ required: true }]}>
                                <Input placeholder="Enter Phone No" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="whatsappNo" label="WhatsApp No (Optional)">
                                <Input placeholder="Enter WhatsApp No" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="cnic" label="CNIC" rules={[{ required: true }]}>
                                <Input placeholder="Enter CNIC" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="fatherCnic" label="Father's CNIC" rules={[{ required: true }]}>
                                <Input placeholder="Enter Father's CNIC" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
                                <Input placeholder="Enter Qualification" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="campus" label="Campus" rules={[{ required: true }]}>
                                <Select placeholder="Select Campus">
                                    {campuses.map(campus => (
                                        <Select.Option key={campus._id} value={campus._id}>
                                            {campus.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="trainer" label="Trainer" rules={[{ required: true }]}>
                                <Select placeholder="Select Trainer">
                                    {trainers.map(trainer => (
                                        <Select.Option key={trainer._id} value={trainer._id}>
                                            {trainer.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="course" label="Course" rules={[{ required: true }]}>
                                <Select placeholder="Select Course" onChange={handleCourseChange}>
                                    {courses.map(course => (
                                        <Select.Option key={course._id} value={course._id}>
                                            {course.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="batch" label="Batch" rules={[{ required: true }]}>
                                <Select placeholder="Select Batch" onChange={handleBatchChange}>
                                    {batches.map(batch => (
                                        <Select.Option key={batch._id} value={batch._id}>
                                            {batch.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="section" label="Section" rules={[{ required: true }]}>
                                <Select placeholder="Select Section">
                                    {sections.map(section => (
                                        <Select.Option key={section._id} value={section._id}>
                                            {section.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select placeholder="Select Gender">
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input placeholder="Enter Address" />
                    </Form.Item>
                    <Form.Item name="image" label="Upload Image">
                        <Upload
                            beforeUpload={() => false}
                            listType="picture"
                            fileList={fileList}
                            onChange={handleFileChange}
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default AddStudentModal;
