//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ViewCourses from "@/components/dashboard/shared/ViewCourses";

const Index = () => {
  return (
    <PrivateComponent>
      <ViewCourses />
    </PrivateComponent>
  );
};

export default Index;
