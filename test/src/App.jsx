import "./App.css";
import CustomerList from "./component/CustomerList";
import Footer from "./component/Footer";
import Header from "./component/Header";
import SelectedCustomer from "./component/SelectedCustomer";


function App() {
  return (
    <div className="app-flex">
      <Header/>
      <SelectedCustomer/>
      <CustomerList />
      <Footer/>
    </div>
  );
}

export default App;
