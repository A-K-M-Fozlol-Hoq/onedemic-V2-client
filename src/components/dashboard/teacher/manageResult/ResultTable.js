import React, { useState } from "react";
import ViewResultDetails from "./ViewResultDetails";

const ResultTable = ({
  selectExam,
  setSelectExam,
  resultData,
  setResultData,
}) => {
  const [selectedStudentResult, setSelectedStudentResult] = useState(null);

  const viewStudentResult = (result) => {
    setSelectedStudentResult(result);
  };

  const closeDetailView = () => {
    setSelectedStudentResult(null);
  };

  const downloadCSV = () => {
    const csvHeader = "Exam Name,Exam Type,Student Name,Student Email,Mark\n";
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvHeader +
      resultData
        .map(
          (result) =>
            `${selectExam.examName},${result.examType},${result.student.name},${result.student.email},${result.mark}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exam_results.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-4 ">
      {selectedStudentResult ? (
        <ViewResultDetails
          selectedStudentResult={selectedStudentResult}
          closeDetailView={closeDetailView}
          resultData={resultData} // Pass the resultData
          setResultData={setResultData} // Pass the setResultData function
        />
      ) : (
        // <div>
        //   <button
        //     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        //     onClick={closeDetailView}
        //   >
        //     Back
        //   </button>
        //   <div>
        //     {/* Render detailed view content for the selected student */}
        //     <h2>Student Details</h2>
        //     <p>Student Name: {selectedStudentResult.student.name}</p>
        //     <p>Student Email: {selectedStudentResult.student.email}</p>
        //     <p>Exam Type: {selectedStudentResult.examType}</p>
        //     <p>Mark: {selectedStudentResult.mark}</p>
        //   </div>
        // </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setSelectExam({})}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={downloadCSV}
            >
              Download
            </button>
          </div>
          <div className="block sm:overflow-auto overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Exam Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Exam Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mark
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resultData.map((result) => (
                  <tr key={result._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {selectExam.examName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.examType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span style={{ marginRight: "10px" }}>{result.mark}</span>
                      {result.examType === "mcq" && (
                        <span
                          onClick={() => {
                            console.log(result);
                            console.log(result?._id);
                          }}
                          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 cursor-pointer"
                        >
                          Edit
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => viewStudentResult(result)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultTable;

// import React from "react";

// const ResultTable = ({
//   selectExam,
//   setSelectExam,
//   resultData,
//   setResultData,
// }) => {
//   const downloadMcqResult = () => {};
//   const downloadWrittenResult = () => {};
//   console.log(selectExam);
//   const downloadCSV = () => {
//     const csvHeader = "Exam Name,Exam Type,Student Name,Student Email,Mark\n";
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       csvHeader +
//       resultData
//         .map(
//           (result) =>
//             `${selectExam.examName},${result.examType},${result.student.name},${result.student.email},${result.mark}`
//         )
//         .join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "exam_results.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <div className="p-4 ">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//           onClick={() => setSelectExam({})}
//         >
//           Back
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={downloadCSV}
//         >
//           Download
//         </button>
//       </div>
//       <div className="block sm:overflow-auto overflow-x-auto">
// <table className="min-w-full divide-y divide-gray-200">
//   <thead>
//     <tr className="bg-gray-50">
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Exam Name
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Exam Type
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Student Name
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Student Email
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Mark
//       </th>
//       <th
//         scope="col"
//         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//       >
//         Actions
//       </th>
//     </tr>
//   </thead>
//   <tbody className="bg-white divide-y divide-gray-200">
//     {resultData.map((result) => (
//       <tr key={result._id}>
//         <td className="px-6 py-4 whitespace-nowrap">
//           {selectExam.examName}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">
//           {result.examType}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">
//           {result.student.name}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">
//           {result.student.email}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">
//           <span style={{ marginRight: "10px" }}>{result.mark}</span>
//           {result.examType === "mcq" && (
//             <span
//               onClick={() => {
//                 console.log(result);
//                 console.log(result?._id);
//               }}
//               className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 cursor-pointer"
//             >
//               Edit
//             </span>
//           )}
//         </td>
//         <td className="px-6 py-4 whitespace-nowrap">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => viewStudentResult(result)}
//           >
//             View
//           </button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ResultTable;
