import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, {target: {value: "Project 1"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2022"}});
  fireEvent.click(element);
  fireEvent.change(inputTask, {target: {value: "Project 2"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2022"}});
  fireEvent.click(element);
  const check = screen.getAllByText(/Project 1/i)
  expect(check.length).toBe(1); 
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
 
  fireEvent.change(inputDate, {target: {value: "06/27/2023"}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/30/2022";
  fireEvent.change(inputTask, { target: { value: "Project 3"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkDate = screen.getByText(new RegExp("6/30/2022", "i"));
  expect(checkDate).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
 
  fireEvent.change(inputTask, {target: {value: "Project 3"}});
  fireEvent.change(inputDate, {target: {value: "06/27/2023"}});
  fireEvent.click(element);

  const checkTaskBox = screen.getByRole('checkbox');
  fireEvent.click(checkTaskBox);

  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); // i means case insensitive
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const LatedueDate = "05/30/2021";
  fireEvent.change(inputTask, { target: { value: "Test 1"}});
  fireEvent.change(inputDate, { target: { value: LatedueDate}});
  fireEvent.click(element);
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Test 2"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const Test1Check = screen.getByTestId(/Test 1/i).style.background;
  const Test2Check = screen.getByTestId(/Test 2/i).style.background;
  expect (Test1Check === Test2Check).toBe(false);
 });

 test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  
 });