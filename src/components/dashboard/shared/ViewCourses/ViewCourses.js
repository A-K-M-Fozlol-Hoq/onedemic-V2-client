import CourseCards from "@/components/utils/CourseCards";
import { useGetCoursesQuery } from "@/features/api/course/courseApi";
import React from "react";
import { useSelector } from "react-redux";

const ViewCourses = ({ redirectDetails = false }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetCoursesQuery({
    accessToken: user?.accessToken,
    email: user?.email,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(data);
  return (
    <div>
      <h1>jsfiosj</h1>
      <h1>jsfiosj</h1>[ ]
      {data?.data?.length ? (
        <>
          <CourseCards courses={data.data} redirectDetails={redirectDetails} />
        </>
      ) : (
        <>
          {user?.role === "student" && <h1>No Created Course Found</h1>}
          {user?.role === "teacher" && <h1>No Enrolled Course Found</h1>}
        </>
      )}
    </div>
  );
};

export default ViewCourses;