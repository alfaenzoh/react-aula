import React, { Component } from "react";
//Form
import { FaPlus } from "react-icons/fa";
//Tarefas
import { FaEdit, FaWindowClose } from "react-icons/fa";
import "./Main.css";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  };

  handleChanged = (event) => {
    this.setState({
      novaTarefa: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index !== -1) {
      novasTarefas[index] = novaTarefa;
      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
      });
    } else {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: "",
      });
    }
  };

  handleEdit = (event, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  handleDelete = (event, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className={"main"}>
        <h1>Lista de Tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className={"form"}>
          <input
            onChange={this.handleChanged}
            type="text"
            value={novaTarefa}
            placeholder="Coloque a nova tarefa"
          />
          <button type={"submit"}>
            <FaPlus />
          </button>
        </form>

        <ul className={"tarefas"}>
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, index)}
                  className={"edit"}
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className={"delete"}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
