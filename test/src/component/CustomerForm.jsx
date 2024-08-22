import React, { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./CustomerForm.module.css";

const CustomerForm = ({
  isShowForm,
  setIsShowForm,
  addCustomer,
  editCustomerData,
  updateCustomer,
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    name: "",
    gender: "",
    birthdate: "",
    gsm: "",
    email: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (editCustomerData) {
      const { name, birthdate, ...rest } = editCustomerData;
      const [firstname, ...surnameParts] = name.split(" ");
      const surname = surnameParts.join(" ");
      setFormData({ ...rest, firstname, surname, birthdate });
    }
  }, [editCustomerData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = true;
    if (!formData.surname.trim()) newErrors.surname = true;
    if (!formData.gender) newErrors.gender = true;
    if (!formData.birthdate.trim()) newErrors.birthdate = true;
    if (!formData.gsm.trim()) newErrors.gsm = true;
    if (!formData.email.trim()) newErrors.email = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = true;
    }

    const gsmPattern = /^\+90\d{10}$/;
    if (formData.gsm && !gsmPattern.test(formData.gsm)) {
      newErrors.gsm = true;
    }

    const today = new Date();
    const birthDate = new Date(formData.birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      age < 18 ||
      (age === 18 && monthDifference < 0) ||
      (age === 18 &&
        monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      newErrors.birthdate = true;
    }

    if (age > 100) {
      newErrors.birthdate = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      return {
        ...updatedData,
        name: `${updatedData.firstname} ${updatedData.surname}`,
      };
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editCustomerData) {
        updateCustomer(editCustomerData.index, formData);
      } else {
        addCustomer(formData);
      }
      setIsShowForm(false);
      resetForm();
    }
  };

  const toggleCancel = () => {
    setIsShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      surname: "",
      name: "",
      gender: "",
      birthdate: "",
      gsm: "",
      email: "",
      imageUrl: "",
    });
    setErrors({});
  };

  if (!isShowForm) {
    return null;
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Fragment>
      <div className={styles["overlay"]} onClick={toggleCancel}></div>
      <div className={styles["customer-form"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <TextField
              label="Firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              className={errors.firstname ? styles["error-input"] : ""}
              fullWidth
              sx={{ marginRight: "25px" }}
            />
            <TextField
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              error={!!errors.surname}
              className={errors.surname ? styles["error-input"] : ""}
              fullWidth
            />
          </div>
          <div className={styles["form-group"]}>
            <TextField
              label="Birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              error={!!errors.birthdate}
              className={`${styles["form-control"]} ${
                errors.birthdate ? styles["error-input"] : ""
              }`}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <label>Male</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <label>Female</label>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <TextField
              label="GSM"
              name="gsm"
              type="tel"
              value={formData.gsm}
              onChange={handleChange}
              error={!!errors.gsm}
              className={errors.gsm ? styles["error-input"] : ""}
              fullWidth
              sx={{ marginRight: "25px" }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              className={errors.email ? styles["error-input"] : ""}
              fullWidth
            />
          </div>
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{height:'45px'}}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginLeft:'2px', marginRight:'2px', height: "45px", fontSize: "17px" }}
            >
              Save
            </Button>
            <Button
              onClick={toggleCancel}
              variant="outlined"
              color="error"
              sx={{ height: "45px", fontSize: "17px" }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CustomerForm;
