import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
} from "@mui/material";
import UserForm from "./UserForm";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => setUsers(res.data as User[]));
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = async (user: User) => {
    await axios.put(`http://localhost:8000/users/${user.id}`, user);
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u)); 
    setUsers(updatedUsers);
    setOpen(false);
  };

  const refreshUsers = async () => {
    const res = await axios.get("http://localhost:8000/users");
    setUsers(res.data);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.address
                  ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                  : "N/A"}
              </TableCell>

              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.company.name}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(user)}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Edit User</h2>
          {selectedUser && (
            <UserForm
              handleClose={handleClose}
              userData={selectedUser}
              isEdit
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserTable;
