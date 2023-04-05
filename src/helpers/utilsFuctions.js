import { toast } from "react-toastify";

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
