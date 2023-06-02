import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import ManageProfile from "./ManageProfile";

const Index = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user.role !== "student" && user.role !== "teacher") {
    push("/");
  }

  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <ManageProfile></ManageProfile>
      </StudentDashboardLayout>
    );
  } else {
    return <TeacherDashboardLayout>hello</TeacherDashboardLayout>;
  }
};

export default Index;
