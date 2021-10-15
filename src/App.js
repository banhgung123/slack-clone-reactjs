import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { styled } from "@mui/styles";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Spinner } from "@mui/material";
import { auth, onAuthStateChanged } from "./firebase";

export default function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            photoUrl: user.photoURL
          })
        );
      }
    });
  }, []);

  // if (!user) {
  //   return (
  //     <AppLoading>
  //       <AppLoadingContents>
  //         <img
  //           src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
  //           alt=""
  //         />
  //         <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
  //       </AppLoadingContents>
  //     </AppLoading>
  //   );
  // }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

// const AppLoading = styled("div")({
//   textAlign: "center",
//   paddingBottom: "100px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",

//   "& > img": {
//     height: "100px",
//     padding: "20px",
//     marginBottom: "40px"
//   }
// });

// const AppLoadingContents = styled("div")({});

const AppBody = styled("div")({
  display: "flex",
  height: "100vh"
});
