import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Descriptions, Image, QRCode, Modal, Form, Input, Select, message, Upload, Spin, Space } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { AppRoutes } from '@/Constant/Constant';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image as PDFImage, Font } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import SmitLogo from '@/assets/images/logo.png';

const { Option } = Select;

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' },
  ]
});

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    width: '48%',
    height: 'auto',
    border: '1px solid #000000',
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  header: {
    height: 45,
    backgroundColor: '#005CB8',
    position: 'relative',
    overflow: 'hidden',
  },
  greenStripe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: '#7AB928',
    transform: 'skewY(-8deg)',
    transformOrigin: 'left',
  },
  logo: {
    width: 130,
    height: 70,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  programTitle: {
    color: '#005CB8',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Helvetica-Bold',
    padding: '0 10px',
  },
  photoFrame: {
    width: 110,
    height: 130,
    alignSelf: 'center',
    border: '2px solid #7AB928',
    marginBottom: 15,
  },
  studentPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  studentName: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    marginBottom: 5,
  },
  courseInfo: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  rollNumber: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    marginBottom: 10,
  },
  detailsContainer: {
    padding: '30px 20px',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    width: 75,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    flex: 1,
    fontSize: 9,
    borderBottom: '1px solid #000000',
    paddingBottom: 2,
  },
  qrCode: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: 10,
  },
  note: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 15,
  },
  signature: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 55,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    borderTopStyle: 'solid',
    paddingTop: 5,
    width: 150,
    alignSelf: 'center',
  },
  footer: {
    height: 45,
    backgroundColor: '#005CB8',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerGreen: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: '#7AB928',
    transform: 'skewY(8deg)',
    transformOrigin: 'right',
  },
  instructions: {
    marginTop: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    color: '#FF0000',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 10,
    marginBottom: 5,
    paddingLeft: 15,
  },
});

