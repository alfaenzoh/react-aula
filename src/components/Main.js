import React, { Component } from "react";
import "./Main.css";
import Form from "./Form";
import Tarefas from "./Tarefas";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
  };

  componentDidMount() {
    const tarefas = localStorage.getItem("tarefas");
    if (!tarefas) return;
    this.setState({ tarefas: JSON.parse(tarefas) });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;
    if (tarefas === prevState.tarefas) return;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

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
        novaTarefa: "",
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
        <Form
          handleSubmit={this.handleSubmit}
          handleChanged={this.handleChanged}
          novaTarefa={novaTarefa}
        />
        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
