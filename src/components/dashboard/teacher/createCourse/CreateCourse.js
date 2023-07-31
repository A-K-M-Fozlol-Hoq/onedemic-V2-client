/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { notify } from "@/helpers/utilsFuctions";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAddCourseMutation } from "@/features/api/course/courseApi";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f0f9ff",
  padding: "25px",
};

const CreateCourse = () => {
  const { user } = useSelector((state) => state.auth);
  const [coursePhoto, setCoursePhoto] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [autoEnroll, setAutoEnroll] = useState(true);
  const [addCourse, { isError, isSuccess }] = useAddCourseMutation();
  const photoInputRef = useRef(null);
  const [isCodeAvailable, setIsCodeAvailable] = useState(false);

  useEffect(() => {
    if (isError) {
      notify("Failed to create course", "error");
    }
    if (isSuccess) {
      notify("Course created successfully", "success");
    }
  }, [isError, isSuccess]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    try {
      const imageData = new FormData();
      imageData.set("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);
      imageData.append("image", file);
      notify("Image uploading...", "info");

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();

      setCoursePhoto(data?.data?.url);

      notify("Image uploaded successfully - " + data?.data?.url, "success");

      // setImage(data?.data?.url || "");
    } catch (e) {
      notify(e.message || "Failed to upload imaage", "error");
    }
  };

  const handlePhotoInputClick = () => {
    photoInputRef.current.click();
  };

  const handleSubmit = async () => {
    console.log("Course Photo:", coursePhoto);
    console.log("Course Name:", courseName);
    console.log("Course Code:", courseCode);
    console.log("Auto Enroll:", autoEnroll);
    if (!coursePhoto || !courseName || !courseCode) {
      notify("Please enter course anme, code and photo properly", "error");
      return;
    }
    if (courseCode.length < 6 || courseCode.length > 10) {
      notify("Length of course code should be between 6 and 10", "error");
    }
    console.log(user);
    const data = {
      name: courseName,
      teacherId: user?._id,
      code: courseCode,
      photo: coursePhoto,
      autoEnroll,
    };
    console.log({ accessToken: user.accessToken, data });
    addCourse({ accessToken: user.accessToken, data });
    // name, teacherId, code, photo, autoEnroll
    // const response = await axios.get(
    //   `${process.env.NEXT_PUBLIC_DEV_URL}/course/is-code-available/${value}`,
    //   {
    //     headers: { Authorization: `Bearer ${user.accessToken}` },
    //   }
    // );
    // console.log(response?.data, response.data.isSuccess);
    // if (response?.data?.available) {
    //   notify("Course Created Successfully", "success");
    // }
  };

  // Debounce function implementation
  function debounce(callback, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }
  //
  const debouncedSendAPIRequest = debounce(async (value) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_URL}/course/is-code-available/${value}`,
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    );
    setIsCodeAvailable(response?.data?.available || false);
    if (response?.data?.available) {
      notify(`${value} - this course code is available`, "success");
    } else {
      notify(`${value} - this course code is not available`, "warning");
    }
  }, 500); // Adjust the debounce time (in milliseconds) as needed

  // Event handler for the input field
  const handleCourseCodeChange = (event) => {
    const newValue = event.target.value;
    setCourseCode(newValue);
    debouncedSendAPIRequest(newValue);
  };

  return (
    <Container
      sx={{ minHeight: "90vh", marginTop: "5vh", minWidth: "70%" }}
      // md={{ height: "60vh", marginTop: "20vh" }}
      maxWidth="sm"
      style={containerStyle}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="course-photo">Course Photo</InputLabel>
                <input
                  accept="image/*"
                  id="course-photo"
                  type="file"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                  ref={photoInputRef}
                />
                <TextField
                  variant="outlined"
                  value={coursePhoto ? coursePhoto.name : ""}
                  fullWidth
                  disabled
                  onClick={handlePhotoInputClick}
                  sx={{ "& label.Mui-focused": { color: blue[700] } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="course-name">Course Name</InputLabel>
                <TextField
                  id="course-name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{ "& label.Mui-focused": { color: blue[700] } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="course-code">Course Code</InputLabel>
                <TextField
                  id="course-code"
                  value={courseCode}
                  onChange={(e) => handleCourseCodeChange(e)}
                  fullWidth
                  variant="outlined"
                  sx={{ "& label.Mui-focused": { color: blue[700] } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoEnroll}
                    onChange={(e) => setAutoEnroll(e.target.checked)}
                    color="primary"
                    sx={{ "& .Mui-checked": { color: green[500] } }}
                  />
                }
                label="Auto Enroll"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={
                  courseName && courseCode && coursePhoto && !isCodeAvailable
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {coursePhoto && (
              <img
                src={coursePhoto}
                alt="Course"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
            )}
            <div>
              <p>Course Name: {courseName}</p>
              <p>Course Code: {courseCode}</p>
              <p>Auto Enroll: {autoEnroll ? "True" : "False"}</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateCourse;
