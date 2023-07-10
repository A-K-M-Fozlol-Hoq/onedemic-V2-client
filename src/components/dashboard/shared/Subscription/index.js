//external imports
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

//internal imports
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import StudentSubscription from "../../student/studentSubscription/StudentSubscription";
import TeacherSubscription from "../../teacher/teacherSubscription/TeacherSubscription";

const Index = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);

  if (user.role !== "student" && user.role !== "teacher") {
    push("/");
  }

  console.log({ user: user.role });
  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <StudentSubscription></StudentSubscription>
      </StudentDashboardLayout>
    );
  } else if (user.role === "teacher") {
    return (
      <TeacherDashboardLayout>
        <TeacherSubscription></TeacherSubscription>
      </TeacherDashboardLayout>
    );
  }
};

export default Index;
