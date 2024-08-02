import { FaPlus } from "react-icons/fa";
import "./Form.css";
import React from "react";
import PropTypes from "prop-types";

export default function Form({ novaTarefa, handleChanged, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} action="#" className={"form"}>
      <input
        onChange={handleChanged}
        type="text"
        value={novaTarefa}
        placeholder="Coloque a nova tarefa"
      />
      <button type={"submit"}>
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  novaTarefa: PropTypes.string.isRequired,
  handleChanged: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
