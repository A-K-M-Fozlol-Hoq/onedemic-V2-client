import { notify } from "@/helpers/utilsFuctions";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MCQExam = ({ examDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (option) => {
    setShowSubmitButton(false);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < examDetails.mcqQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const completedMCQs = Object.entries(selectedOptions).map(
      ([index, option]) => ({
        questionId: examDetails.mcqQuestions[index]._id,
        question: examDetails.mcqQuestions[index].question,
        selectedOption: option,
      })
    );
    if (completedMCQs.length < examDetails.mcqQuestions.length) {
      const message = `You missed ${
        examDetails.mcqQuestions.length - completedMCQs.length
      } mcq question(s) out of ${examDetails.mcqQuestions.length} question(s)`;
      notify(message, "warning");
    }

    if (completedMCQs.length === 0) {
      notify("You have to select at least one answer to save", "error");
      return;
    }
    setShowSubmitButton(true);

    // console.log("Completed MCQs:", completedMCQs);
    // alert("Successfully completed exam");
  };
  const submitExam = async () => {
    const completedMCQs = Object.entries(selectedOptions).map(
      ([index, option]) => ({
        questionId: examDetails.mcqQuestions[index]._id,
        question: examDetails.mcqQuestions[index].question,
        selectedOption: option,
      })
    );
    const currentTime = new Date();
    const endDateTime = new Date(examDetails?.endDateTime);
    if (currentTime > endDateTime) {
      notify("You can't submit answers as the exam time is over.", "error");
      return;
    }
    const bodyDate = {
      studentId: user?._id,
      examId: examDetails._id,
      examType: "mcq",
      answeredMcqs: completedMCQs,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEV_URL}/result/save-mcq`,
        bodyDate,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      notify("MCQ submitted successfully", "success");

      // console.log("Completed MCQs:", completedMCQs);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
      notify(errorMessage, "error");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">MCQ Exam</h1>
      {examDetails.mcqQuestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1}:
          </h2>
          <p className="mt-2">
            {examDetails.mcqQuestions[currentQuestionIndex].question}
          </p>
          <div className="mt-4 space-y-2">
            {examDetails.mcqQuestions[currentQuestionIndex].options.map(
              (option, index) => (
                <button
                  key={index}
                  className={`block p-2 border rounded hover:bg-gray-100 ${
                    selectedOptions[currentQuestionIndex] === option
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              )
            )}
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          {showSubmitButton && (
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-green-900 text-white rounded"
                onClick={submitExam}
              >
                Submit Exam
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MCQExam;
