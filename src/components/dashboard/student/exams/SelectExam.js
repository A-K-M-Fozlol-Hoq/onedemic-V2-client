import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";

const SelectExam = ({ exams, setSelectExam }) => {
  const currentDateTime = new Date();

  return (
    <section className="flex flex-wrap justify-center mt-8">
      {exams.map((exam) => {
        const startDateTime = new Date(exam.startDateTime);
        const endDateTime = new Date(exam.endDateTime);

        const isExamRunning =
          currentDateTime >= startDateTime && currentDateTime <= endDateTime;

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
                disabled={!isExamRunning} // Disable the button if the exam is not running
              >
                Start Exam
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default SelectExam;
