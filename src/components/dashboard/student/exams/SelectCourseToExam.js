import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import ViewCourses from "@/components/dashboard/shared/ViewCourses/ViewCourses";

const SelectCourseToChat = () => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  if (user?.role !== "student") {
    push("/");
  }

  if (user.role === "student") {
    return (
      <StudentDashboardLayout>
        <ViewCourses showExam={true} />
      </StudentDashboardLayout>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default SelectCourseToChat;
