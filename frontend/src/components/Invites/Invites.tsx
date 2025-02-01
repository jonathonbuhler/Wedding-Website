import { useState } from "react";
import styles from "./Invites.module.css";

function Invites() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
  });

  const inputFields = [
    { name: "first_name", placeholder: "First Name", required: true },
    { name: "last_name", placeholder: "Last Name", required: true },
    { name: "address_1", placeholder: "Address Line 1", required: true },
    { name: "address_2", placeholder: "Address Line 2", required: false },
    { name: "city", placeholder: "City", required: true },
    { name: "state", placeholder: "State", required: true },
    { name: "postal", placeholder: "Postal / Zip Code", required: true },
    { name: "country", placeholder: "Country", required: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/add-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Successfully requested invite.");
      setFormData({
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postal: "",
        country: "",
      });
    } else {
      alert("Error requesting invite.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`grid ${styles["invites-container"]}`}>
      <h1>Request An Invite</h1>
      <p>Please fill out the form if you would like an invite mailed to you.</p>
      <form onSubmit={handleSubmit}>
        {inputFields.map((item, index) => (
          <input
            key={index}
            type="text"
            name={item.name}
            id={item.name}
            placeholder={item.placeholder}
            onChange={handleChange}
            required={item.required}
            value={formData[item.name as keyof typeof formData]}
          />
        ))}
        <input type="submit" />
      </form>
    </div>
  );
}

export default Invites;
