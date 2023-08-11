//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import SelectCourseToExam from "@/components/dashboard/student/exams/SelectCourseToExam";

const Index = () => {
  return (
    <PrivateComponent>
      <SelectCourseToExam />
    </PrivateComponent>
  );
};

export default Index;
