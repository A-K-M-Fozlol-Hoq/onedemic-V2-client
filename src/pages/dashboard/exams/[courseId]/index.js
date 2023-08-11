//external imports
import React from "react";
import { useRouter } from "next/router";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ExamsIndex from "@/components/dashboard/student/exams/index";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <PrivateComponent>
      <ExamsIndex courseId={courseId} />
    </PrivateComponent>
  );
};

export default Index;
