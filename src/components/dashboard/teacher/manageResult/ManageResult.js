/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ViewExams from "./ViewExams";
import { Button, Tooltip } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import { notify } from "@/helpers/utilsFuctions";
import ResultTable from "./ResultTable";

const ManageResult = ({ courseId }) => {
  const { user } = useSelector((state) => state.auth);
  const [selectExam, setSelectExam] = useState({});
  const [resultData, setResultData] = useState([]);
  const [isResultLoading, setIsResultLoading] = useState(true);

  const handleBack = () => {
    setSelectExam({});
  };

  const getResults = async (examId) => {
    if (!examId) {
      return;
    }
    const response = await axios.get(
      `${" https://onedemic-server.vercel.app/api/v1"}/result/get-result/${examId}`,
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    );
    setIsResultLoading(false);
    if (response?.data?.isSuccess) {
      // console.log(response.data.data);
      setResultData(response.data.data || []);
    } else {
      notify("Failed to get results, Please try again", "error");
    }
  };
  useEffect(() => {
    getResults(selectExam?._id);
  }, [selectExam?._id]);
  return (
    <div>
      {selectExam?._id ? (
        <>
          {isResultLoading && (
            <div className="flex justify-center items-center h-screen bg-gray-200">
              <h1 className=" text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white">
                Loading
              </h1>
            </div>
          )}
          {!isResultLoading && !resultData.length ? (
            <div className="flex justify-center items-center h-screen bg-gray-200">
              <div className=" text-center text-gray-800 shadow-lg p-4 rounded-lg bg-white">
                <p>No Students Submitted answer script till now!</p>
                <br />
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  color="primary"
                  onClick={handleBack}
                  style={{ marginRight: "10px" }}
                >
                  Back
                </Button>
              </div>
              <br />
            </div>
          ) : (
            <div>
              <ResultTable
                selectExam={selectExam}
                setSelectExam={setSelectExam}
                resultData={resultData}
                setResultData={setResultData}
              />
            </div>
          )}
        </>
      ) : (
        <ViewExams
          courseId={courseId}
          selectExam={selectExam}
          setSelectExam={setSelectExam}
        />
      )}
    </div>
  );
};

export default ManageResult;
