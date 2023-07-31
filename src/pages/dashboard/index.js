//external imports
import React from "react";
import { useSelector } from "react-redux";

//internal imports
import PrivateComponent from "../../components/HOC/PrivateComponent";

const Index = () => {
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;
  const role = user?.role;
  return (
    <PrivateComponent>
      <div>hello world</div>
    </PrivateComponent>
  );
};

export default Index;
