import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import ManageCourse from "./ManageCourse";

const Index = ({ courseId }) => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user.role !== "teacher") {
    push("/");
  }

  return (
    <TeacherDashboardLayout>
      <ManageCourse courseId={courseId} />
    </TeacherDashboardLayout>
  );
};

export default Index;
