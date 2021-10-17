import { useState, useEffect, useRef } from "react";
import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import { styled } from "@mui/styles";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { db, collection, doc, onSnapshot, query, orderBy } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails, setRoomDetails] = useState(() => {});
  const [roomMessages, setRoomMessages] = useState(() => []);

  useEffect(() => {
    if (roomId || roomMessages.length) {
      const ref1 = doc(collection(db, "rooms"), roomId);
      onSnapshot(ref1, (doc) => {
        setRoomDetails(doc.data());
      });

      const ref2 = query(
        collection(doc(collection(db, "rooms"), roomId), "messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(ref2, (docs) => {
        const temp = [];
        docs.forEach((doc) => {
          temp.push({ id: doc.id, data: doc.data() });
        });
        setRoomMessages(temp);
      });
    }

    if (!roomMessages.length) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [roomId, roomMessages.length]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.name && roomDetails.name}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages.map((doc) => {
              const { id, data } = doc;

              return (
                <Message
                  key={id}
                  message={data.message}
                  timestamp={data.timestamp}
                  user={data.user}
                  userImage={data.userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled("div")({
  paddingBottom: "200px"
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: "1px solid lightgray"
});

const ChatMessages = styled("div")({});

const HeaderLeft = styled("div")({
  display: "flex",
  alignItems: "center",

  "& > h4": {
    display: "flex",
    textTransform: "lowercase",
    marginRight: "10px"
  },

  "& > h4 > .MuiSvgIcon-root": {
    marginLeft: "10px",
    fontSize: "18px"
  }
});

const HeaderRight = styled("div")({
  "& > p": {
    display: "flex",
    alignItems: "center",
    fontSize: "14px"
  },

  "& > p > .MuiSvgIcon-root": {
    marginRight: "5px",
    fontSize: "16px"
  }
});

const ChatContainer = styled("div")({
  flex: 0.7,
  flexGrow: 1,
  overflowY: "scroll",
  marginTop: "60px"
});
