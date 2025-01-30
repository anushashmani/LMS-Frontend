// import React, { useState, useEffect } from 'react';
// import { Drawer, Form, Input, Select, Upload, Button, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AppRoutes } from '@/Constant/Constant';

// const { Option } = Select;

// const TrainerDrawer = ({ open, toggleDrawer }) => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     Name: '',
//     Email: '',
//     Phone: '',
//     Whatsapp: '',
//     Cnic: '',
//     Salary: '',
//     Specialization: '',
//     address: '',
//     Course: '',
//     Password: '',
//     Courses: [],
//     Batches: [],
//     Sections: [],
//     Image: null,
//     Resume: null,
//   });

//   const [courses, setCourses] = useState([]);
//   const [batches, setBatches] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [occupiedSections, setOccupiedSections] = useState({});
//   const [imageFileList, setImageFileList] = useState([]);
//   const [resumeFileList, setResumeFileList] = useState([]);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get(AppRoutes.getCourses);
//       setCourses(response.data.data);
//     } catch (error) {
//       message.error('Failed to fetch courses.');
//     }
//   };

//   const fetchBatches = async (courseIds) => {
//     try {
//       const response = await axios.get(AppRoutes.getBatch);
//       const newBatches = response.data.data.filter((batch) =>
//         courseIds.includes(batch.course?._id)
//       );
//       setBatches(newBatches);
//     } catch (error) {
//       message.error('Failed to fetch batches.');
//     }
//   };

//   const fetchSections = async (batchIds) => {
//     try {
//       const response = await axios.get(AppRoutes.getSections);
//       const allSections = Array.isArray(response.data) ? response.data : response.data.data;
//       const filteredSections = allSections.filter((section) =>
//         batchIds.includes(section.batch?._id)
//       );
//       setSections(filteredSections);

//       // Fetch occupied sections
//       const occupiedSectionsData = {};
//       const trainersResponse = await axios.get(AppRoutes.getTrainer);
//       const trainers = trainersResponse.data.data;

//       for (const section of filteredSections) {
//         const isOccupied = trainers.some(trainer =>
//           trainer.sections && trainer.sections.some(s => s._id === section._id)
//         );
//         occupiedSectionsData[section._id] = isOccupied;
//       }

//       console.log('occupiedSectionsData', occupiedSectionsData);
//       setOccupiedSections(occupiedSectionsData);
//     } catch (error) {
//       console.error('Error fetching sections:', error);
//       message.error('Failed to fetch sections.');
//     }
//   };

//   const handleCourseChange = (values) => {
//     setForm({ ...form, Courses: values, Batches: [], Sections: [] });
//     fetchBatches(values);
//   };

//   const handleBatchChange = (values) => {
//     setForm({ ...form, Batches: values, Sections: [] });
//     fetchSections(values);
//   };

//   const handleSectionChange = (values) => {
//     const newSections = values.filter(sectionId => {
//       if (occupiedSections[sectionId]) {
//         const sectionTitle = sections.find(s => s._id === sectionId)?.title;
//         message.warning(`Section ${sectionTitle} already has a trainer assigned.`);
//         return false;
//       }
//       return true;
//     });
//     setForm({ ...form, Sections: newSections });
//   };

//   const handleImageChange = ({ file }) => {
//     setImageFileList([file]);
//     setForm({ ...form, Image: file });
//   };

//   const handleResumeChange = ({ file }) => {
//     setResumeFileList([file]);
//     setForm({ ...form, Resume: file });
//   };

//   const handleSubmit = async (values) => {
//     const formData = new FormData();
//     formData.append('Name', form.Name);
//     formData.append('Email', form.Email);
//     formData.append('Phone', form.Phone);
//     formData.append('Whatsapp', form.Whatsapp);
//     formData.append('Cnic', form.Cnic);
//     formData.append('Salary', form.Salary);
//     formData.append('Specialization', form.Specialization);
//     formData.append('address', form.address);
//     formData.append('Courses', JSON.stringify(form.Courses));
//     formData.append('Batches', JSON.stringify(form.Batches));
//     formData.append('Sections', JSON.stringify(form.Sections));
//     formData.append('Password', form.Password);
//     formData.append('image', form.Image);
//     formData.append('resume', form.Resume);

