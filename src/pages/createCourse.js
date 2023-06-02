import StudentDashboardLayout from "@/components/HOC/StudentDashboardLayout";
import TeacherDashboardLayout from "@/components/HOC/TeacherDashboardLayout";
import CreateCourse from "@/components/dashboard/teacher/CreateCourse";
import React from "react";

const Index = () => {
  return (
    <div>
      <StudentDashboardLayout>
        <CreateCourse></CreateCourse>
      </StudentDashboardLayout>
    </div>
  );
};

export default Index;
