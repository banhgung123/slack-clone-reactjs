import { styled } from "@mui/styles";

function Message({ message, timestamp, user, userImage }) {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {`${user} `}
          <span>{}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "20px",

  "& > img": {
    height: "50px",
    borderRadius: "8px"
  }
});

const MessageInfo = styled("div")({
  paddingLeft: "10px",

  "& > h4 > span": {
    color: "gray",
    fontWeight: 300,
    marginLeft: "4px",
    fontSize: "10px"
  }
});