// PDF Document Component
const PDFDocument = ({ student }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.cardRow}>
        {/* Front Card */}
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.greenStripe} />
          </View>

          <PDFImage
            src={SmitLogo}
            style={styles.logo}
          />

          <Text style={styles.programTitle}>SAYLANI MASS IT TRAINING PROGRAM</Text>

          <View style={styles.photoFrame}>
            <PDFImage
              src={student.image || "/placeholder.svg"}
              style={styles.studentPhoto}
            />
          </View>

          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.courseInfo}>{student.course.title}</Text>
          <Text style={styles.rollNumber}>WMA: {student.rollNumber}</Text>

          <View style={styles.footer}>
            <View style={styles.footerGreen} />
          </View>
        </View>

        {/* Back Card */}
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.greenStripe} />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}> {student.name}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Father name:</Text>
              <Text style={styles.value}> {student.fatherName}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>CNIC:</Text>
              <Text style={styles.value}> {student.cnic}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Course:</Text>
              <Text style={styles.value}> {student.course?.title}</Text>
            </View>
          </View>

          <View style={styles.qrCode}>
            <PDFImage
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${student._id}`}
            />
          </View>

          <Text style={styles.note}>Note: This card is for SMIT premises only.</Text>
          <Text style={styles.note}>If found please return to SMIT</Text>

          <Text style={styles.signature}>Issuing authority</Text>

          <View style={styles.footer}>
            <View style={styles.footerGreen} />
          </View>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionText}>• Please colour print of this Admit/ID card</Text>
        <Text style={styles.instructionText}>• Attestation of ID/Admit Card is extremely mandatory from SMIT</Text>
        <Text style={styles.instructionText}>• No student will be allowed to enter in Entry Test without attestation of Admit/ID Card</Text>
        <Text style={styles.instructionText}>• Bring CNIC and Last qualification Marksheet/Certification. (both original) at the time of Attestation.</Text>
        <Text style={styles.instructionText}>• Address: Saylani Head office 4th floor Bahadurabad char minaar chowrangi/Gulshan Campus</Text>
        <Text style={styles.instructionText}>  (2nd Floor, Mumtaz Mobile Mall, Gulshan Chowrangi)</Text>
        <Text style={[styles.instructionText, { color: '#005CB8', marginTop: 10 }]}>Donate Us: https://www.saylaniwelfare.com</Text>
      </View>
    </Page>
  </Document>
);

export const StudentTable = ({ students }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form] = Form.useForm();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sections, setSections] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Show drawer with selected student details
  const showDrawer = (student) => {
    setSelectedStudent(student);
    setDrawerVisible(true);
  };

  // Close drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStudent(null);
  };

  // Show modal for editing student details
  const showEditModal = (student) => {
    setSelectedStudent(student);
    setImageUrl(student?.image);
    form.setFieldsValue({
      ...student,
      image: student.image,
      trainer: student.trainer?._id,
      course: student.course?._id,
      batch: student.batch?._id,
      section: student.section?._id,
    });
    fetchBatchesForCourse(student.course?._id);
    fetchSectionsForBatch(student.batch?._id);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedStudent(null);
    setImageUrl(null);
    setImageFile(null);
  };

  // Handle form submission
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('fatherName', values.fatherName);
      formData.append('rollNumber', values.rollNumber);
      formData.append('phoneNo', values.phoneNo);
      formData.append('cnic', values.cnic);
      formData.append('fatherCnic', values.fatherCnic);
      formData.append('email', values.email);
      formData.append('qualification', values.qualification);
      formData.append('trainer', values.trainer);
      formData.append('course', values.course);
      formData.append('batch', values.batch);
      formData.append('section', values.section);
      formData.append('address', values.address);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${AppRoutes.updateStudent}/${selectedStudent._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      message.success('Student updated successfully');
      closeModal();
    } catch (error) {
      console.error('Error updating student:', error);
      message.error('Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const deleteStudent = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`${AppRoutes.deleteStudent}/${studentToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      message.success('Student deleted successfully');
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting student:', error);
      message.error('Failed to delete student');
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchTrainers = async () => {
      setTableLoading(true);
      try {
        const response = await axios.get(AppRoutes.getTrainer);
        setTrainers(response.data.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      } finally {
        setTableLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(AppRoutes.getCourses);
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch courses');
      setCourses(data.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchBatchesForCourse = async (courseId) => {
    setLoading(true);
    try {
      const response = await fetch(AppRoutes.getBatch);
      const data = await response.json();
      const filteredBatches = data.data.filter(batch => batch.course?._id === courseId);
      setBatches(filteredBatches);
    } catch (error) {
      message.error('Failed to fetch batches.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionsForBatch = async (batchId) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (student) => {
    const blob = await pdf(<PDFDocument student={student} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${student.name}_ID_Card.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => showDrawer(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ marginLeft: 8 }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              setStudentToDelete(record);
              setDeleteModalVisible(true);
            }}
            style={{ marginLeft: 8 }}
          />
          <Button
            icon={<DownloadOutlined />}
            onClick={() => generatePDF(record)}
            style={{ marginLeft: 8 }}
          >
            Download PDF
          </Button>
        </Space>
      ),
    },
  ];

  if (tableLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0561a6]"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <Table
        dataSource={students}
        columns={columns}
        rowKey="_id"
        // pagination={{ pageSize: 10 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
        pagination={false}
        scroll={{ y: 400, x: "max-content" }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
        }
      />
      <style jsx>{`
        .ant-table-tbody > tr > td {
          padding: 8px 16px;
          font-size: 12px;
        }
      `}</style>

      <Drawer
        title="Student Details"
        placement="right"
        visible={drawerVisible}
        onClose={closeDrawer}
        width={500}
      >
        {selectedStudent && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedStudent?.name}</Descriptions.Item>
            <Descriptions.Item label="Father Name">{selectedStudent?.fatherName}</Descriptions.Item>
            <Descriptions.Item label="Roll No">{selectedStudent?.rollNumber}</Descriptions.Item>
            <Descriptions.Item label="Phone No">{selectedStudent?.phoneNo}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedStudent?.email}</Descriptions.Item>
            <Descriptions.Item label="CNIC">{selectedStudent?.cnic}</Descriptions.Item>
            <Descriptions.Item label="Father CNIC">{selectedStudent?.fatherCnic}</Descriptions.Item>
            <Descriptions.Item label="Qualification">{selectedStudent?.qualification}</Descriptions.Item>
            <Descriptions.Item label="Campus">{selectedStudent?.campus?.title}</Descriptions.Item>
            <Descriptions.Item label="Trainer Name">{selectedStudent?.trainer?.name}</Descriptions.Item>
            <Descriptions.Item label="Course Title">{selectedStudent?.course?.title}</Descriptions.Item>
            <Descriptions.Item label="Batch Title">{selectedStudent?.batch?.title}</Descriptions.Item>
            <Descriptions.Item label="Section Title">{selectedStudent?.section?.title}</Descriptions.Item>
            <Descriptions.Item label="Address">{selectedStudent?.address}</Descriptions.Item>
            <Descriptions.Item label="QR Code">
              <QRCode value={selectedStudent?._id} size={128} />
            </Descriptions.Item>
            <Descriptions.Item label="Image">
              <Image
                width={200}
                src={selectedStudent?.image || "/placeholder.svg"}
              />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      <Modal
        title="Edit Student Details"
        visible={modalVisible}
        onCancel={closeModal}
        onOk={() => form.submit()}
        width={800}
        confirmLoading={loading}
      >
        <Spin spinning={loading} tip="Updating student...">
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="fatherName" label="Father Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="rollNumber" label="Roll No" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="phoneNo" label="Phone No" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="cnic" label="CNIC" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="fatherCnic" label="Father CNIC" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="qualification" label="Qualification">
                <Input />
              </Form.Item>
              <Form.Item name="trainer" label="Trainer" rules={[{ required: true }]}>
                <Select>
                  {trainers?.map((trainer) => (
                    <Option key={trainer._id} value={trainer._id}>{trainer.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="course" label="Course" rules={[{ required: true }]}>
                <Select onChange={fetchBatchesForCourse}>
                  {courses?.map((course) => (
                    <Option key={course._id} value={course._id}>{course.title}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="batch" label="Batch" rules={[{ required: true }]}>
                <Select onChange={fetchSectionsForBatch}>
                  {batches?.map((batch) => (
                    <Option key={batch._id} value={batch._id}>{batch.title}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="section" label="Section" rules={[{ required: true }]}>
                <Select>
                  {sections?.map((section) => (
                    <Option key={section._id} value={section._id}>{section.title}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="address" label="Address">
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Image">
                <Upload
                  accept="image/*"
                  customRequest={({ file, onSuccess }) => {
                    setImageUrl(URL.createObjectURL(file));
                    setImageFile(file);
                    onSuccess();
                  }}
                  listType="picture"
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                {imageUrl && (
                  <div style={{ marginTop: '10px' }}>
                    <Image
                      width={100}
                      src={imageUrl || "/placeholder.svg"}
                    />
                  </div>
                )}
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </Modal>

      <Modal
        title="Delete Student"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={deleteStudent}
        okText="Delete"
        cancelText="Cancel"
        confirmLoading={deleteLoading}
      >
        <p>Are you sure you want to delete this student?</p>
      </Modal>
    </div>
  );
};

