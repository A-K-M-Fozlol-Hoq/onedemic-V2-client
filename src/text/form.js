import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="bg-blue-500 min-h-screen">
      <Container maxWidth="lg" className="py-10">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Image
              src="/hero-image.png"
              alt="Hero Image"
              width={700}
              height={500}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="p-5 bg-white">
              <Typography variant="h4" className="text-center">
                Learn From the Best Online Education Platform
              </Typography>
              <form className="mt-5">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-blue-500"
                      placeholder="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="password"
                      className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-blue-500"
                      placeholder="Password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <div className="mt-5 text-center">
                <p className="text-gray-500">Dont have an account yet?</p>
                <Button
                  variant="text"
                  color="primary"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign Up Now
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
