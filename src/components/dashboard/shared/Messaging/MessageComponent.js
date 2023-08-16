import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Button, TextField, Grid, Paper } from "@material-ui/core";

import { Scrollbars } from "react-custom-scrollbars";
import classNames from "classnames";

const serverURL = "http://localhost:5000";
// const socket = io(serverURL); // Initialize Socket.io client
let socket;

const MessageComponent = ({ courseId }) => {
  // const courseId = "64ca377d9cab010d1c3f450a"; // You can get courseId from URL, for now, hardcoding for simplicity
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollbarsRef = useRef();
  const [isChatLoading, setIsChatLoading] = useState(true);

  const {
    user: { accessToken, email, _id, selectedPlan, role },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchInitialMessages();
    socket = io(serverURL, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.emit("join", { userId: _id, room: courseId }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("message", (message) => {
      console.log(message, "new");
      setMessages((exitstingMsgs) => [message, ...exitstingMsgs]);
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    });

    socket.on("userList", (message) => {
      console.log(message, "client 24");
    });

    return () => {
      // socket.emit("disconnect");
      socket.disconnect();
      socket.close();
    };
  }, []);

  // Fetch initial messages from the server
  const fetchInitialMessages = async () => {
    try {
      const response = await fetch(
        `${serverURL}/api/v1/chat/get-messages/${courseId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      if (data?.length > 0) {
        setMessages(data);
      } else {
        setMessages([]);
      }
      setIsChatLoading(false);

      scrollToBottom(); // Scroll to bottom after messages are loaded
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Save a new message to the database and emit it to the server
  const handleSendMessage = async () => {
    try {
      if (!message) {
        return;
      }
      // Emit the sendMessage event to the server to notify other clients
      socket.emit("message", {
        message,
        courseId,
        isSentFromTeacher: role === "teacher",
        senderId: _id,
      });
      setMessage(""); // Clear the message input

      setTimeout(() => {
        scrollToBottom();
      }, 0); // Scroll to bottom after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sendMessage = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleSendMessage();
    }
  };

  // Scroll to the bottom of the message component
  const scrollToBottom = () => {
    scrollbarsRef.current?.scrollToBottom();
  };

  return (
    <Grid container direction="column" alignItems="stretch" justify="flex-end">
      <Grid item xs={12}>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {!isChatLoading && messages.length === 0 && <i>No messages found!</i>}
        </div>

        <Paper className="p-4">
          <Scrollbars style={{ height: "300px" }} ref={scrollbarsRef}>
            <div className="flex flex-col-reverse">
              {messages?.map((msg) => (
                <div
                  key={msg._id}
                  className={classNames("rounded p-2 mb-2", {
                    "bg-blue-100": msg.isSentFromTeacher,
                    "ml-auto": msg.senderId?._id === _id, // Align user's message to the right
                  })}
                >
                  {msg.senderId?._id !== _id && (
                    <div className="font-bold mb-1">{msg.senderId?.name}</div>
                  )}
                  {msg.message}
                </div>
              ))}
            </div>
          </Scrollbars>
        </Paper>
      </Grid>
      <Grid item xs={12} className="mt-4">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              variant="outlined"
              label="New Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={sendMessage}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageComponent;

// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { Button, TextField, Grid, Paper } from "@material-ui/core";

// import { Scrollbars } from "react-custom-scrollbars";
// import classNames from "classnames";

// const serverURL = "http://localhost:5000";
// // const socket = io(serverURL); // Initialize Socket.io client
// let socket;

// const MessageComponent = ({ courseId }) => {
//   // const courseId = "64ca377d9cab010d1c3f450a"; // You can get courseId from URL, for now, hardcoding for simplicity
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const scrollbarsRef = useRef();
//   const [isChatLoading, setIsChatLoading] = useState(true);

//   const {
//     user: { accessToken, email, _id, selectedPlan },
//   } = useSelector((state) => state.auth);

//   useEffect(() => {
//     fetchInitialMessages();
//     socket = io(serverURL, {
//       transports: ["websocket", "polling", "flashsocket"],
//     });

//     socket.emit("join", { userId: _id, room: courseId }, (error) => {
//       if (error) {
//         alert(error);
//       }
//     });

//     socket.on("message", (message) => {
//       console.log(message, "new");
//       setMessages((exitstingMsgs) => [message, ...exitstingMsgs]);
//       setTimeout(() => {
//         scrollToBottom();
//       }, 0);
//     });

//     socket.on("userList", (message) => {
//       console.log(message, "client 24");
//     });

//     return () => {
//       // socket.emit("disconnect");
//       socket.disconnect();
//       socket.close();
//     };
//   }, []);

//   // Fetch initial messages from the server
//   const fetchInitialMessages = async () => {
//     try {
//       const response = await fetch(
//         `${serverURL}/api/v1/chat/get-messages/${courseId}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       const data = await response.json();
//       if (data?.length > 0) {
//         setMessages(data);
//       } else {
//         setMessages([]);
//       }
//       setIsChatLoading(false);

//       scrollToBottom(); // Scroll to bottom after messages are loaded
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Save a new message to the database and emit it to the server
//   const handleSendMessage = async () => {
//     try {
//       if (!message) {
//         return;
//       }
//       // Emit the sendMessage event to the server to notify other clients
//       socket.emit("message", {
//         message,
//         courseId,
//         isSentFromTeacher: Math.random() < 0.5,
//         senderId: _id,
//       });
//       setMessage(""); // Clear the message input

//       setTimeout(() => {
//         scrollToBottom();
//       }, 0); // Scroll to bottom after sending the message
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const sendMessage = (e) => {
//     if (e.key === "Enter" && e.target.value) {
//       handleSendMessage();
//     }
//   };

//   // Scroll to the bottom of the message component
//   const scrollToBottom = () => {
//     scrollbarsRef.current.scrollToBottom();
//   };

//   return (
//     <Grid container direction="column" alignItems="stretch" justify="flex-end">
//       <Grid item xs={12}>
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           {!isChatLoading && messages.length === 0 && <i>No messages found!</i>}
//         </div>

//         <Paper className="p-4">
//           <Scrollbars style={{ height: "300px" }} ref={scrollbarsRef}>
//             <div className="flex flex-col-reverse">
//               {messages?.map((msg) => (
//                 <div
//                   key={msg._id}
//                   className={classNames("rounded p-2 mb-2", {
//                     "bg-blue-100": msg.isSentFromTeacher,
//                     "ml-auto": msg.senderId === _id, // Align user's message to the right
//                   })}
//                 >
//                   {msg.senderId !== _id && (
//                     <div className="font-bold mb-1">{msg.senderId.name}</div>
//                   )}
//                   {msg.message}
//                 </div>
//               ))}
//             </div>
//           </Scrollbars>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} className="mt-4">
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={10}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               label="New Message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={sendMessage}
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSendMessage}
//             >
//               Send
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default MessageComponent;
