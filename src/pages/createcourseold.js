import { useState, useRef } from "react";
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

const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f0f9ff",
};

const InputForm = () => {
  const [coursePhoto, setCoursePhoto] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [autoEnroll, setAutoEnroll] = useState(false);

  const photoInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoursePhoto(URL.createObjectURL(file));
    }
  };

  const handlePhotoInputClick = () => {
    photoInputRef.current.click();
  };

  const handleSubmit = () => {
    console.log("Course Photo:", coursePhoto);
    console.log("Course Name:", courseName);
    console.log("Course Code:", courseCode);
    console.log("Auto Enroll:", autoEnroll);
  };

  return (
    <Container style={containerStyle}>
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
                  onChange={(e) => setCourseCode(e.target.value)}
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
            }}
          >
            {coursePhoto && (
              <img
                src={coursePhoto}
                alt="Course"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
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

export default InputForm;
