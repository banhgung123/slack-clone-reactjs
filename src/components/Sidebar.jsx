import React, { useEffect, useState } from "react";
import { styled } from "@mui/styles";
import SidebarOption from "./SidebarOption";
import {
  FiberManualRecord,
  Create,
  InsertComment,
  Inbox,
  Drafts,
  BookmarkBorder,
  PeopleAlt,
  Apps,
  FileCopy,
  ExpandLess,
  ExpandMore,
  Add
} from "@mui/icons-material";
import {
  db,
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from "./../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function Sidebar() {
  const [channels, setChannels] = useState(() => []);
  const user = useSelector(selectUser);

  useEffect(() => {
    const q = query(
      collection(db, "rooms"),
      where("name", "!=", ""),
      orderBy("name")
    );
    onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, name: doc.data().name });
      });
      setChannels(temp);
    });
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>SLACK HQ</h2>
          <h3>
            <FiberManualRecord />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channels" />
      {channels.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled("div")({
  color: "white",
  backgroundColor: "var(--slack-color)",
  flex: 0.3,
  borderTop: "1px solid #49274b",
  maxWidth: "260px",
  marginTop: "60px",

  "& > hr": {
    marginTop: "10px",
    marginBottom: "10px",
    border: "1px solid #49274b"
  }
});

const SidebarHeader = styled("div")({
  display: "flex",
  borderBottom: "1px solid #49274b",
  padding: "13px",

  "& > .MuiSvgIcon-root": {
    padding: "8px",
    color: "#49274b",
    fontSize: "18px",
    backgroundColor: "white",
    borderRadius: "999px"
  }
});

const SidebarInfo = styled("div")({
  flex: 1,

  "& > h2": {
    fontSize: "15px",
    fontWeight: 900,
    marginBottom: "5px"
  },

  "& > h3": {
    display: "flex",
    fontSize: "13px",
    fontWeight: 400,
    alignItems: "center"
  },

  "& > h3 > .MuiSvgIcon-root": {
    fontSize: "14px",
    marginTop: "1px",
    marginRight: "2px",
    color: "green"
  }
});
