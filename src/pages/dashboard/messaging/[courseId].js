//external imports
import React from "react";
import { useRouter } from "next/router";

//internal imports
import PrivateComponent from "@/components/HOC/PrivateComponent";
import Messaging from "@/components/dashboard/shared/Messaging/Messaging";

const Index = () => {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <PrivateComponent>
      <Messaging courseId={courseId} />
    </PrivateComponent>
  );
};

export default Index;
