"use client";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export default function ShowPDFQuestion({ pdfBase64 }) {
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const [numPages, setNumPages] = useState(null);
  // const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  let [pdf, setPDF] = useState({});
  console.log(pdfBase64, 1234);
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    console.log("Previous page");
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div>
      <div className="main">
        <Document
          file={`data:application/pdf;base64,${pdfBase64}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          {numPages}- numPagesnumPagesnumPages
          <div className="buttonc">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="Pre"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              {" "}
              Next{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
