import React, { Fragment, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import "./CustomerList.css";
import CustomerForm from "./CustomerForm";
import CustomerPopup from "./CustomerPopup";

const CustomerList = () => {
  const [datas, setDatas] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [customerIndexToDelete, setCustomerIndexToDelete] = useState(null);
  const [editCustomerData, setEditCustomerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/customers");
        setDatas(response.data);
      } catch (error) {
        console.error("There was an error fetching the customers!", error);
      }
    };

    fetchData();
  }, []);

  const addCustomer = async (newCustomer) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/customers",
        newCustomer
      );
      setDatas([...datas, response.data]);
    } catch (error) {
      console.error("There was an error adding the customer!", error);
    }
  };

  const updateCustomer = async (index, updatedCustomer) => {
    try {
      await axios.put(
        `http://localhost:3001/customers/${datas[index].id}`,
        updatedCustomer
      );
      const updatedDatas = datas.map((customer, i) =>
        i === index ? updatedCustomer : customer
      );
      setDatas(updatedDatas);
    } catch (error) {
      console.error("There was an error updating the customer!", error);
    }
  };

  const deleteCustomer = async (index) => {
    try {
      await axios.delete(`http://localhost:3001/customers/${datas[index].id}`);
      const updatedDatas = datas.filter((_, i) => i !== index);
      setDatas(updatedDatas);
    } catch (error) {
      console.error("There was an error deleting the customer!", error);
    }
  };

  const handleEditClick = (index) => {
    setEditCustomerData({ ...datas[index], index });
    setIsShowForm(true);
  };

  const handleDeleteClick = (index) => {
    setCustomerIndexToDelete(index);
    setIsPopupOpen(true);
  };

  const confirmDelete = () => {
    if (customerIndexToDelete !== null) {
      deleteCustomer(customerIndexToDelete);
    }
    setIsPopupOpen(false);
    setCustomerIndexToDelete(null);
  };

  const cancelDelete = () => {
    setIsPopupOpen(false);
    setCustomerIndexToDelete(null);
  };

  const toggleFormVisibility = () => {
    setIsShowForm(!isShowForm);
    setEditCustomerData(null);
  };

  return (
    <Fragment>
      <div className="customer-list">
        <button className="customer-list-button" onClick={toggleFormVisibility}>
          Create New
        </button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>BirthDate</th>
              <th>GSM</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.birthdate}</td>
                <td>{data.gsm}</td>
                <td className="operation">
                  <FaEdit onClick={() => handleEditClick(index)} />
                  <RiDeleteBin5Fill onClick={() => handleDeleteClick(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomerForm
        isShowForm={isShowForm}
        setIsShowForm={setIsShowForm}
        addCustomer={addCustomer}
        editCustomerData={editCustomerData}
        updateCustomer={updateCustomer}
      />

      {isPopupOpen && (
        <CustomerPopup onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </Fragment>
  );
};

export default CustomerList;
