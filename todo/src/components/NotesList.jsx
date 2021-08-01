import React from "react";

import NotesItem from "./NotesItem";
import "./NotesList.scss";

const NotesList = (props) => {
  console.log(props.list);

  return (
    <ul className='notes__list'>
      {props.list.length ? props.list.map((item, i) => <NotesItem key={i} info={item} />) : null}
    </ul>
  );
};

export default NotesList;
