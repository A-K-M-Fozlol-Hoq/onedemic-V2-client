//external imports
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";

const StudentSubscription = () => {
  const createSession = async (priceId) => {
    console.log("creating session");
    try {
      const { data: response } = await axios.post(
        `${BASE_URL}api/v1/stripe/createSession`,
        {
          priceId,
          email: dbUser.email,
        },
        {
          headers: { Authorization: `Bearer ${dbUser.token}` },
        }
      );
      const url = response?.session?.url;
      // console.log(response.session, 123);
      window.location.href = url;
    } catch (e) {
      toast(
        "something went wrong , please try again or contact us at hey@tweetsy.io",
        {
          autoClose: 5000,
          type: "warning",
        }
      );
    }
  };
  // const createSession = async (priceId) => {
  //   axios
  //     .put(`${process.env.NEXT_PUBLIC_DEV_URL}/stripe/create-session`, body, {
  //       headers: { Authorization: `Bearer ${user.accessToken}` },
  //     })
  //     .then((data) => {
  //       const newUser = { ...user };
  //       newUser.name = name;
  //       newUser.profile = image;
  //       console.log({ newUser }, name, image, 1234);
  //       dispatch(setUserDetails(newUser));
  //       notify("Name and profile updated successfully", "success");
  //     })
  //     .catch(async (e) => {
  //       console.log(e);
  //       notify(
  //         e.message || "Failed to update name and profile picture",
  //         "error"
  //       );
  //     });
  // };

  return (
    <Card className="max-w-xs mx-auto">
      <CardContent>
        <Typography variant="h5" component="h2" className="text-center mb-4">
          Subscription Card
        </Typography>
        <div className="text-center mb-4">
          <Typography variant="h6">$19.99</Typography>
          <Typography variant="subtitle1">Premium</Typography>
        </div>
        <ul className="text-left mb-4">
          <li className="flex items-center">
            <FaAngleRight className="mr-2" />
            Feature 1
          </li>
          <li className="flex items-center">
            <FaAngleRight className="mr-2" />
            Feature 2
          </li>
          <li className="flex items-center">
            <FaAngleRight className="mr-2" />
            Feature 3
          </li>
          <li className="flex items-center">
            <FaAngleRight className="mr-2" />
            Feature 4
          </li>
        </ul>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => createSession("price_1NL5c7HnmJ2HS428ESg3ZI3p")}
        >
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
};

export default StudentSubscription;