//     try {
//       // Sending full trainer data to the first URL (AppRoutes.addTrainer)
//       const response = await axios.post(AppRoutes.addTrainer, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         message.success('Trainer added successfully');

//         // Sending essential data (name, email, password, and role as 'teacher') to AppRoutes.signup
//         const signupData = {
//           name: form.Name,
//           email: form.Email,
//           password: form.Password,
//           role: 'teacher', // Assuming 'teacher' is the role for trainers
//         };

//         await axios.post(AppRoutes.signUp, signupData);

//         toggleDrawer(); // Close the drawer after successful submission
//         navigate('/trainers');
//       }
//     } catch (error) {
//       message.error('Failed to add trainer');
//       console.error(error);
//     }
//   };

//   return (
//     <Drawer title="Add Trainer" placement="right" onClose={toggleDrawer} open={open} width={500}>
//       <Form onFinish={handleSubmit} layout="vertical">
//         <Form.Item label="Name" required>
//           <Input value={form.Name} onChange={(e) => setForm({ ...form, Name: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Email" required>
//           <Input value={form.Email} onChange={(e) => setForm({ ...form, Email: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Password" required>
//           <Input.Password value={form.Password} onChange={(e) => setForm({ ...form, Password: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Phone" required>
//           <Input value={form.Phone} onChange={(e) => setForm({ ...form, Phone: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="WhatsApp" required>
//           <Input value={form.Whatsapp} onChange={(e) => setForm({ ...form, Whatsapp: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="CNIC" required>
//           <Input value={form.Cnic} onChange={(e) => setForm({ ...form, Cnic: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Salary" required>
//           <Input value={form.Salary} onChange={(e) => setForm({ ...form, Salary: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Address" required>
//           <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Specialization" required>
//           <Input value={form.Specialization} onChange={(e) => setForm({ ...form, Specialization: e.target.value })} />
//         </Form.Item>
//         <Form.Item label="Courses" required>
//           <Select
//             mode="multiple"
//             value={form.Courses}
//             onChange={handleCourseChange}
//             placeholder="Select courses"
//           >
//             {courses.map(course => (
//               <Option key={course._id} value={course._id}>{course.title}</Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item label="Batches" required>
//           <Select
//             mode="multiple"
//             value={form.Batches}
//             onChange={handleBatchChange}
//             placeholder="Select batches"
//           >
//             {batches.map(batch => (
//               <Option key={batch._id} value={batch._id}>
//                 {`${batch.title} (${courses.find(c => c._id === batch.course?._id)?.title || 'Unknown Course'})`}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item label="Sections" required>
//           <Select
//             mode="multiple"
//             value={form.Sections}
//             onChange={handleSectionChange}
//             placeholder="Select sections"
//           >
//             {sections.map(section => (
//               <Option
//                 key={section._id}
//                 value={section._id}
//                 disabled={occupiedSections[section._id]}
//               >
//                 {`${section.title} (${section.batch?.title})`}
//                 {occupiedSections[section._id] && " - Trainer Assigned"}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//         <Form.Item label="Image">
//           <Upload
//             beforeUpload={() => false}
//             onChange={handleImageChange}
//             fileList={imageFileList}
//             listType="picture"
//           >
//             <Button icon={<UploadOutlined />}>Upload Image</Button>
//           </Upload>
//         </Form.Item>
//         <Form.Item label="Resume">
//           <Upload
//             beforeUpload={() => false}
//             onChange={handleResumeChange}
//             fileList={resumeFileList}
//           >
//             <Button icon={<UploadOutlined />}>Upload Resume</Button>
//           </Upload>
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" block>Add Trainer</Button>
//         </Form.Item>
//       </Form>
//     </Drawer>
//   );
// };

// export default TrainerDrawer;








import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/Constant/Constant';

const { Option } = Select;

