import styles from "./Admin.module.css";
import { useEffect, useState } from "react";

type Invite = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postal: string;
  country: string;
};

function Login() {
  return (
    <>
      <h1>Login</h1>
    </>
  );
}

function Admin() {
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/load-invites")
      .then((response) => response.json())
      .then((data) => setInvites(data))
      .catch((error: any) => console.error("Error loading invites", error));
  }, []);

  return (
    <div className={styles["admin-container"]}>
      <h1>Admin</h1>
      <table className={styles.incomplete}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {invites.map((item, index) => (
            <tr key={index}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.address_1}</td>
              <td>{item.address_2}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.postal}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Admin, Login };
