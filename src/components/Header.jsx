import React from "react";
// import { styled } from "@mui/material/styles";
import { styled } from "@mui/styles";
// import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth, signOut } from "../firebase";

function Header() {
  const user = useSelector(selectUser);

  const logOut = () => {
    signOut(auth);
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={logOut}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search" />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

// const HeaderContainer = styled.div`
//   display: flex;
//   position: fixed;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   padding: 10px 0;
//   background-color: var(--slack-color);
//   color: white;
// `;

const HeaderContainer = styled("div")({
  display: "flex",
  position: "fixed",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  backgroundColor: "var(--slack-color)",
  color: "white"
});

// const HeaderLeft = styled.div`
//   flex: 0.3;
//   display: flex;
//   align-items: center;
//   margin-left: 20px;
//   & > .MuiSvgIcon-root {
//     margin-left: auto;
//     margin-right: 30px;
//   }
// `;

const HeaderLeft = styled("div")({
  flex: 0.3,
  display: "flex",
  alignItems: "center",
  marginLeft: "20px",
  "& > .MuiSvgIcon-root": {
    marginLeft: "auto",
    marginRight: "30px"
  }
});

// const HeaderAvatar = styled(Avatar)`
//   cursor: pointer;
//   &:hover {
//     opacity: 0.8;
//   }
// `;

const HeaderAvatar = styled(Avatar)({
  cursor: "pointer",

  "&:hover": {
    opacity: 0.8
  }
});

const HeaderSearch = styled("div")({
  flex: 0.4,
  opacity: 1,
  borderRadius: "6px",
  backgroundColor: "#421f44",
  textAlign: "center",
  display: "flex",
  padding: "0 50px",
  color: "gray",
  border: "1px gray solid",

  "& > input": {
    backgroundColor: "transparent",
    border: "none",
    textAlign: "center",
    minWidth: "30vw",
    outline: 0,
    color: "white"
  }
});

const HeaderRight = styled("div")({
  flex: 0.3,
  display: "flex",
  alignItems: "flex-end",

  "& > .MuiSvgIcon-root": {
    marginLeft: "auto",
    marginRight: "20px"
  }
});
