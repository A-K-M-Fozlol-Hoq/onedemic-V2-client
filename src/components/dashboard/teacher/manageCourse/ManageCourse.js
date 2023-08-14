import { useGetSingleCourseQuery } from "@/features/api/course/courseApi";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ManageCourse = ({ courseId }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetSingleCourseQuery(
    {
      accessToken: user?.accessToken,
      courseId: courseId,
    },
    { staleTime: 0 }
  );

  const router = useRouter();

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
    console.log(
      `Remove student with ID: ${studentId} from course: ${courseId}`
    );
    // need to send courseId , studentId and accessToken
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
    router.back();
    console.log("Navigating back...");
  };

  return (
    <div className="p-6 md:p-10 flex justify-center">
      <div className="">
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            style={{ marginRight: "10px" }}
          >
            Back
          </Button>
          <h1 className="text-lg font-semibold text-gray-600">Manage Course</h1>
        </div>
        <div className="flex justify-between gap-9">
          <div className="gap-1">
            <Tooltip title={courseId}>
              <h1 className="text-4xl font-bold text-gray-700">
                {courseData.name}
              </h1>
            </Tooltip>
            {courseData.photo && (
              <Image
                src={courseData.photo}
                alt="Course Photo"
                width={180}
                height={180}
                className="rounded-xl border border-dotted border-cyan-600"
              />
            )}
          </div>
          <div className="flex justify-center items-center">
            {courseData && (
              <div className="p-12">
                <p className="flex text-xl">
                  Students : {courseData.students.length}
                </p>
                <p className="flex text-xl">
                  Blocked: {courseData.blockedStudents.length}
                </p>
                <p className="flex text-xl">
                  Pending: {courseData.pendingStudents.length}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 w-full max-w-3xl">
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
    </div>
  );
};

export default ManageCourse;
