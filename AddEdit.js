import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const navigation = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((response) => setState({ ...response.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Provide some value to the input field.");
    } else {
      axios
        .post("http://localhost:5000/api/post", { name, email, contact })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
        })
        .catch((err) => toast.error(err.response.data));
      setTimeout(() => navigation("/"), 500);
      toast.success("Contact added...");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          id="name"
          name="name"
          placeholder="Enter your name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type={"email"}
          id="email"
          name="email"
          placeholder="Enter Email address"
          value={email || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="Contact">Contact</label>
        <input
          type={"number"}
          id="contact"
          name="contact"
          placeholder="Enter Your Contact"
          value={contact || " "}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "update" : "save"} />
        <Link to="/">
          <input type={"button"} value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
