import styles from "./Admin.module.css";
import { useEffect, useState } from "react";

type Person = {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
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
  const [people, setPeople] = useState<Person[]>([]);
  const [attending, setAttending] = useState({
    sealing: 0 as number,
    luncheon: 0 as number,
    reception: 0 as number,
  });

  useEffect(() => {
    fetch("http://localhost:3001/load-invites")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error: any) => console.error("Error loading invites", error));
    fetch("http://localhost:3001/load-attending")
      .then((response) => response.json())
      .then((data) =>
        setAttending({
          sealing: parseInt(data.sealing),
          luncheon: parseInt(data.luncheon),
          reception: parseInt(data.reception),
        })
      )
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
          {people.map((item, index) => (
            <tr key={index}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.address_line1}</td>
              <td>{item.address_line2}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.postal}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Sealing {attending.sealing}</h2>
      <h2>Luncheon {attending.luncheon}</h2>
      <h2>Reception {attending.reception}</h2>
    </div>
  );
}

export { Admin, Login };
