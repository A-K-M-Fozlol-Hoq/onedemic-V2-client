//external imports
import React from "react";
import { useRouter } from "next/router";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import CreateExamIndex from "@/components/dashboard/teacher/createExam";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <PrivateComponent>
      <CreateExamIndex courseId={courseId} />
    </PrivateComponent>
  );
};

export default Index;
