import React from "react";

const NotesItem = (props) => {
  return (
    <li className='notes__item' style={{ backgroundColor: props.info.color }}>
      <span className='notes__priority'>{props.info.priority}</span>
      {props.info.text}
    </li>
  );
};

export default NotesItem;
