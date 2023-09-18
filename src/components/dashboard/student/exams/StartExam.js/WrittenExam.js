/* eslint-disable @next/next/no-img-element */
import { notify } from "@/helpers/utilsFuctions";
import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WrittenExam = ({ examDetails }) => {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [answerScript, setAnswerScript] = useState("");
  // Calculate the aspect ratio of the image
  const aspectRatio =
    examDetails.questionPaper.width / examDetails.questionPaper.height;
  // Define the minimum width
  const minWidth = 600;
  // Calculate the dynamic width (60% of the available width or the minimum width, whichever is larger)
  const dynamicWidth = Math.max(minWidth, 0.6 * window.innerWidth);
  // Calculate the corresponding dynamic height based on the aspect ratio
  const dynamicHeight = dynamicWidth / aspectRatio;

  const handleFileChange = async (event) => {
    event.preventDefault();
    const newFile = event.target?.files[0];
    if (newFile?.type === "application/pdf") {
      notify("PDF uploading...", "info");

      try {
        const imageData = new FormData();
        imageData.set("key", "4a118cdd62eafe33d42897dea91efe22");
        imageData.append("image", newFile);

        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: imageData,
        });
        notify("File Uploaded Successfully!", "success");
        const jsonResponse = await response.json();
        console.log(jsonResponse?.data?.url);
        setAnswerScript(jsonResponse?.data?.url || "");
      } catch (err) {
        notify("Failed to upload file", "error");
      }
    } else {
      notify("Please Upload PDF file", "error");
    }
  };

  const submitExam = async () => {
    const currentTime = new Date();
    const endDateTime = new Date(examDetails?.endDateTime);
    if (currentTime > endDateTime) {
      notify("You can't submit answers as the exam time is over.", "error");
      return;
    }
    if (!answerScript) {
      notify("Please upload your answer script", "error");
      return;
    }
    const bodyDate = {
      studentId: user?._id,
      examId: examDetails._id,
      examType: "written",
      answerScript: answerScript,
    };

    try {
      const response = await axios.post(
        `https://onedemic-server.vercel.app/api/v1/result/save-cq`,
        bodyDate,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      if (response?.data?.isSuccess) {
        notify("CQ submitted successfully", "success");
        push("/dashboard/courses");
      }

      // console.log("Completed MCQs:", completedMCQs);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      notify(errorMessage, "error");
    }
  };

  return (
    <div>
      {examDetails._id && (
        <>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            {/* Input field to upload a file */}
            <input
              type="file"
              accept=".pdf" // Specify accepted file types (e.g., .pdf)
              onChange={handleFileChange}
            />
            <br />
            <Button
              className="mt-4 w-full"
              variant="outlined"
              color="success"
              style={{
                width: "200px",
                margin: "10px auto 0",
                textAlign: "center",
              }}
              onClick={submitExam}
            >
              Submit Exan
            </Button>
          </div>
          <p className="text-center text-2xl font-bold mt-10">Question Paper</p>
          <img
            src={examDetails.questionPaper}
            alt="Course Photo"
            width={dynamicWidth}
            height={dynamicHeight}
            className="rounded-xl border-dotted border-2 border-teal-500 mx-auto mt-4 mb-5"
          />
        </>
      )}
    </div>
  );
};

export default WrittenExam;
