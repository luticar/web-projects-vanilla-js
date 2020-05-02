import React, { useState, useEffect, useCallback, Fragment } from "react";
import IncomeAndExpense from "./IncomeAndExpense";
import TransactionsList from "./TransactionsList";
import Form from "./Form";
const Tracker = () => {
  // const transactionsUl = document.getElementById("transactions");
  // const incomeDisplay = document.getElementById("money-plus");
  // const expenseDisplay = document.getElementById("money-minus");
  // const balance = document.getElementById("balance");
  // const form = document.getElementById("form");
  // let inputTransactionName = document.getElementById("text");
  // let inputTransactionAmount = document.getElementById("amount");
  // const localStorageTransactions = JSON.parse(
  //   localStorage.getItem("transactions")
  // );

  // let transactions =
  //   localStorage.getItem("transactions") !== null
  //     ? localStorageTransactions
  //     : [];

  // const removeTransaction = (ID) => {
  //   transactions = transactions.filter((transaction) => transaction.id !== ID);
  //   updateLocalStorage();
  //   init();
  // };
  // const updateLocalStorage = () =>
  //   localStorage.setItem("transactions", JSON.stringify(transactions));

  // const addTransactionIntoDOM = ({ amount, name, id }) => {
  //   const operator = amount < 0 ? "-" : "+";
  //   const CSSClass = amount < 0 ? "minus" : "plus";
  //   const amountWithoutOperator = Math.abs(amount);
  //   const li = document.createElement("li");

  //   li.classList.add(CSSClass);
  //   li.innerHTML = `${name}<span>${operator} R$${amountWithoutOperator}</span>
  // <button class='delete-btn' onClick='removeTransaction(${id})'>
  // x
  // </button>`;
  //   transactionsUl.append(li);
  // };

  // const init = () => {
  //   transactionsUl.innerHTML = "";
  //   transactions.forEach(addTransactionIntoDOM);
  //   updateBalanceValues();
  // };

  // const getExpenses = (transactionsAmounts) =>
  //   Math.abs(
  //     transactionsAmounts
  //       .filter((value) => value < 0)
  //       .reduce((acc, value) => acc + value, 0)
  //   ).toFixed(2);

  // const getIncomes = (transactionsAmounts) =>
  //   transactionsAmounts
  //     .filter((value) => value > 0)
  //     .reduce((acc, value) => acc + value, 0)
  //     .toFixed(2);
  // const getTotal = (transactionsAmounts) =>
  //   transactionsAmounts
  //     .reduce((accumulator, transaction) => accumulator + transaction, 0)
  //     .toFixed(2);
  // const updateBalanceValues = () => {
  //   const transactionsAmounts = transactions.map(
  //     (transactions) => transactions.amount
  //   );
  //   const expense = getExpenses(transactionsAmounts);
  //   const income = getIncomes(transactionsAmounts);
  //   const total = getTotal(transactionsAmounts);

  //   balance.textContent = `R$ ${total}`;
  //   expenseDisplay.textContent = `R$ ${expense}`;
  //   incomeDisplay.textContent = `R$ ${income}`;
  // };
  // const generateID = () => Math.round(Math.random() * 1000);

  // const addToTransactionArray = (transactionName, transactionAmount) => {
  //   let transaction = {
  //     id: generateID(),
  //     name: transactionName,
  //     amount: Number(transactionAmount),
  //   };
  //   transactions.push(transaction);
  // };
  // const cleanInputs = () => {
  //   inputTransactionName = "";
  //   inputTransactionAmount = "";
  // };
  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const transactionName = inputTransactionName.value.trim();
  //   const transactionAmount = inputTransactionAmount.value.trim();
  //   const isSomeInputEmpty = transactionName === "" || transactionAmount === "";
  //   if (isSomeInputEmpty) {
  //     alert("Por favor, preencha o nome da transação e seu valor.");
  //     return;
  //   }
  //   addToTransactionArray(transactionName, transactionAmount);
  //   init();
  //   updateLocalStorage();
  //   cleanInputs();
  // };
  // // event listeners
  // form.addEventListener("submit", handleFormSubmit);

  // init();

  return (
    <div className="container">
      <h4>Saldo atual</h4>
      <h1 id="balance" className="balance">
        R$0.00
      </h1>
      <IncomeAndExpense />
      <h3>Transações</h3>
      <TransactionsList />
      <h3>Adicionar transação</h3>
      <Form />
    </div>
  );
};

export default Tracker;
