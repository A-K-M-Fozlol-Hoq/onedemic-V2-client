import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import ViewCourses from "./ViewCourses";

const Index = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== "student" && user?.role !== "teacher") {
    push("/");
  }

  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <h1
          style={{ textAlign: "center", fontSize: "30", marginTop: "50px" }}
          className="text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white text-2xl md:w-1/2 sm:w-full m-auto"
        >
          Enrolled Courses
        </h1>
        <ViewCourses />
      </StudentDashboardLayout>
    );
  } else {
    return (
      <TeacherDashboardLayout>
        <h1
          style={{ textAlign: "center", fontSize: "30", marginTop: "50px" }}
          className="text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white text-2xl md:w-1/2 sm:w-full m-auto"
        >
          Created Courses
        </h1>
        <ViewCourses />
      </TeacherDashboardLayout>
    );
  }
};

export default Index;
