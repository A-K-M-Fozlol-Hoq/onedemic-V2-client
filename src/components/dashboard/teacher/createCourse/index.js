import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import CreateCourse from "./CreateCourse";

const Index = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user.role !== "teacher") {
    push("/");
  }

  return (
    <TeacherDashboardLayout>
      <CreateCourse></CreateCourse>
    </TeacherDashboardLayout>
  );
};

export default Index;
