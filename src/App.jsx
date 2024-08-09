import { Fragment } from "react";
import "./App.css";
import CustomerList from "./component/CustomerList";
import CustomerForm from "./component/CustomerForm";

function App() {
  return (
    <div className="app-flex">
      <CustomerList />
      <CustomerForm />
    </div>
  );
}

export default App;
