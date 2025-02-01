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
    { name: "firstName", placeholder: "First Name", required: true },
    { name: "lastName", placeholder: "Last Name", required: true },
    { name: "streetAddress1", placeholder: "Address Line 1", required: true },
    { name: "streetAddress2", placeholder: "Address Line 2", required: false },
    { name: "city", placeholder: "City", required: true },
    { name: "state", placeholder: "State", required: true },
    { name: "postalCode", placeholder: "Postal / Zip Code", required: true },
    { name: "countryName", placeholder: "Country", required: true },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`grid ${styles["invites-container"]}`}>
      <h1>Recieve An Invite</h1>
      <p>Please fill out the form if you would like an invite mailed to you.</p>
      <form action="">
        {inputFields.map((item, index) => (
          <input
            key={index}
            type="text"
            name={item.name}
            id={item.name}
            placeholder={item.placeholder}
            onChange={handleChange}
            required={item.required}
          />
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Invites;
