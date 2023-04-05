//external imports
import { useState } from "react";

//internal imports
import CreateProfileCard from "./CreateProfileCard";
import { notify } from "@/helpers/utilsFuctions";

const CreateProfile = () => {
  const [studentsInfo, setStudentsInfo] = useState({
    name: "",
    image: "dfg",
  });
  const [teachersInfo, setTeachersInfo] = useState({
    name: "",
    image: "dfg",
  });
  const [role, setRole] = useState("");

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    console.log("role: " + role);
    if (role === "student" && !(studentsInfo.name && studentsInfo.image)) {
      notify("Please enter your name and profile picture properly", "error");
      return;
    } else if (
      role === "teacher" &&
      !(teachersInfo.name && teachersInfo.image)
    ) {
      notify("Please enter your name and profile picture properly", "error");
      return;
    }

    notify("Account creating" + role, "info");
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="flex justify-center space-x-4">
        <div className="bg-blue-500 p-4 rounded-lg">
          <h2 className="text-white font-bold mb-2">
            Create Profile as Student
          </h2>
          <CreateProfileCard
            handleCreateProfile={handleCreateProfile}
            data={studentsInfo}
            setData={setStudentsInfo}
            role="student"
            setRole={setRole}
          ></CreateProfileCard>
        </div>
        <div className="bg-blue-500 p-4 rounded-lg">
          <h2 className="text-white font-bold mb-2">
            Create Profile as Teacher
          </h2>
          <CreateProfileCard
            handleCreateProfile={handleCreateProfile}
            data={teachersInfo}
            setData={setTeachersInfo}
            role="teacher"
            setRole={setRole}
          ></CreateProfileCard>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
