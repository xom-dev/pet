import React from "react";
import NotesItem from "./NotesItem";
import scss from "./NoteList.scss";

export default function NoteList(props) {
  return (
    <ul className="notes__list">
      {props.list.length
        ? props.list.map((item, i) => <NotesItem key={i} info={item} />)
        : null}
    </ul>
  );
}
