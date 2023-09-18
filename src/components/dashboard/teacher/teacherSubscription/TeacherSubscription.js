//external imports
import { notify } from "@/helpers/utilsFuctions";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const TeacherSubscription = () => {
  const { user } = useSelector((state) => state.auth);
  const createSession = async (priceId) => {
    console.log("creating session");
    try {
      const data = await axios.post(
        `https://onedemic-server.vercel.app/api/v1/stripe/create-session`,
        {
          priceId,
          email: user?.email,
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      const url = data?.data?.session?.url;
      // console.log(data, 123);
      window.location.href = url;
    } catch (e) {
      notify(
        e.message ||
          "something went wrong , please try again or contact us at hey.onedemic@gmail.com",
        "error"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className=" text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white">
        <Card className="max-w-xs mx-auto bg-slate-100 rounded-xl">
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              className="text-center mb-4"
            >
              Subscription Card
            </Typography>
            <div className="text-center mb-4">
              <Typography variant="h6">$15.00</Typography>
              <Typography variant="subtitle1">Premium</Typography>
            </div>
            <ul className="text-left mb-4">
              <li className="flex items-center">
                <FaAngleRight className="mr-2" />
                Allow 80 students (max) at every single course
              </li>
              <li className="flex items-center">
                <FaAngleRight className="mr-2" />
                Allow 20 exams (max) at each course
              </li>
              <li className="flex items-center">
                <FaAngleRight className="mr-2" />
                Allow 15 MCQ (max) at every MCQ exam
              </li>
              <li className="flex items-center">
                <FaAngleRight className="mr-2" />
                Disable auto-enrollment while creating a course
              </li>
            </ul>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => {
                createSession("price_1NL5aWHnmJ2HS428Ee94eqm4");
              }}
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherSubscription;
