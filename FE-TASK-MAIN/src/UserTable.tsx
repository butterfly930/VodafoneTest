import { SetStateAction, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserForm from './UserForm';
import usersData from '../data/db.json';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const columns: { id: keyof User | 'address', label: string }[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'username', label: 'Username' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'address', label: 'Address' },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSave = (user: Omit<User, 'id'>) => {
    if (selectedUser) {
      // Update user
      const updatedUsers = users.map(u => u.id === selectedUser.id ? { ...selectedUser, ...user } : u);
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = { id: users.length + 1, ...user };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="add-new-user" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Create New User
        </button>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'address'
                        ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                        : user[column.id as keyof User]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <button className="edit" onClick={() => handleEdit(user)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {isModalOpen && (
        <UserForm
          user={selectedUser}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserTable;