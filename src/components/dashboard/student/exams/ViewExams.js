import { useGetExamsQuery } from "@/features/api/exam/examApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectExam from "./SelectExam";
import StartExam from "./StartExam.js/StartExam";

const ViewExams = ({ courseId }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetExamsQuery({
    accessToken: user?.accessToken,
    courseId: courseId,
  });
  const [selectExam, setSelectExam] = useState({});

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isLoading && data?.data?.length === 0) {
    return (
      <div>
        <h1>No Exam Found For This Course</h1>
      </div>
    );
  }
  if (data.data?.length) {
    if (selectExam?._id) {
      return <StartExam exam={selectExam} />;
    } else {
      return <SelectExam exams={data?.data} setSelectExam={setSelectExam} />;
    }
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default ViewExams;
