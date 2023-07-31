import auth from "@/firebase/firebase.config";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Navbar() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user?.email) {
        setUser(user);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar className="bg-blue-700 px-10 sm:px-16 md:px-32">
          <Toolbar className="flex justify-between">
            <Typography component="div">
              <Link href={`/`} className="text-2xl font-bold">
                OneDemic
              </Link>
            </Typography>
            <Typography component="div">
              {!user?.email ? (
                <Link
                  href={`login`}
                  className="px-6 py-2 border font-semibold border-blue-50 rounded-lg"
                >
                  Login
                </Link>
              ) : (
                // <p className="text-semibold">{user.email || "John Doe"}</p>
                <Link
                  href={`dashboard/manage-profile`}
                  className="px-6 py-2 border font-semibold border-blue-50 rounded-lg"
                >
                  Dashboard
                </Link>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
