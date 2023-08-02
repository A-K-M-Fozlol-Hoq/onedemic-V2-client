import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Switch,
} from "@material-ui/core";
import { useRouter } from "next/router";

const CourseCards = ({ courses, redirectDetails = false }) => {
  const { push } = useRouter();

  const redirectManageCourse = (id) => {
    push(`/dashboard/manage-course/${id}`);
  };
  return (
    <section className="flex flex-wrap justify-center mt-8">
      {courses.map((course) => (
        <Card
          key={course}
          className="w-64 md:w-96 mx-4 my-2 bg-blue-100 rounded-lg shadow-md"
        >
          <CardContent className="flex flex-col items-center p-4">
            <CardMedia
              component="img"
              alt="Course Photo"
              image={course.photo}
              className="w-full h-48 object-cover rounded-md"
            />
            <Typography variant="h6" mt={2} align="center" gutterBottom>
              Course {course.name}
            </Typography>
            {redirectDetails && (
              <Button
                onClick={() => redirectManageCourse(course._id)}
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Manage Course
              </Button>
            )}
            {/* <div className="flex items-center mt-2">
              <Switch color="primary" />
              <Typography variant="body2" className="ml-2">
                Enable Auto Enroll
              </Typography>
            </div> */}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default CourseCards;
