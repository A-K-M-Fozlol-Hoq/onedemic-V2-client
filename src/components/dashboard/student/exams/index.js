import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import ViewExams from "./ViewExams";

const Index = ({ courseId }) => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user.role !== "student") {
    push("/");
  }

  return (
    <StudentDashboardLayout>
      <ViewExams courseId={courseId} />
    </StudentDashboardLayout>
  );
};

export default Index;
