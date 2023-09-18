/* eslint-disable @next/next/no-img-element */
import { notify } from "@/helpers/utilsFuctions";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ViewResultDetails = ({
  selectedStudentResult,
  closeDetailView,
  resultData,
  setResultData,
}) => {
  // Calculate the aspect ratio of the image
  let aspectRatio = 1;
  if (
    selectedStudentResult.questionPaper?.width &&
    selectedStudentResult.questionPaper?.height
  ) {
    aspectRatio =
      selectedStudentResult.questionPaper?.width /
      selectedStudentResult.questionPaper?.height;
  }

  // Define the minimum width
  const minWidth = 600;
  // Calculate the dynamic width (60% of the available width or the minimum width, whichever is larger)
  const dynamicWidth = Math.max(minWidth, 0.6 * window.innerWidth);
  // Calculate the corresponding dynamic height based on the aspect ratio
  const dynamicHeight = dynamicWidth / aspectRatio;

  console.log(selectedStudentResult);
  const [editableMark, setEditableMark] = useState(selectedStudentResult.mark);
  const { user } = useSelector((state) => state.auth);

  const handleMarkChange = async (event) => {
    if (event.target.value < 0) {
      notify("Mark can't be negative", "warning");
      return;
    }
    if (event.target.value > 100) {
      notify("mark can't be more than 100", "warning");
      return;
    }
    setEditableMark(event.target.value);
  };

  const handleSave = async () => {
    // Find the index of the selected student result in the resultData
    const index = resultData.findIndex(
      (result) => result._id === selectedStudentResult._id
    );

    if (index !== -1) {
      // Create a copy of the resultData array and update the mark of the selected student
      const updatedResultData = [...resultData];
      updatedResultData[index].mark = parseFloat(editableMark);

      // Update the state using setResultData
      setResultData(updatedResultData);

      const bodyDate = {
        resultId: updatedResultData[index]._id,
        updatedMark: parseFloat(editableMark),
      };

      const response = await axios.put(
        `https://onedemic-server.vercel.app/api/v1/result/update-mark`,
        bodyDate,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      if (response?.data?.isSuccess) {
        let message;
        if (updatedResultData[index].student?.name) {
          message = `Mark updated successfully for ${updatedResultData[index].student?.name}.`;
        } else {
          message = "Mark updated successfully";
        }
        notify(message, "success");
      } else {
        notify(
          "Failed to update mark at backend. Please reload the page and try again.",
          "error"
        );
      }
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={closeDetailView}
        >
          Back
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Result Details</h2>
        <p>Student Name: {selectedStudentResult.student.name}</p>
        <p>Student Email: {selectedStudentResult.student.email}</p>
        <p>Exam Type: {selectedStudentResult.examType}</p>
        <p>Mark: {selectedStudentResult.mark}</p>
        {selectedStudentResult.examType === "written" ? (
          <div className="mt-4">
            <label className="block font-semibold">Mark:</label>
            <input
              type="number"
              value={editableMark}
              onChange={handleMarkChange}
              className="border rounded px-2 py-1 mt-1"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : null}
        {selectedStudentResult.examType === "mcq" && (
          <>
            <h3 className="text-lg font-semibold mt-4 mb-2">Answered MCQs</h3>
            <ul>
              {selectedStudentResult?.answeredMcqs?.map((mcq, index) => (
                <li key={mcq._id}>
                  <p className="font-semibold">
                    {index + 1}. {mcq.question}
                  </p>
                  <p>Selected Option: {mcq.selectedOption}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {selectedStudentResult.examType === "written" && (
          <>
            <h3 className="text-lg font-semibold mt-4 mb-2">Answer Script</h3>
            <img
              src={selectedStudentResult.answerScript}
              alt="Course Photo"
              width={dynamicWidth}
              height={dynamicHeight}
              className="rounded-xl border-dotted border-2 border-teal-500 mx-auto mt-4 mb-5"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewResultDetails;
