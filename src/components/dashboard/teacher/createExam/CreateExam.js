import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { notify } from "@/helpers/utilsFuctions";
import { useSelector } from "react-redux";
import MCQForm from "./MCQForm";

const CreateExam = ({ courseId }) => {
  const { user } = useSelector((state) => state.auth);
  const [examType, setExamType] = useState(""); // "mcq" or "written"
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [examStartTime, setExamStartTime] = useState("");
  const [examEndTime, setExamEndTime] = useState("");
  const [selectedFileID, setSelectedFileID] = useState(null);
  const [numOfMCQs, setNumOfMCQs] = useState(0);
  const [examName, setExamName] = useState("");
  const [showInputNumber, setShowInputNumber] = useState(true);
  const handleFileChange = async (event) => {
    event.preventDefault();
    const newFile = event.target?.files[0];
    if (newFile?.type === "application/pdf") {
      notify("PDF uploading...", "info");
      const formData = new FormData();
      formData.append("file", newFile);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DEV_URL}/pdf/create-pdf`,
        {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${user?.accessToken}` },
          // user?.accessTOken
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.isSuccess) {
        notify("File Uploaded Successfully!", "success");
        console.log(jsonResponse.data?._id, 1234);
        setSelectedFileID(jsonResponse?.data?._id);
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
      questionPaperID: selectedFileID,
      mcqQuestions,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEV_URL}/exam/create-exam`,
        bodyDate,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );

      if (response?.data?.isSuccess) {
        notify("Exam scheduled successfully", "success");
      } else {
        notify("Something went wrong", "error");
      }
    } catch (e) {
      const error = e.response?.data?.message || "somethign went wrong";
      notify(error, "error");
    }
  };

  return (
    <div className="w-96 mx-auto p-4">
      <h1
        className="text-3xl font-bold mb-5 mt-20"
        style={{ textAlign: "center" }}
      >
        CreateExam
      </h1>

      {/* Step 1: Select Exam Type */}
      {examType === "" && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Select Exam Type:</h2>
          <RadioGroup
            aria-label="examType"
            name="examType"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            <FormControlLabel
              value="mcq"
              control={<Radio />}
              label="MCQ Exam"
            />
            <FormControlLabel
              value="written"
              control={<Radio />}
              label="Written Exam"
            />
          </RadioGroup>
          <Button
            style={{ martinTop: "20px" }}
            variant="contained"
            color="primary"
            onClick={() => setExamType("mcq")}
          >
            Continue with MCQ
          </Button>
          <br />
          <Button
            style={{ martinTop: "20px" }}
            variant="contained"
            color="primary"
            onClick={() => setExamType("written")}
          >
            Continue with written
          </Button>
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
                type="number"
                value={numOfMCQs}
                onChange={(e) => setNumOfMCQs(Number(e.target.value))}
                InputProps={{
                  inputProps: { min: 0, max: 15 },
                }}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                className="mt-2 mb-5"
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

      {/* Step 3: Written Exam Input */}
      {examType === "written" && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Upload Written Exam PDF:</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Step 4: Exam Start and End Time */}
      {examType !== "" && (
        <div className="mb-4 mt-10">
          <h2 className="text-xl font-bold">Exam Start and End Time:</h2>
          <TextField
            className="mt-5"
            type="datetime-local"
            label="Start Time"
            value={examStartTime}
            onChange={(e) => setExamStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className="mt-5"
            type="datetime-local"
            label="End Time"
            value={examEndTime}
            onChange={(e) => setExamEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            className="mt-5"
            style={{ width: "250px" }}
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
            className="mt-10"
            variant="contained"
            color="primary"
            onClick={handleStartExam}
            disabled={
              (examType === "mcq" && !mcqQuestions.length) ||
              (examType === "written" && !selectedFileID) ||
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
