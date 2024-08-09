import React, { useState, useEffect, Fragment } from "react";
import "./CustomerForm.css";

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
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editCustomerData) {
      const { name, ...rest } = editCustomerData;
      const [firstname, ...surnameParts] = name.split(" ");
      const surname = surnameParts.join(" ");
      setFormData({ ...rest, firstname, surname });
    }
  }, [editCustomerData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name: `${prevData.firstname} ${prevData.surname}`,
    }));
  }, [formData.firstname, formData.surname]);

  if (!isShowForm) {
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "Required";
    if (!formData.surname.trim()) newErrors.surname = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!formData.birthdate.trim()) newErrors.birthdate = "Required";
    if (!formData.gsm.trim()) newErrors.gsm = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    console.log(formData)
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
    });
    setErrors({});
  };

  return (
    <Fragment>
      <div className="overlay" onClick={toggleCancel}></div>
      <div className="customer-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            {errors.firstname && (
              <span className="error">{errors.firstname}</span>
            )}
            <input
              type="text"
              placeholder="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
            {errors.surname && <span className="error">{errors.surname}</span>}
          </div>
          <div className="form-group">
            <input
            className="birthdate"
              type="date"
              placeholder="BirthDate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
            {errors.birthdate && (
              <span className="error">{errors.birthdate}</span>
            )}
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
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          <div className="form-group">
            <input
              type="tel"
              pattern="\+90\d{10}"
              placeholder="+905555555555"
              name="gsm"
              value={formData.gsm}
              onChange={handleChange}
            />
            {errors.gsm && <span className="error">{errors.gsm}</span>}
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={toggleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CustomerForm;
