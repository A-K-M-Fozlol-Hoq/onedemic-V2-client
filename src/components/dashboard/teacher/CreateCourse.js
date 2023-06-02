import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, InputLabel } from "@material-ui/core";
import { useRouter } from "next/router";

const CreateCourse = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("image", data.courseImage[0]);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=YOUR_API_KEY",
        formData
      );
      const imageUrl = response.data.data.url;

      const courseData = {
        courseCode: data.courseCode,
        courseName: data.courseName,
        imageUrl: imageUrl,
      };

      const createCourseResponse = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const result = await createCourseResponse.json();
      setSubmitting(false);
      reset();
      router.push("/");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-700 p-8 rounded-md shadow-md max-w-lg mx-auto sm:mt-0 md:mt-8 lg:mt-16 lg:ml-auto lg:mr-">
      <h2 className="text-white text-2xl font-bold mb-8">Create Course</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextField
            label="Course Code"
            name="courseCode"
            inputProps={register("courseCode", { required: true })}
            fullWidth
            variant="outlined"
            className="bg-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <InputLabel shrink>Course Image</InputLabel>
          <TextField
            name="courseImage"
            type="file"
            inputProps={register("courseImage", { required: true })}
            fullWidth
            variant="outlined"
            className="bg-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Course Name"
            name="courseName"
            inputProps={register("courseName", { required: true })}
            fullWidth
            variant="outlined"
            className="bg-white rounded-md"
          />
        </div>
        <div className="mt-8">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitting}
            className={`bg-green-500 hover:bg-green-600 text-white rounded-md p-2 ${
              submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
