/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "@/helpers/utilsFuctions";
import axios from "axios";
import { setUserDetails } from "@/features/auth/authSlice";

const ManageProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.profile);
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFileUpload = async (file) => {
    try {
      const imageData = new FormData();
      imageData.set("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);
      imageData.append("image", file);
      notify("Image uploading...", "info");

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imageData,
      });
      const data = await response.json();

      notify("Image uploaded successfully" + data?.data?.url, "success");

      setImage(data?.data?.url || "");
    } catch (e) {
      notify(e.message || "Failed to upload imaage", "error");
    }
  };

  const handleSave = () => {
    console.log("New name:", name);
    console.log("Updated image:", image);
    const body = {
      name,
      profile: image,
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_DEV_URL}/user/update-user-name-and-profile/${user?.email}`,
        body,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((data) => {
        const newUser = { ...user };
        newUser.name = name;
        newUser.profile = image;
        console.log({ newUser }, name, image, 1234);
        dispatch(setUserDetails(newUser));
        notify("Name and profile updated successfully", "success");
      })
      .catch(async (e) => {
        console.log(e);
        notify(
          e.message || "Failed to update name and profile picture",
          "error"
        );
      });
    // `${process.env.NEXT_PUBLIC_DEV_URL}/user/update-user-name-and-profile/${user.email}`
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="p-6 border rounded-lg"
        style={{ width: "60%", backgroundColor: "#f0f9ff" }}
      >
        <h2 className="text-2xl mb-4">Manage Profile</h2>

        <div className="mb-6">
          <img
            src={image}
            alt="Previous Profile"
            className="mb-2"
            style={{ width: "150px", borderRadius: "10px" }}
          />
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="mb-2"
          />
          <label htmlFor="profile-image" className="mb-2">
            <div>Click to update image</div>
          </label>
        </div>

        <div className="mb-6">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            placeholder={name}
          />
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
