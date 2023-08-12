import React, { useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
import { notify } from "@/helpers/utilsFuctions";

const MCQForm = ({ numOfMCQs, setMcqQuestions }) => {
  const { user } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [hoveredQuestionIndex, setHoveredQuestionIndex] = useState(null);

  const delayedSearch = debounce(async (searchTerm) => {
    if (!searchTerm) {
      return;
    }
    const resonse = await axios.post(
      `${process.env.NEXT_PUBLIC_DEV_URL}/mcq`,
      {
        searchString: searchTerm,
      },
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    );
    const responseData = resonse.data.data;
    if (resonse?.data?.isSuccess && resonse.data?.data?.length > 0) {
      setSuggestions(responseData);
    } else {
      setSuggestions([]);
    }
  }, 100);

  const handleSearchTermChange = (e) => {
    const searchTerm = e.target.value;
    delayedSearch(searchTerm);
  };

  const handleSuggestionClick = (matchedMCQ) => {
    if (matchedMCQ) {
      document.getElementsByName("question")[0].value = matchedMCQ.question;
      matchedMCQ.options.forEach((option, index) => {
        document.getElementsByName(`option${index + 1}`)[0].value = option;
      });
      document.getElementsByName("answer")[0].value = matchedMCQ.answer;
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionInput = e.target.question.value;
    const optionsInput = [
      e.target.option1.value,
      e.target.option2.value,
      e.target.option3.value,
      e.target.option4.value,
    ];
    const answerInput = e.target.answer.value;

    if (
      questionInput.trim() === "" ||
      optionsInput.some((option) => option.trim() === "") ||
      !optionsInput.includes(answerInput)
    ) {
      notify("Please provide valid inputs for the question.", "warning");
      return;
    }

    const newQuestion = {
      question: questionInput,
      options: optionsInput,
      answer: answerInput,
    };

    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    if (currentQuestionIndex === numOfMCQs - 1) {
      notify("All Questions saved successfully.", "success");
      console.log(updatedQuestions); // You can replace this with your desired output method
      setMcqQuestions(updatedQuestions);
    }

    e.target.reset();
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      {currentQuestionIndex < numOfMCQs ? (
        <div className="w-96 bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-500">
            Question {currentQuestionIndex + 1} of {numOfMCQs}
          </p>
          <form onSubmit={handleSubmit}>
            <label className="block mt-4">
              Question:
              <textarea
                name="question"
                className="border rounded-md w-full p-2"
                onChange={handleSearchTermChange}
                rows={3} // You can set the initial number of rows
              />
              <div className="mt-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredQuestionIndex(index)}
                    onMouseLeave={() => setHoveredQuestionIndex(null)}
                    className="cursor-pointer bg-slate-100 rounded-lg  hover:bg-slate-200 p-2  hover:text-blue-500 mt-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {hoveredQuestionIndex === index
                      ? suggestion.question
                      : suggestion.question.length > 35
                      ? suggestion.question.substring(0, 35) + "..."
                      : suggestion.question}
                  </div>
                ))}
              </div>
            </label>
            <label className="block mt-4">
              Options:
              {[1, 2, 3, 4].map((optionNumber) => (
                <input
                  key={optionNumber}
                  type="text"
                  name={`option${optionNumber}`}
                  placeholder={`Option ${optionNumber}`}
                  className="border rounded-md w-full p-2 mt-2"
                />
              ))}
            </label>
            <label className="block mt-4">
              Correct Option:
              <input
                type="text"
                name="answer"
                placeholder="Correct Option"
                className="border rounded-md w-full p-2"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
            >
              {currentQuestionIndex === numOfMCQs - 1 ? "Done" : "Next"}
            </button>
          </form>
        </div>
      ) : (
        <p>All questions saved successfully. Thank you!</p>
      )}
    </div>
  );
};

export default MCQForm;
