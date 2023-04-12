//external imports
import { toast } from "react-toastify";

//Export notify to show colorful pupup message at UI
export const notify = (
  message = "This is a notification message.",
  type = "info",
  autoClose = 2500
) => {
  toast(message, {
    autoClose: autoClose,
    type: type,
  });
};
