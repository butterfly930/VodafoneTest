// UserForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

interface UserFormProps {
  handleClose: () => void;
  refreshUsers: () => void;
  userData?: {
    id: string;
    name: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    company: string;
  };
  isEdit?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ handleClose, userData, isEdit }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "" }, 
    phone: "",
    website: "",
    company: { name: "" },
  });

  useEffect(() => {
    if (userData) {
      setUser({
        ...userData,
        id: userData.id.toString(),
        address: userData.address || {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        }, // ✅ Default to empty object
        company: userData.company || { name: "" }, // ✅ Default to empty object
      });
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`http://localhost:8000/users/${user.id}`, user);
    } else {
      await axios.post("http://localhost:8000/users", user);
    }
    refreshUsers();
    handleClose();
  };


  return (
    <form onSubmit={handleSubmit}>
      <TextField label="ID" fullWidth name="ID" value={user.id} disabled={!isEdit} onChange={(e) => setUser({ ...user, id: e.target.value })} />
      <TextField label="Name" fullWidth name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
      <TextField label="Username" fullWidth name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <TextField label="Email" fullWidth name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <TextField label="Address" fullWidth name="address" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
      <TextField label="Phone Number" fullWidth name="phonenumber" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
      <TextField label="Website" fullWidth name="website" value={user.website} onChange={(e) => setUser({ ...user, website: e.target.value })} />
      <TextField label="Company" fullWidth name="company" value={user.company} onChange={(e) => setUser({ ...user, company: e.target.value })} />
      
      <Button type="submit" variant="contained">{isEdit ? "Update" : "Create"}</Button>
    </form>
  );
};

export default UserForm;
