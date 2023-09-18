import { notify } from "@/helpers/utilsFuctions";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import MCQForm from "./MCQForm";
import { useRouter } from "next/router";

const CreateExam = ({ courseId }) => {
  const { user } = useSelector((state) => state.auth);
  const { push } = useRouter();
  const [examType, setExamType] = useState(""); // "mcq" or "written"
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [examStartTime, setExamStartTime] = useState("");
  const [examEndTime, setExamEndTime] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [numOfMCQs, setNumOfMCQs] = useState(0);
  const [examName, setExamName] = useState("");
  const [showInputNumber, setShowInputNumber] = useState(true);

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
        setSelectedFile(jsonResponse?.data?.url);
      } catch (err) {
        notify("Failed to upload file", "error");
      }
    } else {
      notify("Please Upload PDF file", "error");
    }
  };

  const handleAddMCQ = () => {
    // Validate the number of MCQs before allowing input
    if (numOfMCQs <= 0) {
      notify("Please enter a valid number of MCQs to add.", "error");
      return;
    }

    const isPremiumOrTrial =
      user.selectedPlan === "trial" || user.selectedPlan === "premium";
    const hasValidSubscription = isPremiumOrTrial && user.endDate > new Date();
    const maxQuestionLimit = hasValidSubscription ? 15 : 10;

    if (numOfMCQs > maxQuestionLimit) {
      console.log(user);
      notify(`You can't add more than ${maxQuestionLimit} MCQ`, "error");
      return;
    }
    setShowInputNumber(false);
  };

  const handleStartExam = async () => {
    if (examType === "mcq" && mcqQuestions.length === 0) {
      notify("Please add MCQ questions.", "error");
      return;
    }

    // Convert start and end time to Date objects for validation
    const startTime = new Date(examStartTime);
    const endTime = new Date(examEndTime);

    // Validate start and end time
    const now = new Date();
    const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 1 month in milliseconds
    if (startTime < now) {
      notify("Can't create exam at past time", "error");
      return;
    }

    if (startTime > oneMonthLater) {
      notify("Can't create exam after one month later from now", "error");
      return;
    }
    if (endTime <= startTime) {
      notify("End time can't be before start time", "error");
      return;
    }

    if (endTime > new Date(startTime.getTime() + 4 * 60 * 60 * 1000)) {
      notify("Exam end time should be within 4 hours of start time.", "error");
      return;
    }

    // Prepare data to send to the backend
    const bodyDate = {
      examName,
      courseId,
      startDateTime: examStartTime,
      endDateTime: examEndTime,
      examType,
      questionPaper: selectedFile,
      mcqQuestions,
    };

    try {
      const response = await axios.post(
        `https://onedemic-server.vercel.app/api/v1/exam/create-exam`,
        bodyDate,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );

      if (response?.data?.isSuccess) {
        notify("Exam scheduled successfully", "success");
        push("/dashboard/manage-result");
      } else {
        notify("Something went wrong", "error");
      }
    } catch (e) {
      const error = e.response?.data?.message || "somethign went wrong";
      notify(error, "error");
    }
  };

  return (
    <div className="w-96 mx-auto p-7 border border-dashed border-gray-400 rounded-xl my-5">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Create Exam
      </h1>

      {/* Step 1: Select Exam Type */}
      {examType === "" && (
        <div className="">
          <h2 className="text-center my-4">Choose Exam Type</h2>
          <div className="flex gap-5">
            <div
              className="w-48 h-48 flex justify-center items-center bg-slate-200 rounded-3xl hover:bg-slate-300 cursor-pointer"
              onClick={() => setExamType("mcq")}
            >
              <h3 className="text-3xl font-bold text-gray-800">MCQ</h3>
            </div>
            <div
              className="w-48 h-48 flex justify-center items-center bg-slate-200 rounded-3xl hover:bg-slate-300 cursor-pointer"
              onClick={() => setExamType("written")}
            >
              <h3 className="text-3xl font-bold text-gray-800">Written</h3>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: MCQ Exam Input */}
      {examType === "mcq" && (
        <div className="mb-4">
          {showInputNumber ? (
            <>
              <h2 className="text-xl font-bold">
                Enter the number of MCQs to add:
              </h2>
              <TextField
                className="w-full"
                type="number"
                value={numOfMCQs}
                onChange={(e) => setNumOfMCQs(Number(e.target.value))}
                InputProps={{
                  inputProps: { min: 0, max: 15 },
                }}
              />
              <br />
              <Button
                variant="outlined"
                color="primary"
                className="w-full my-1"
                onClick={handleAddMCQ}
              >
                Add MCQs
              </Button>
            </>
          ) : (
            <>
              {/* Render MCQ input forms for each MCQ */}
              <MCQForm
                numOfMCQs={numOfMCQs}
                setMcqQuestions={setMcqQuestions}
              />
            </>
          )}
        </div>
      )}

      {/* Step 2(alt): Written Exam Input */}
      {examType === "written" && (
        <div className="my-4">
          <h2 className="text-lg font-bold">Upload Written Exam PDF:</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Step 3: Exam Start and End Time */}
      {examType !== "" && (
        <div className="mb-4 mt-10">
          <h2 className="text-xl font-bold">Exam Start and End Time:</h2>
          <TextField
            className="mt-5 w-full"
            type="datetime-local"
            label="Start Time"
            value={examStartTime}
            onChange={(e) => setExamStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className="mt-5 w-full"
            type="datetime-local"
            label="End Time"
            value={examEndTime}
            onChange={(e) => setExamEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            className="mt-5 w-full"
            type="text"
            label="Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <Button
            className="mt-4 w-full"
            variant="outlined"
            color="success"
            onClick={handleStartExam}
            disabled={
              (examType === "mcq" && !mcqQuestions.length) ||
              (examType === "written" && !selectedFile) ||
              !examStartTime ||
              !examEndTime ||
              !examName
            }
          >
            Start Exam
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
