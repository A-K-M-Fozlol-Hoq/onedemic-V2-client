// utils.js

import { toast } from "react-toastify";

const utilsFunctions = {};

const notify = (
  message = "This is a notification message.",
  type = "info",
  autoClose = 2500
) => {
  toast(message, {
    autoClose: autoClose,
    type: type,
  });
};

utilsFunctions.notify = notify;

export default utilsFunctions;
