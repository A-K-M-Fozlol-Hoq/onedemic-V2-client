import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MCQExam from "./MCQExam";
import WrittenExam from "./WrittenExam";
import DateTimeDisplay from "@/components/common/DateTimeDisplay";

const StartExam = ({ exam }) => {
  const [examDetails, setExamDetails] = useState({});
  const { user } = useSelector((state) => state.auth);
  const getExam = async () => {
    const response = await axios.get(
      `${" https://onedemic-server.vercel.app/api/v1"}/exam/get-exam/${
        exam._id
      }`,
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    );
    if (response?.data?.isSuccess) {
      console.log(exam, response.data.data);
      setExamDetails(response.data.data);
    }
  };
  useEffect(() => {
    getExam();
  }, []);
  if (!examDetails?._id) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <DateTimeDisplay />
        {examDetails.examType === "mcq" && (
          <MCQExam examDetails={examDetails} />
        )}
        {examDetails.examType === "written" && (
          <WrittenExam examDetails={examDetails} />
        )}
      </div>
    );
  }
};

export default StartExam;
