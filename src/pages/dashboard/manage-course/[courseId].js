//external imports
import React from "react";
import { useRouter } from "next/router";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ManageCourse from "@/components/dashboard/teacher/manageCourse";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <PrivateComponent>
      <ManageCourse courseId={courseId} />
    </PrivateComponent>
  );
};

export default Index;
