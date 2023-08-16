//external imports
import React from "react";
import { useRouter } from "next/router";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import ManageResultIndex from "@/components/dashboard/teacher/manageResult";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <PrivateComponent>
      <ManageResultIndex courseId={courseId} />
    </PrivateComponent>
  );
};

export default Index;
