import React from "react";
import UserForm from "../components/UserForm";

const AddUser: React.FC = () => {
return (
    <div>
    <h2>Add User</h2>
    <UserForm handleClose={() => {}} />
    </div>

    
);
};

export default AddUser;