import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Input, message, Form, Row, Col, Select } from "antd";
import { useAuth } from "@/Context/AuthContext"; // Assuming you have an AuthContext
import { AppRoutes } from "@/Constant/Constant";

const { TextArea } = Input;

const ReviewAssignment = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [comment, setComment] = useState("");
  const [trainerData, setTrainerData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`);
        setTrainerData(response.data);
      } catch (error) {
        setError("Failed to fetch trainer data. Please try again.");
      }
    };

    if (user && user._id) {
      fetchTrainerData();
    }
  }, [user]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        if (!user || !user._id) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`${AppRoutes.getTrainerCourses}/${user._id}`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load trainer data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  useEffect(() => {
    fetchSubmittedAssignments();
  }, [trainerData]);

  const fetchSubmittedAssignments = async () => {
    if (!trainerData || !trainerData.trainerID) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${AppRoutes.getSubmittedAssignments}?trainer=${trainerData.trainerID}`
      );
      setSubmittedAssignments(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch submitted assignments. Please try again.");
      setLoading(false);
    }
  };

  const handleReview = async (id, grade) => {
    try {
      await axios.put(`${AppRoutes.reviewAssignment}/${id}`, { grade, comment });
      message.success("Assignment reviewed successfully");
      setComment("");
      setSelectedAssignment(null);
      fetchSubmittedAssignments();
    } catch (error) {
      message.error("Failed to review assignment. Please try again.");
    }
  };

  // Handle loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0782e0]"></div>
      </div>
    );
  }

  const columns = [
    {
      title: "Assignment",
      dataIndex: ["assignment", "name"],
      key: "assignment",
    },
    {
      title: "Student",
      dataIndex: ["student", "name"],
      key: "student",
    },
    {
      title: "Video Link",
      dataIndex: "videoLink",
      key: "videoLink",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Video Link
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Code Link",
      dataIndex: "codeLink",
      key: "codeLink",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Code Link
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Deployment Link",
      dataIndex: "deploymentLink",
      key: "deploymentLink",
      render: (link) =>
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Deployment Link
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Submission Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => setSelectedAssignment(record)}
          style={{
            backgroundColor: "#0561a6",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
          }}
        >
          View Details
        </Button>
      ),
    },
  ];
  
  return (
    <div className="shadow-lg">
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#0561a6", marginBottom: "20px" }}>
        Review Assignments
      </h1>

      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Form for selecting course, batch, and section */}
        <Form layout="inline" className="mb-6 sm:mb-8">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a course"
                onChange={(value) => {
                  setSelectedCourse(value);
                  setSelectedBatch("");
                  setSelectedSection("");
                }}
              >
                {courses.map((course) => (
                  <Option key={course.courseName} value={course.courseName}>
                    {course.courseName}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} sm={8}>
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a batch"
                onChange={(value) => {
                  setSelectedBatch(value);
                  setSelectedSection("");
                }}
                disabled={!selectedCourse}
              >
                {courses.find(c => c.courseName === selectedCourse)?.batches.map((batch) => (
                  <Option key={batch._id} value={batch._id}>{batch.title}</Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} sm={8}>
              <Select
                className="rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-[#0561a6]"
                placeholder="Select a section"
                onChange={(value) => setSelectedSection(value)}
                disabled={!selectedBatch}
              >
                {courses
                  .find((c) => c.courseName === selectedCourse)
                  ?.sections.map((section) => (
                    <Option key={section.title} value={section.title}>
                      {section.title}
                    </Option>
                  ))}
              </Select>
            </Col>
          </Row>
        </Form>

        <Table
          dataSource={submittedAssignments}
          columns={columns}
          rowKey="_id"
          loading={loading}
          bordered
          style={{ borderRadius: "10px" }}
          // className="bg-white rounded-lg shadow-md overflow-hidden"
          responsive={true}  // Enable responsive design for the table
          className="trainer-table-container"
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
      </div>

      <Modal
        title={
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#34A853" }}>
            {selectedAssignment?.assignment.name || "Assignment Details"}
          </div>
        }
        open={!!selectedAssignment}
        onCancel={() => setSelectedAssignment(null)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setSelectedAssignment(null)}
            style={{
              backgroundColor: "#F1F3F4",
              color: "#34A853",
              border: "1px solid #34A853",
              borderRadius: "5px",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{
              backgroundColor: "#0561a6",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() =>
              handleReview(selectedAssignment._id, selectedAssignment.grade)
            }
          >
            Submit Review
          </Button>,
        ]}
        bodyStyle={{
          padding: "20px",
          backgroundColor: "#F9F9F9",
        }}
        centered
      >
        {selectedAssignment && (
          <div style={{ padding: "10px", backgroundColor: "#ffffff", borderRadius: "10px" }}>
            <p>
              <strong>Student:</strong> {selectedAssignment.student.name}
            </p>
            <p>
              <strong>Course:</strong> {selectedAssignment.student.course?.title}
            </p>
            <p>
              <strong>Submitted On:</strong>{" "}
              {new Date(selectedAssignment.createdAt).toLocaleString()}
            </p>
            <div>
              <strong>Video Link:</strong>
              <p style={{ color: "#4285F4", wordBreak: "break-word" }}>
                {selectedAssignment.videoLink}
              </p>
            </div>
            <div>
              <strong>Code Link:</strong>
              <p style={{ color: "#4285F4", wordBreak: "break-word" }}>
                {selectedAssignment.codeLink}
              </p>
            </div>
            <div>
              <strong>Deployment Link:</strong>
              <p style={{ color: "#4285F4", wordBreak: "break-word" }}>
                {selectedAssignment.deploymentLink}
              </p>
            </div>
            <div>
              <strong>File:</strong>
              <img
                src={selectedAssignment.file}
                alt="Assignment File"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <TextArea
                rows={3}
                placeholder="Add comments for the student"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ borderRadius: "5px" }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewAssignment;

