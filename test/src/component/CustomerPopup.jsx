import styles from "./CustomerPopup.module.css";
import Button from '@mui/material/Button';


const CustomerPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles["confirmation-popup"]}>
      <div className={styles["popup-content"]}>
        <p>Are you sure to delete this record?</p>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="success"
          sx={{ width:'120px',height: "35px", fontSize: "17px" }}
        >
          Yes
        </Button>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="error"
          sx={{  width:'120px',height: "35px", fontSize: "17px" }}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default CustomerPopup;
