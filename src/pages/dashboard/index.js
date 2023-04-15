//external imports
import React from "react";
import { useSelector } from "react-redux";

//internal imports
import PrivateComponent from "../../components/HOC/PrivateComponent";

const Index = () => {
  const {
    user: { email, role },
  } = useSelector((state) => state.auth);
  console.log(email, role, "here is the email and role from dashboard route");
  return (
    <PrivateComponent>
      <div>hello world</div>
    </PrivateComponent>
  );
};

export default Index;
