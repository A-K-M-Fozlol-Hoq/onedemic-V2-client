import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { useDeleteExamMutation } from "@/features/api/exam/examApi";
import { notify } from "@/helpers/utilsFuctions";
import { useSelector } from "react-redux";
const SelectExam = ({ exams, setSelectExam }) => {
  const { user } = useSelector((state) => state.auth);
  const [deleteExam, { isError, isSuccess, error }] = useDeleteExamMutation();
  const currentDateTime = new Date();

  useEffect(() => {
    if (isError) {
      const message = error?.data?.message || "Failed to delete exam";
      notify(message, "error");
    }
    if (isSuccess) {
      notify("Exam deleted successfully", "success");
    }
  }, [isError, isSuccess, error]);
  const handleDeleteExam = (exam) => {
    console.log(exam);
    const currentDateTime = new Date();
    const startDateTime = new Date(exam.startDateTime);
    const isDeletable = currentDateTime <= startDateTime;
    if (!isDeletable) {
      notify("Exam already started", "error");
    } else {
      deleteExam({ accessToken: user.accessToken, examId: exam?._id });
    }
  };

  return (
    <section className="flex flex-wrap justify-center mt-8">
      {exams.map((exam) => {
        const startDateTime = new Date(exam.startDateTime);
        const endDateTime = new Date(exam.endDateTime);
        const isExamStarted = currentDateTime >= startDateTime;
        const isDeletable = currentDateTime <= startDateTime;

        return (
          <Card
            key={exam._id}
            className="w-64 md:w-96 mx-4 my-2 bg-blue-100 rounded-lg shadow-md"
          >
            <CardContent className="flex flex-col items-center p-4">
              <CardMedia
                component="img"
                alt="Course Photo"
                image={exam?.course?.photo}
                className="w-full h-48 object-cover rounded-md"
              />
              <Typography variant="h6" mt={2} align="center" gutterBottom>
                Course: {exam?.course?.name}
              </Typography>
              <Typography align="center" gutterBottom>
                Exam: {exam?.examName}
              </Typography>
              <Typography align="center" gutterBottom>
                Type: {exam?.examType}
              </Typography>

              <Button
                onClick={() => setSelectExam(exam)}
                variant="contained"
                color="primary"
                className="mt-4"
                disabled={!isExamStarted} // Disable the button if the exam is not started yet
              >
                View Result
              </Button>
              <Button
                onClick={() => handleDeleteExam(exam)}
                variant="contained"
                color="warning"
                className="mt-4"
                disabled={!isDeletable} // Disable the button if the exam already started
              >
                Delete Exam
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default SelectExam;
