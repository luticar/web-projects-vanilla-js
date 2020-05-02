import React, { Fragment } from "react";
const IncomeAndExpense = () => (
  <Fragment>
    <div className="inc-exp-container">
      <div>
        <h4>Receitas</h4>
        <p id="money-plus" className="money plus">
          +R$0.00
        </p>
      </div>

      <div>
        <h4>Despesas</h4>
        <p id="money-minus" className="money minus">
          -R$0.00
        </p>
      </div>
    </div>
  </Fragment>
);
export default IncomeAndExpense;
