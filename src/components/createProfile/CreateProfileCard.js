//external imports

//internal imports
import { notify } from "@/helpers/utilsFuctions";

const CreateProfileCard = (props) => {
  const { handleCreateProfile, data, setData, role, setRole } = props;

  const handleFileUpload = async (file) => {
    try {
      const imageData = new FormData();
      imageData.set("key", "4a118cdd62eafe33d42897dea91efe22");
      imageData.append("image", file);
      notify("Image uploading...", "info");

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imageData,
      });
      const jsonResponse = await response.json();

      notify(
        "Image uploaded successfully" + jsonResponse?.data?.url,
        "success"
      );

      setData({
        ...data,
        image: jsonResponse?.data?.url || "",
      });
    } catch (e) {
      notify(e.message || "Failed to upload imaage", "error");
    }
  };

  return (
    <form onSubmit={handleCreateProfile}>
      <div className="mb-2">
        <label className="text-white block mb-1" htmlFor="name">
          Name:
        </label>
        <input
          className="p-2 rounded-lg w-full bg-blue-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          id="name"
          value={data.name}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-2">
        <label className="text-white block mb-1" htmlFor="image">
          Profile Picture:
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="cursor-pointer block w-full text-sm text-slate-50
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-indigo-800
          hover:file:bg-violet-100"
        />
      </div>
      <button
        className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg mt-5 w-full capitalize"
        type="submit"
        onClick={() => setRole(role)}
        disabled={!data.image}
      >
        Create {role} Profile
      </button>
    </form>
  );
};

export default CreateProfileCard;
