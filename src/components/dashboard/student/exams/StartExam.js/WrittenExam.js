import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowPDFQuestion from "./ShowPDFQuestion";

const WrittenExam = ({ examDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const [questionPdf, setQuestionPdf] = useState({});
  console.log(examDetails);
  // `http://localhost:5000/api/v1/pdf/get-pdf/${questionPaperID}`\
  async function getQuestionPdf() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DEV_URL}/pdf/get-pdf/${examDetails.questionPaperID}`,
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    );
    setQuestionPdf(response?.data?.data);
    console.log(response?.data?.data, 23);
  }
  useEffect(() => {
    getQuestionPdf();
  }, []);
  return (
    <div>
      <h1>Heloo world</h1>
      {questionPdf._id && (
        <>
          <ShowPDFQuestion pdfBase64={questionPdf.pdfBase64} />
          {questionPdf._id}
        </>
      )}
    </div>
  );
};

export default WrittenExam;
