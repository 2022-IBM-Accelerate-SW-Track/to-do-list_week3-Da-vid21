import React from "react";
import "../component/todos.css";
import date from "./AddTodo.js"
import { Card, CardContent, Checkbox, Grid, ListItemButton, ListItemText } from "@mui/material";

// 1. This component formats and returns the list of todos.
// 2. Treat the question mark like an if statement.
// If the todos array has items in the list [todos.length], we want to return the list
// Else, return a message saying "You have no todo's left"
// 3. The map function is called to assign each array item with a key
// 4. Think of lines 14-23 as a loop. For each todo in the todo list, we want to give the list item
// a key, and it's own card shown in the UI
const Todos = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map((todo) => {
      let color = "rgba(0,255,0,0.9)";

      if (new Date(todo.due) < new Date()){
        color = "rgba(255, 0, 0, 0.9)";
      }
      
      return (
        <Grid key={todo.id}>
          <Card style={{backgroundColor: color}}>
            {/* Remember, we set the local state of this todo item when the user submits the form in 
            AddTodo.js. All we need to do is return the todo list item {todo.content} */}
            <ListItemButton component="a" href="#simple-list" style={{marginTop: 10}} >
              <Checkbox style={{paddingLeft:0, color: "#1565c0"}} onClick={() => deleteTodo(todo.id)}></Checkbox>
              <ListItemText primary={todo.content} secondary={"Due date is " + todo.due}  />
              
            </ListItemButton>
             
          </Card>
        </Grid>
      );
    })
  ) : (
    <p>You have no todo's left </p>
  );
  // Lastly, return the todoList constant that we created above to show all of the items on the screen.
  return (
    <div className="todoCollection" style={{ padding: "10px" }}>
      {todoList}
      
    </div>
  );
};

export default Todos;
