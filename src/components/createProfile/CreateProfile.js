//external imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import CreateProfileCard from "./CreateProfileCard";
import { notify } from "@/helpers/utilsFuctions";
import { useRegisterMutation } from "@/features/auth/authApi";
import { getUser } from "@/features/auth/authSlice";
import { useRouter } from "next/router";

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
  const { push } = useRouter();

  const {
    user: { accessToken, email, uid, selectedPlan },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && accessToken && selectedPlan) {
      push("/dashboard");
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
