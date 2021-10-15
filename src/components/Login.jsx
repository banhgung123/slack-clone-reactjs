import { Button } from "@mui/material";
import { styled } from "@mui/styles";
import { useDispatch } from "react-redux";
import { auth, signInWithPopup, provider } from "../firebase";
import { login } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider).then((user) => {
      dispatch(login({
          displayName: user.displayName,
          photoUrl: user.photoURL
        }));
    });
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn.tgdd.vn/GameApp/2/224627/Screentshots/slack-224627-logo-16-06-2020.png"
          alt=""
        />
        <h1>Sign in to SLACK</h1>
        <p>slack.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled("div")({
  backgroundColor: "#f8f8f8",
  height: "100vh",
  display: "grid",
  placeItems: "center"
});

const LoginInnerContainer = styled("div")({
  padding: "100px",
  textAlign: "center",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",

  "& > img": {
    objectFit: "contain",
    height: "100px",
    marginBottom: "40px"
  },

  "& > button": {
    marginTop: "50px",
    textTransform: "inherit",
    backgroundColor: "#0a8d48",
    color: "white"
  }
});
