import { useEffect, useState } from "react";

type Invite = {
  fullName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  postalCode: string;
  countryName: string;
};

type MySQLInvite = {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postal: string;
  country: string;
};

function Admin() {
  const [invites, setInvites] = useState<Invite[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/load-invites")
      .then((response) => response.json())
      .then((data) => {
        const mappedInvites: Invite[] = data.map((invite: MySQLInvite) => ({
          fullName: `${invite.first_name} ${invite.last_name}`,
          streetAddress1: invite.address_1,
          streetAddress2: invite.address_2,
          city: invite.city,
          state: invite.state,
          postalCode: invite.postal,
          countryName: invite.country,
        }));
        setInvites(mappedInvites);
      })
      .catch((error: any) => console.error("Error loading invites", error));
  }, []);

  return (
    <>
      <h1>Admin</h1>
      <ul>
        {invites.map((item, index) => (
          <li key={index}>
            {item.fullName} {item.streetAddress1} {item.streetAddress2},{" "}
            {item.city} {item.state} {item.postalCode} {item.countryName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Admin;
