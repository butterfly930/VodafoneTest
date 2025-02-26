import React from "react";
import UserForm from "../components/UserForm";

const EditUser: React.FC = () => {
return (
    <div>
    <h2>Edit User</h2>
    <UserForm handleClose={() => {}} />
    </div>
);
};

export default EditUser;