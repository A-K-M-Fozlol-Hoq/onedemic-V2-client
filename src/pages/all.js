import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Switch,
} from "@material-ui/core";
import { ToggleSwitchIcon } from "@heroicons/react/solid";

const CourseSection = () => {
  return (
    <section className="flex flex-wrap justify-center mt-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((course) => (
        <Card
          key={course}
          className="w-64 md:w-96 mx-4 my-2 bg-blue-100 rounded-lg shadow-md"
        >
          <CardContent className="flex flex-col items-center p-4">
            <CardMedia
              component="img"
              alt="Course Photo"
              image="https://avatars.githubusercontent.com/u/61866994?v=4"
              className="w-full h-48 object-cover rounded-md"
            />
            <Typography variant="h6" align="center" gutterBottom>
              Course {course}
            </Typography>
            <Button variant="contained" color="primary" className="mt-4">
              Enroll Now
            </Button>
            <div className="flex items-center mt-2">
              <Switch color="primary" />
              <Typography variant="body2" className="ml-2">
                Enable Auto Enroll
              </Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default CourseSection;