const TrainerDrawer = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Whatsapp: '',
    Cnic: '',
    Salary: '',
    Specialization: '',
    address: '',
    Course: '',
    Password: '',
    Courses: [],
    Batches: [],
    Sections: [],
    Image: null,
    Resume: null,
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [occupiedSections, setOccupiedSections] = useState({});
  const [imageFileList, setImageFileList] = useState([]);
  const [resumeFileList, setResumeFileList] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(AppRoutes.getCourses);
      setCourses(response.data.data);
    } catch (error) {
      message.error('Failed to fetch courses.');
    }
  };

  const fetchBatches = async (courseIds) => {
    try {
      const response = await axios.get(AppRoutes.getBatch);
      const sectionsResponse = await axios.get(AppRoutes.getSections);
      const trainersResponse = await axios.get(AppRoutes.getTrainer);

      const allSections = Array.isArray(sectionsResponse.data) ? sectionsResponse.data : sectionsResponse.data.data;
      const trainers = trainersResponse.data.data;

      const newBatches = response.data.data.filter((batch) =>
        courseIds.includes(batch.course?._id)
      );

      const batchesWithOccupancy = newBatches.map(batch => {
        const batchSections = allSections.filter(section => section.batch?._id === batch._id);
        const occupiedSectionsCount = batchSections.filter(section =>
          trainers.some(trainer =>
            trainer.sections && trainer.sections.some(s => s._id === section._id)
          )
        ).length;
        return {
          ...batch,
          isFullyOccupied: occupiedSectionsCount === batchSections.length,
          occupiedSectionsCount,
          totalSections: batchSections.length
        };
      });

      setBatches(batchesWithOccupancy);

      // Update occupied sections
      const occupiedSectionsData = {};
      allSections.forEach(section => {
        occupiedSectionsData[section._id] = trainers.some(trainer =>
          trainer.sections && trainer.sections.some(s => s._id === section._id)
        );
      });

      setOccupiedSections(occupiedSectionsData);
    } catch (error) {
      message.error('Failed to fetch batches.');
    }
  };

  const fetchSections = async (batchIds) => {
    try {
      const response = await axios.get(AppRoutes.getSections);
      const allSections = Array.isArray(response.data) ? response.data : response.data.data;
      const filteredSections = allSections.filter((section) =>
        batchIds.includes(section.batch?._id)
      );
      setSections(filteredSections);
    } catch (error) {
      console.error('Error fetching sections:', error);
      message.error('Failed to fetch sections.');
    }
  };

  const handleCourseChange = (values) => {
    setForm({ ...form, Courses: values, Batches: [], Sections: [] });
    fetchBatches(values);
  };

  const handleBatchChange = (values) => {
    const newBatches = values.filter(batchId => {
      const batch = batches.find(b => b._id === batchId);
      if (batch && batch.isFullyOccupied) {
        message.warning(`All sections in batch ${batch.title} are already occupied.`);
        return false;
      }
      return true;
    });
    setForm({ ...form, Batches: newBatches, Sections: [] });
    fetchSections(newBatches);
  };

  const handleSectionChange = (values) => {
    const newSections = values.filter(sectionId => {
      if (occupiedSections[sectionId]) {
        const sectionTitle = sections.find(s => s._id === sectionId)?.title;
        message.warning(`Section ${sectionTitle} already has a trainer assigned.`);
        return false;
      }
      return true;
    });
    setForm({ ...form, Sections: newSections });
  };

  const handleImageChange = ({ file }) => {
    setImageFileList([file]);
    setForm({ ...form, Image: file });
  };

  const handleResumeChange = ({ file }) => {
    setResumeFileList([file]);
    setForm({ ...form, Resume: file });
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('Name', form.Name);
    formData.append('Email', form.Email);
    formData.append('Phone', form.Phone);
    formData.append('Whatsapp', form.Whatsapp);
    formData.append('Cnic', form.Cnic);
    formData.append('Salary', form.Salary);
    formData.append('Specialization', form.Specialization);
    formData.append('address', form.address);
    formData.append('Courses', JSON.stringify(form.Courses));
    formData.append('Batches', JSON.stringify(form.Batches));
    formData.append('Sections', JSON.stringify(form.Sections));
    formData.append('Password', form.Password);
    formData.append('image', form.Image);
    formData.append('resume', form.Resume);

    try {
      // Sending full trainer data to the first URL (AppRoutes.addTrainer)
      const response = await axios.post(AppRoutes.addTrainer, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success('Trainer added successfully');

        // Sending essential data (name, email, password, and role as 'teacher') to AppRoutes.signup
        const signupData = {
          name: form.Name,
          email: form.Email,
          password: form.Password,
          role: 'teacher', // Assuming 'teacher' is the role for trainers
        };

        await axios.post(AppRoutes.signUp, signupData);

        toggleDrawer(); // Close the drawer after successful submission
        navigate('/trainers');
      }
    } catch (error) {
      message.error('Failed to add trainer');
      console.error(error);
    }
  };

  return (
    <Drawer title="Add Trainer" placement="right" onClose={toggleDrawer} open={open} width={500}>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" required>
          <Input value={form.Name} onChange={(e) => setForm({ ...form, Name: e.target.value })} />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input value={form.Email} onChange={(e) => setForm({ ...form, Email: e.target.value })} />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input.Password value={form.Password} onChange={(e) => setForm({ ...form, Password: e.target.value })} />
        </Form.Item>
        <Form.Item label="Phone" required>
          <Input value={form.Phone} onChange={(e) => setForm({ ...form, Phone: e.target.value })} />
        </Form.Item>
        <Form.Item label="WhatsApp" required>
          <Input value={form.Whatsapp} onChange={(e) => setForm({ ...form, Whatsapp: e.target.value })} />
        </Form.Item>
        <Form.Item label="CNIC" required>
          <Input value={form.Cnic} onChange={(e) => setForm({ ...form, Cnic: e.target.value })} />
        </Form.Item>
        <Form.Item label="Salary" required>
          <Input value={form.Salary} onChange={(e) => setForm({ ...form, Salary: e.target.value })} />
        </Form.Item>
        <Form.Item label="Address" required>
          <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Form.Item>
        <Form.Item label="Specialization" required>
          <Input value={form.Specialization} onChange={(e) => setForm({ ...form, Specialization: e.target.value })} />
        </Form.Item>
        <Form.Item label="Courses" required>
          <Select
            mode="multiple"
            value={form.Courses}
            onChange={handleCourseChange}
            placeholder="Select courses"
          >
            {courses.map(course => (
              <Option key={course._id} value={course._id}>{course.title}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Batches" required>
          <Select
            mode="multiple"
            value={form.Batches}
            onChange={handleBatchChange}
            placeholder="Select available batches"
          >
            {batches.map(batch => (
              <Option
                key={batch._id}
                value={batch._id}
                disabled={batch.isFullyOccupied}
              >
                {`${batch.title} (${courses.find(c => c._id === batch.course?._id)?.title || 'Unknown Course'})`}
                {batch.isFullyOccupied
                  ? ' - Fully Occupied (No sections available)'
                  : ` - ${batch.occupiedSectionsCount}/${batch.totalSections} sections filled`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Sections" required>
          <Select
            mode="multiple"
            value={form.Sections}
            onChange={handleSectionChange}
            placeholder="Select sections"
          >
            {sections.map(section => (
              <Option
                key={section._id}
                value={section._id}
                disabled={occupiedSections[section._id]}
              >
                {`${section.title} (${section.batch?.title})`}
                {occupiedSections[section._id] && " - Trainer Assigned"}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Image">
          <Upload
            beforeUpload={() => false}
            onChange={handleImageChange}
            fileList={imageFileList}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Resume">
          <Upload
            beforeUpload={() => false}
            onChange={handleResumeChange}
            fileList={resumeFileList}
          >
            <Button icon={<UploadOutlined />}>Upload Resume</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Add Trainer</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default TrainerDrawer;

