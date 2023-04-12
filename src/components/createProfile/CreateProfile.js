//external imports
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//internal imports
import CreateProfileCard from "./CreateProfileCard";
import { notify } from "@/helpers/utilsFuctions";
import { useRegisterMutation } from "@/features/auth/authApi";

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

  const {
    user: { accessToken, email, uid },
  } = useSelector((state) => state.auth);

  const [postUser, { error, isError, data, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isError && error) {
      if (error?.status == 401) {
        notify(
          "Session expired! Please reload the page or login again.",
          "error"
        );
      } else {
        notify(error?.data?.message || "Something went wrong", "error");
      }
    }
    if (isSuccess && data?.isSuccess) {
      notify("Profile created successfully!", "success");
    }
  }, [isError, error, isSuccess, data]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();

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
    if (role == "student") {
      const resp = await postUser({
        role: "student",
        name: studentsInfo.name,
        profile: studentsInfo.image,
        email: email,
        status: "active",
        accessToken,
        uid,
        selectedPlan: "none",
      });
      console.log({ resp });
      // check isSuccess and redirect to dashboard
    } else {
      postUser({
        role: "teacher",
        name: teachersInfo.name,
        profile: teachersInfo.image,
        email: email,
        status: "active",
        accessToken,
        uid,
        selectedPlan: "none",
      });
    }
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
