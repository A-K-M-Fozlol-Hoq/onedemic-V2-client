import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import CreateExam from "./CreateExam";
import ViewCourses from "../../shared/ViewCourses/ViewCourses";

const Index = ({ courseId = null }) => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user.role !== "teacher") {
    push("/");
  }

  if (courseId) {
    return (
      <TeacherDashboardLayout>
        <CreateExam courseId={courseId} />
      </TeacherDashboardLayout>
    );
  }

  return (
    <TeacherDashboardLayout>
      <h1
        style={{ textAlign: "center", fontSize: "30", marginTop: "50px" }}
        className="text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white text-2xl md:w-1/2 sm:w-full m-auto"
      >
        Select Course To Create Exam
      </h1>
      <ViewCourses createExam={true} />
    </TeacherDashboardLayout>
  );
};

export default Index;
