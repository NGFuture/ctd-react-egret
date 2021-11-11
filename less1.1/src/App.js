import React from 'react';
import TodoList from './TodoList.js';
import AddTodoForm from './AddTodoForm.js';

import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router-dom";


function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  console.log(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`);

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`, 
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,     
        },
      }
    ).then((resp) => resp.json())
    .then((data) => {
      setTodoList(data.records);
      setIsLoading(false);
    })
  }, []);


  React.useEffect(
    () => {
      if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));}},
    [todoList]
  );

  const addTodo = (newTodo) => { 
    setTodoList([...todoList, newTodo]);
  };  



  const removeTodo = (id) => {
    const newTodoList = todoList.filter(
      (item) => item.id !== id
    )
    setTodoList(newTodoList);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <> 
            <h1>TODO list</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <p>{isLoading ?'Loading...' : null}</p>
            <TodoList  todoList={todoList} onRemoveTodo = {removeTodo}/>
          </>
        </Route>
        <Route path="/new">
          <h1>New Todo List</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
 


export default App;
