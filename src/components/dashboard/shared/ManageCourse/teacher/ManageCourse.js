import ViewCourses from "../../ViewCourses/ViewCourses";
import { useRouter } from "next/router";

const ManageCourse = () => {
  const { push } = useRouter();
  const redirectCreateCourse = () => {
    push(`/dashboard/create-course`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8">
      <div className="w-2/3 flex justify-between items-center">
        <h1 className="text-4xl font-bold">All courses</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
          onClick={redirectCreateCourse}
        >
          Create new course
        </button>
      </div>
      <div className="mt-8">
        <ViewCourses redirectDetails={true} />
      </div>
    </div>
  );
};

export default ManageCourse;
