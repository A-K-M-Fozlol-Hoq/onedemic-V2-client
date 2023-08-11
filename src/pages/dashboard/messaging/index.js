//external imports
import React from "react";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import SelectCourseToChat from "@/components/dashboard/shared/Messaging/SelectCourseToChat";

const Index = () => {
  return (
    <PrivateComponent>
      <SelectCourseToChat />
    </PrivateComponent>
  );
};

export default Index;
