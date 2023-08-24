import React, { useEffect, useState } from "react";
import { Modal, Button, TextField } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useEnrollCourseMutation } from "@/features/api/course/courseApi";
import { notify } from "@/helpers/utilsFuctions";
import { useSelector } from "react-redux";
import ViewCourses from "../../ViewCourses/ViewCourses";

const ManageCourse = () => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState("");
  const isCourseCodeValid = courseCode.length === 6;
  const [enrollCourse, { data, isError, isSuccess, error }] =
    useEnrollCourseMutation();

  useEffect(() => {
    if (isError) {
      const message = error?.data?.message || "Failed to enroll course";
      notify(message, "error");
    }
    if (isSuccess && data?.message) {
      notify(data?.message, "success");
    }
  }, [isError, isSuccess, error, data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCourseCode(""); // Clear course code input on modal close
  };

  const handleEnrollCourse = () => {
    // You can add your server request logic here to enroll the course.
    console.log("Enrolling course with code:", courseCode);

    const data = {
      courseCode: courseCode,
      studentId: user?._id,
    };
    console.log({ accessToken: user.accessToken, data });
    enrollCourse({ accessToken: user.accessToken, data });

    handleCloseModal(); // Close the modal after enrolling
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8">
      <div className="w-2/3 flex justify-between items-center">
        <h1 className="text-4xl font-bold">All courses</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
          onClick={handleOpenModal}
        >
          Enroll new course
        </button>
      </div>
      <div className="mt-8">
        {/* Replace 'AllCourses' with your 'AllCourses' component */}
        <ViewCourses />
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <div className="w-1/3 p-4 bg-white rounded shadow-lg">
          <div className="flex justify-end">
            {/* Use the close icon from React Icons */}
            <button onClick={handleCloseModal}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">Enroll new course</h2>
          <TextField
            label="Course Code"
            variant="outlined"
            fullWidth
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            error={!isCourseCodeValid}
            helperText={
              isCourseCodeValid ? "" : "Course code must be 6 characters"
            }
          />
          <Button
            variant="outlined"
            color="primary"
            className="mt-4"
            onClick={handleEnrollCourse}
            disabled={!isCourseCodeValid}
          >
            Enroll
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageCourse;
