import React, { Fragment } from "react";
const Form = () => (
  <Fragment>
    <form id="form">
      <div className="form-control">
        <label for="text">Nome</label>
        <input
          autofocus
          type="text"
          id="text"
          placeholder="Nome da transação"
        />
      </div>

      <div className="form-control">
        <label for="amount">
          Valor <br />
          <small>(negativo - despesas, positivo - receitas)</small>
        </label>
        <input type="number" id="amount" placeholder="Valor da transação" />
      </div>

      <button className="btn">Adicionar</button>
    </form>
  </Fragment>
);
export default Form;
