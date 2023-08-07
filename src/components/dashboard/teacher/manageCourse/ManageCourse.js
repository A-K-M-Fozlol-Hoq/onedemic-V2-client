import { useGetSingleCourseQuery } from "@/features/api/course/courseApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";

const ManageCourse = ({ courseId }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetSingleCourseQuery(
    {
      accessToken: user?.accessToken,
      courseId: courseId,
    },
    { staleTime: 0 }
  );

  useEffect(() => {
    console.log({ data, isLoading });
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p style={{ fontSize: "24px", color: "#718096" }}>Loading...</p>
      </div>
    );
  }

  if (!isLoading && !data?.data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p style={{ fontSize: "24px", color: "#718096" }}>No course found</p>
      </div>
    );
  }

  const courseData = data?.data;

  const handleRemove = (studentId) => {
    console.log(`Remove student with ID: ${studentId}`);
  };

  const handleBlock = (studentId) => {
    console.log(`Block student with ID: ${studentId}`);
  };

  const handleUnblock = (studentId) => {
    console.log(`Unblock student with ID: ${studentId}`);
  };

  const handleAccept = (studentId) => {
    console.log(`Accept student with ID: ${studentId}`);
  };

  const handleReject = (studentId) => {
    console.log(`Reject student with ID: ${studentId}`);
  };

  const handleBack = () => {
    // Implement the logic to handle the back button, e.g., navigate back
    console.log("Navigating back...");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          style={{ marginRight: "10px" }}
        >
          Back
        </Button>
        <br />
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          Manage Course - {courseId}
        </h1>
      </div>
      {courseData && (
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Course Name: {courseData.name}
          </h2>
          {courseData.photo && (
            <div
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                marginBottom: "10px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <Image
                src={courseData.photo}
                alt="Course Photo"
                width={300}
                height={300}
              />
            </div>
          )}
          <p>Number of Students: {courseData.students.length}</p>
          <p>Number of Blocked Students: {courseData.blockedStudents.length}</p>
          <p>Number of Pending Students: {courseData.pendingStudents.length}</p>
        </div>
      )}
      <div className="w-full max-w-3xl">
        <div>
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Students</h3>
          {courseData?.students?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseData.students.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => handleRemove(student._id)}
                        >
                          Remove
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => handleBlock(student._id)}
                        >
                          Block
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <i>No students</i>
          )}
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Blocked Students
          </h3>
          {courseData?.blockedStudents?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseData.blockedStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          onClick={() => handleUnblock(student._id)}
                        >
                          Unblock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <i>No Blocked Students</i>
          )}
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            Pending Students
          </h3>
          {courseData?.pendingStudents?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseData.pendingStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => handleAccept(student._id)}
                        >
                          Accept
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => handleReject(student._id)}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <i>No Pending Students</i>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
