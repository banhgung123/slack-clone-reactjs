import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/styles";
import { serverTimestamp, db, doc, addDoc, collection } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function ChatInput({ channelName = "", channelId, chatRef }) {
  const [input, setInput] = useState(() => "");
  const user = useSelector(selectUser);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) return false;

    const ref = collection(doc(collection(db, "rooms"), channelId), "messages");
    addDoc(ref, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL
    });
    setInput("");
  };

  chatRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled("div")({
  borderRadius: "20px",

  "& > form": {
    position: "relative",
    display: "flex",
    justifyContent: "center"
  },

  "& > form > input": {
    position: "fixed",
    bottom: "30px",
    width: "60%",
    border: "1px solid gray",
    borderRadius: "3px",
    padding: "20px",
    outline: "none"
  },

  "& > form > button": {
    display: "none"
  }
});
