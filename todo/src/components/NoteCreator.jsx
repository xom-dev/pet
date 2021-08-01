import React, { useState } from "react";

import "./NoteCreator.scss";

const NoteCreator = (props) => {
  const [fields, setFields] = useState({
    color: "red",
    priority: 1,
    text: ""
  });

  const setColor = (color) => setFields({ ...fields, color });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    props.addNewNote(fields);

    resetFields();
  };

  const resetFields = () =>
    setFields({
      color: "red",
      priority: 1,
      text: ""
    });

  return (
    <form className='form' onSubmit={handleOnSubmit}>
      <div className='form__color-wrap'>
        <input
          type='radio'
          name='color'
          onChange={() => setColor("red")}
          checked={fields.color === "red"}
          className='form__color'
        />

        <input
          type='radio'
          name='color'
          onChange={() => setColor("blue")}
          checked={fields.color === "blue"}
          className='form__color'
        />

        <input
          type='radio'
          name='color'
          onChange={() => setColor("green")}
          checked={fields.color === "green"}
          className='form__color'
        />

        <select
          value={fields.priority}
          onChange={(e) => setFields({ ...fields, priority: +e.target.value })}
          className='form__priority'
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
      </div>

      <textarea
        value={fields.text}
        onChange={(e) => setFields({ ...fields, text: e.target.value })}
        className='form__textarea'
        cols='30'
        rows='10'
      ></textarea>

      <div className='form__btn-wrap'>
        <button onClick={resetFields} className='form__btn form__btn--reset' type='button'>
          Reset
        </button>

        <button className='form__btn form__btn--create' type='submit'>
          Create
        </button>
      </div>
    </form>
  );
};

export default NoteCreator;
