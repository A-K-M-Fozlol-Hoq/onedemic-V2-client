import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="bg-blue-500 min-h-screen">
      <Container maxWidth="lg" className="py-10">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Image
              src="/onedemic.png"
              alt="onedemic Image"
              width={700}
              height={500}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className="text-white text-center">
              Welcome to our Online Education Platform
            </Typography>
            <Typography variant="body1" className="text-white mt-5">
              Our platform allows teachers to create courses and exams for both
              written and multiple-choice questions, mark exams, download
              results, remove or block students from the course, and chat with
              students. Students can enroll and attend exams.
            </Typography>
            <div className="mt-5 flex justify-center">
              <Button
                variant="contained"
                color="primary"
                className="bg-white text-blue-500 hover:text-blue-600"
              >
                Get Started
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
