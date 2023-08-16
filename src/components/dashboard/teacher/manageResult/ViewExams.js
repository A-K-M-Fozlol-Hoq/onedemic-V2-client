import { useGetAllExamsQuery } from "@/features/api/exam/examApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectExam from "./SelectExam";

const ViewExams = ({ courseId, selectExam, setSelectExam }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAllExamsQuery({
    accessToken: user?.accessToken,
    courseId: courseId,
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isLoading && data?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <h1 className=" text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white">
          No Exam Found For This Course!
        </h1>
      </div>
    );
  }

  if (data?.data?.length) {
    return <SelectExam exams={data?.data} setSelectExam={setSelectExam} />;
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default ViewExams;
