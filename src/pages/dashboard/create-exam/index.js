//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import CreateExam from "@/components/dashboard/teacher/createExam";

const Index = () => {
  return (
    <PrivateComponent>
      <CreateExam></CreateExam>
    </PrivateComponent>
  );
};

export default Index;
