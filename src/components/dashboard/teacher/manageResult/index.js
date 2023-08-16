import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import ViewCourses from "../../shared/ViewCourses/ViewCourses";
import ManageResult from "./ManageResult";

const Index = ({ courseId = null }) => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user.role !== "teacher") {
    push("/");
  }

  if (courseId) {
    return (
      <TeacherDashboardLayout>
        <ManageResult courseId={courseId} />
      </TeacherDashboardLayout>
    );
  }

  return (
    <TeacherDashboardLayout>
      <h1
        style={{ textAlign: "center", fontSize: "30", marginTop: "50px" }}
        className="text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white text-2xl md:w-1/2 sm:w-full m-auto"
      >
        Select Course To View Result
      </h1>
      <ViewCourses viewResult={true} />
    </TeacherDashboardLayout>
  );
};

export default Index;
