//external imports
import { Card, CardContent, Typography, Button } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";

const TeacherSubscription = () => {
  const createSession = async (priceId) => {
    console.log("creating session");
  };

  return (
    <Card className="max-w-xs mx-auto">
      <CardContent>
        <Typography variant="h5" component="h2" className="text-center mb-4">
          Subscription Card
        </Typography>
        <div className="text-center mb-4">
          <Typography variant="h6">$19.99</Typography>
          <Typography variant="subtitle1">Standard</Typography>
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
          onClick={createSession("price_1NL5aWHnmJ2HS428Ee94eqm4")}
        >
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeacherSubscription;
