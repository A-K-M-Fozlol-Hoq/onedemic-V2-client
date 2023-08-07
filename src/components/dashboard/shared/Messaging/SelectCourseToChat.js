import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import ViewCourses from "../ViewCourses/ViewCourses";

const SelectCourseToChat = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== "student" && user?.role !== "teacher") {
    push("/");
  }

  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <ViewCourses showChat={true} />
      </StudentDashboardLayout>
    );
  } else {
    return (
      <TeacherDashboardLayout>
        <ViewCourses showChat={true} />
      </TeacherDashboardLayout>
    );
  }
};

export default SelectCourseToChat;
