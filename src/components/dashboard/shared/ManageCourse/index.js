import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import StudentManageCourse from "./student/ManageCourse";
import TeacherManageCourse from "./teacher/ManageCourse";

const Index = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== "student" && user?.role !== "teacher") {
    push("/");
  }

  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <StudentManageCourse />
      </StudentDashboardLayout>
    );
  } else {
    return (
      <TeacherDashboardLayout>
        <TeacherManageCourse />
      </TeacherDashboardLayout>
    );
  }
};

export default Index;
