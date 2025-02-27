import React, { useState, useEffect } from 'react';
import './styles.css';

interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserFormProps {
  user: User | null;
  onSave: (user: User) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setStreet(user.address.street);
      setSuite(user.address.suite);
      setCity(user.address.city);
      setZipcode(user.address.zipcode);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !email || !phone || !street || !suite || !city || !zipcode) {
      alert('All fields are required');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Invalid email format');
      return;
    }
    if (!/^\d+$/.test(phone)) {
      alert('Phone number must be a number');
      return;
    }
    onSave({ id: user?.id, name, username, email, phone, address: { street, suite, city, zipcode } });
  };

  return (
    <div className="modal-form active">
      <h2>{user ? 'Edit User Info' : 'New User Info'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Street:</label>
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
        </div>
        <div>
          <label>Suite:</label>
          <input type="text" value={suite} onChange={(e) => setSuite(e.target.value)} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label>Zipcode:</label>
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;