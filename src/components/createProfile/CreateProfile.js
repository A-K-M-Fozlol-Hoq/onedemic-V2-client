//external imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import { useRegisterMutation } from "@/features/auth/authApi";
import { getUser } from "@/features/auth/authSlice";
import { notify } from "@/helpers/utilsFuctions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRouter } from "next/router";
import CreateProfileCard from "./CreateProfileCard";

const CreateProfile = () => {
  const [selectedRole, setSelectedRole] = useState("student");
  const [studentsInfo, setStudentsInfo] = useState({
    name: "",
    image: "",
  });
  const [teachersInfo, setTeachersInfo] = useState({
    name: "",
    image: "",
  });
  const [role, setRole] = useState("");
  const { push } = useRouter();

  const {
    user: { accessToken, email, uid, selectedPlan },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && accessToken && selectedPlan) {
      push("/dashboard/manage-profile");
    }
  }, [email, accessToken, selectedPlan, push]);
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
      push("/dashboard/manage-profile");
    }
  }, [isError, error, isSuccess, data, push]);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    console.log({ studentsInfo }, { teachersInfo }, { role });
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
      try {
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
        // check redirect to dashboard
        dispatch(getUser({ accessToken, email: email }));
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const resp = await postUser({
          role: "teacher",
          name: teachersInfo.name,
          profile: teachersInfo.image,
          email: email,
          status: "active",
          accessToken,
          uid,
          selectedPlan: "none",
        });
        // check redirect to dashboard
        dispatch(getUser({ accessToken, email: email }));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[url('https://images.pexels.com/photos/434337/pexels-photo-434337.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-no-repeat bg-cover">
      <div className="block">
        <div className="w-full flex justify-center">
          <ToggleButtonGroup
            color="primary"
            value={selectedRole}
            className="bg-gray-50 rounded-lg"
            onChange={(e) => setSelectedRole(e.target.value)}
            exclusive
            aria-label="Platform"
          >
            <ToggleButton value="student" className="px-14">
              Student
            </ToggleButton>
            <ToggleButton value="teacher" className="px-14">
              Teacher
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="block md:flex justify-center gap-8 mt-4">
          {selectedRole === "student" ? (
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-8 px-10 rounded-lg">
              <h2 className="text-white text-lg font-bold mb-2">
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
          ) : (
            <div className="bg-gradient-to-r from-blue-500 to-sky-600 py-8 px-10 rounded-lg">
              <h2 className="text-white text-lg font-bold mb-2">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
