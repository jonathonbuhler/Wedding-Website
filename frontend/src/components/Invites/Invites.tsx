import { useState } from "react";
import styles from "./Invites.module.css";

function Invites() {
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    postalCode: "",
    countryName: "",
  });

  const inputFields = [
    { name: "fullName", placeholder: "Full Name" },
    { name: "streetAddress1", placeholder: "Address Line 1" },
    { name: "streetAddress2", placeholder: "Address Line 2" },
    { name: "city", placeholder: "City" },
    { name: "state", placeholder: "State" },
    { name: "postalCode", placeholder: "Postal / Zip Code" },
    { name: "countryName", placeholder: "Country" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`grid ${styles["invites-container"]}`}>
      <h1>Invites</h1>
      <p>Please fill out the form if you would like an invite mailed to you</p>
      <form action="">
        {inputFields.map((item, index) => (
          <input
            key={index}
            type="text"
            name={item.name}
            id={item.name}
            placeholder={item.placeholder}
            onChange={handleChange}
          />
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Invites;
