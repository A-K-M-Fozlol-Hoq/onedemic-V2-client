import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Messaging from "./Messaging";

const Index = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== "student" && user?.role !== "teacher") {
    push("/");
  }

  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <Messaging></Messaging>
      </StudentDashboardLayout>
    );
  } else {
    return (
      <TeacherDashboardLayout>
        <Messaging></Messaging>
      </TeacherDashboardLayout>
    );
  }
};

export default Index;
