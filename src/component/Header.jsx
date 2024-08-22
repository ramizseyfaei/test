import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./Header.module.css";
import { setSelectedCustomer } from "../redux/customerSlice"; // Redux'tan setSelectedCustomer'ı al
import btargeImg from "../images/btarge.png";

const Header = () => {
  const dispatch = useDispatch();
  const customerNames = useSelector((state) => state.customer.customerNames);

  return (
    <Fragment>
      <div className={styles["header"]}>
        <img src={btargeImg} alt="Şirket Logosu" />
        <h1>BTARGE</h1>
        <Autocomplete
          disablePortal
          options={customerNames}
          onChange={(event, newValue) => {
            dispatch(setSelectedCustomer(newValue));
          }}
          renderInput={(params) => <TextField {...params} label="Customers" />}
        />
      </div>
    </Fragment>
  );
};

export default Header;
