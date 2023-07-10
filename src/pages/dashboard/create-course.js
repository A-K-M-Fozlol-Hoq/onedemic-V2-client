//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import CreateCourse from "@/components/dashboard/teacher/createCourse";

const Index = () => {
  return (
    <PrivateComponent>
      <CreateCourse></CreateCourse>
    </PrivateComponent>
  );
};

export default Index;
