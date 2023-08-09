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
      <ViewCourses createExam={true} />
    </TeacherDashboardLayout>
  );
};

export default Index;
