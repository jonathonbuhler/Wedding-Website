import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import flowers from "../../assets/flowers.webp";

import styles from "./RSVP.module.css";

function RSVP() {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    name: "" as string,
    invitedSealing: false as boolean,
    invitedLuncheon: false as boolean,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameParts = person.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    fetch("https://emmalynandjonathon.com/api/check-rsvp-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPerson = {
          ...person,
          invitedSealing: Boolean(data.invited_sealing),
          invitedLuncheon: Boolean(data.invited_luncheon),
        };
        setPerson(updatedPerson);
        navigate("/rsvp-form", { state: { updatedPerson } });
      })
      .catch((err) => {
        console.error("Error checking rsvp status.", err);
        alert("Error");
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({
      ...person,
      name: e.target.value,
    });
  };

  return (
    <div className={styles["rsvp-container"]}>
      <h1>RSVP</h1>
      <p>
        If you're responding for you and a guest (or your family), you'll be
        able to RSVP for your entire group.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          autoComplete="name"
          onChange={handleChange}
          required
        />
        <input type="submit" value="Continue" />
      </form>
    </div>
  );
}

function RSVPForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState({
    attendingSealing: false,
    attendingLuncheon: false,
    attendingReception: false,
  });

  const [formData, setFormData] = useState({
    name: location.state?.updatedPerson.name as string,
    bringingGuests: false,
    numGuests: 0,
    guests: [] as string[],
    invitedLuncheon: location.state?.updatedPerson.invitedLuncheon as boolean,
    invitedSealing: location.state?.updatedPerson.invitedSealing as boolean,
    attendingSealing: [] as string[],
    attendingLuncheon: [] as string[],
    attendingReception: [] as string[],
  });

  const handleShowAddUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    attending: keyof typeof showAdd
  ) => {
    e.preventDefault();
    setShowAdd({
      attendingSealing: false,
      attendingLuncheon: false,
      attendingReception: false,
    });

    setShowAdd((prev) => ({
      ...prev,
      [attending]: !showAdd[attending],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://emmalynandjonathon.com/api/submit-rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        navigate("/");
      })
      .catch((err) => {
        alert("An Error Occurred");
        console.error("Error submitting rsvp", err);
      });
  };

  const handleAddGuestAttending = (
    name: string,
    attending: keyof typeof formData
  ) => {
    setFormData({
      ...formData,
      [attending]: [...(formData[attending] as string[]), name],
    });
  };

  const handleAddAttending = (
    e: React.ChangeEvent<HTMLInputElement>,
    name = formData.name
  ) => {
    const fieldName = e.target.name as keyof typeof formData;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.checked
        ? [...(prevData[fieldName] as string[]), name]
        : (prevData[fieldName] as string[]).filter((n) => n !== name),
    }));
  };

  const handleAddAllGuests = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFormData({
      ...formData,
      attendingSealing: formData.guests,
      attendingLuncheon: formData.guests,
      attendingReception: formData.guests,
    });
  };

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }

  useEffect(() => {
    if (!formData.name) {
      navigate("/rsvp", { replace: true });
    } else if (!formData.guests.includes(formData.name)) {
      setFormData({
        ...formData,
        guests: [formData.name, ...formData.guests],
      });
    }
  }, [formData.name, formData.guests, navigate]);

  if (!formData.name) {
    return null;
  }

  const ListPeopleAttending = ({
    attending,
  }: {
    attending: keyof typeof formData;
  }) => {
    return (
      <>
        {(formData[attending] as string[])!.map((name, index) => {
          return (
            <p key={index} className={styles["guest-name"]}>
              <i className="fa-solid fa-user"></i> &nbsp;{name}&nbsp;
              <button
                type="button"
                className={styles["x-button"]}
                onClick={() => {
                  setFormData({
                    ...formData,
                    [attending]: (formData[attending] as string[]).filter(
                      (value) => {
                        return value !== name;
                      }
                    ),
                  });
                }}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </p>
          );
        })}
      </>
    );
  };

  const AddPeopleAttending = ({
    attending,
  }: {
    attending: keyof typeof formData;
  }) => {
    const guests = formData.guests.filter(
      (value) => !(formData[attending] as string[]).includes(value)
    );
    return (
      <>
        <div
          className={`${styles["add-attending"]} ${
            showAdd[attending as keyof typeof showAdd] ? styles.showing : ""
          }`}
        >
          <button
            type="button"
            className={`${styles["x-button"]} ${styles["event-x-button"]}`}
            onClick={(e) =>
              handleShowAddUpdate(e, attending as keyof typeof showAdd)
            }
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <h2>{attending.split("attending")}</h2>
          {guests.length === 0 ? (
            <p>No more guests to add.</p>
          ) : (
            guests.map((name, index) => {
              return (
                <p
                  className={styles["guest-name"]}
                  key={index}
                  onClick={() => {
                    handleAddGuestAttending(name, attending);
                  }}
                >
                  <i className="fa-solid fa-user"></i> &nbsp;{name}&nbsp;
                  <button type="button" className={styles["add-button"]}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </p>
              );
            })
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    setFormData({
      ...formData,
      guests: [formData.name],
      attendingSealing: [],
      attendingLuncheon: [],
      attendingReception: [],
    });
  }, [formData.bringingGuests, formData.numGuests]);

  return (
    <>
      <img className={styles.flowers} src={flowers} alt="background flowers" />
      <div
        className={`${styles["rsvp-container"]} ${styles["rsvp-form-container"]}`}
      >
        <h1>RSVP Form</h1>
        <form onSubmit={handleSubmit}>
          <h2>Hi, {formData.name.split(" ")[0]}</h2>
          <label>
            <p>Would you like to add anyone else to your party?</p>
            <input
              type="checkbox"
              name="bringingGuests"
              id="bringingGuests"
              onChange={handleChange}
            />
          </label>

          {formData.bringingGuests && (
            <>
              <p>How many guests would you like to add?</p>
              <select
                name="numGuests"
                id="numGuests"
                onChange={handleChange}
                value={formData.numGuests}
              >
                <option value="">
                  Select number of guests (NOT including yourself)
                </option>
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {Array.from({ length: formData.numGuests }).map((_, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    value={formData.guests[index + 1] || ""}
                    placeholder={`Guest ${index + 1} Name`}
                    onChange={(e) => {
                      const updatedGuests = [...formData.guests];
                      updatedGuests[index + 1] = e.target.value;
                      setFormData({
                        ...formData,
                        guests: updatedGuests,
                      });
                    }}
                  ></input>
                );
              })}
            </>
          )}
          <h2>
            Events
            <span className={styles["info-icon"]}>
              <i className="fa-solid fa-circle-info"></i>
              <span className={styles.tooltip}>
                Note: If you believe you were invited to the sealing or luncheon
                but don't see them listed here, please reach out to Jonathon or
                Emmalyn for assistance.
              </span>
            </span>
          </h2>
          {formData.bringingGuests ? (
            <>
              <p>
                Click the + button to add guests to each event. OR{" "}
                <button
                  type="button"
                  className={styles["add-all-people"]}
                  onClick={(e) => handleAddAllGuests(e)}
                >
                  Add all guests to all events.
                </button>
              </p>
              {formData.invitedSealing && (
                <div className={styles.event}>
                  <h3>Sealing</h3>
                  <AddPeopleAttending attending="attendingSealing" />
                  <div className={styles["list-attending-container"]}>
                    <ListPeopleAttending attending={"attendingSealing"} />
                    <button
                      type="button"
                      className={styles.add}
                      onClick={(e) =>
                        handleShowAddUpdate(e, "attendingSealing")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              {formData.invitedLuncheon && (
                <div className={styles.event}>
                  <h3>Luncheon</h3>
                  <AddPeopleAttending attending="attendingLuncheon" />
                  <div className={styles["list-attending-container"]}>
                    <ListPeopleAttending attending={"attendingLuncheon"} />
                    <button
                      className={styles.add}
                      type="button"
                      onClick={(e) =>
                        handleShowAddUpdate(e, "attendingLuncheon")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <div className={styles.event}>
                <h3>Reception</h3>
                <AddPeopleAttending attending="attendingReception" />
                <div className={styles["list-attending-container"]}>
                  <ListPeopleAttending attending={"attendingReception"} />
                  <button
                    className={styles.add}
                    type="button"
                    onClick={(e) =>
                      handleShowAddUpdate(e, "attendingReception")
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>Please select the events you will be attending.</p>
              {formData.invitedSealing && (
                <label>
                  <h3>Sealing</h3>
                  <input
                    className={styles.check}
                    name="attendingSealing"
                    type="checkbox"
                    onChange={handleAddAttending}
                    checked={!(formData.attendingSealing.length === 0)}
                  />
                </label>
              )}
              {formData.invitedLuncheon && (
                <label>
                  <h3>Luncheon</h3>
                  <input
                    className={styles.check}
                    type="checkbox"
                    name="attendingLuncheon"
                    onChange={handleAddAttending}
                    checked={!(formData.attendingLuncheon.length === 0)}
                  />
                </label>
              )}
              <label>
                <h3>Reception</h3>
                <input
                  className={styles.check}
                  type="checkbox"
                  name="attendingReception"
                  onChange={handleAddAttending}
                  checked={!(formData.attendingReception.length === 0)}
                />
              </label>
            </>
          )}
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export { RSVP, RSVPForm };
