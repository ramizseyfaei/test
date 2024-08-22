import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../redux/apiSlice";
import { useEffect, useState } from "react";
import { setCustomerNames } from "../redux/customerSlice";

const SelectedCustomer = () => {
  const baseUrl = useSelector(BaseUrl);
  const [customerData, setCustomerData] = useState(null);
    const dispatch = useDispatch();
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  );

  useEffect(() => {
    axios
      .get(`${baseUrl}/customers`)
      .then((response) => {
        const names = response.data.map((customer) => customer.name);
        dispatch(setCustomerNames(names));
      })
      .catch((error) => {
        console.error("Error fetching customer names:", error);
      });
  }, [baseUrl, dispatch]);

  useEffect(() => {
    if (selectedCustomer) {
      axios
        .get(`${baseUrl}/customers?name=${selectedCustomer}`)
        .then((response) => {
          if (response.data.length > 0) {
            setCustomerData(response.data[0]);
          } else {
            setCustomerData(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [selectedCustomer, baseUrl]);

  return (
    <div>
      {customerData && (
        <div
          style={{
            margin: "20px auto",
            padding: "10px",
            width: "550px",
            border: "1px solid #ccc",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Selected Customer</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", marginRight: "30px" }}>
              <img
                src={customerData.imageUrl}
                alt={customerData.name}
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>
                <strong>Name:</strong> {customerData.name}
              </p>
              <p>
                <strong>Gender:</strong> {customerData.gender}
              </p>
              <p>
                <strong>Birthdate:</strong> {customerData.birthdate}
              </p>
              <p>
                <strong>GSM:</strong> {customerData.gsm}
              </p>
              <p>
                <strong>Email:</strong> {customerData.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedCustomer;
