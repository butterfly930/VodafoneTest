import React, { useState } from "react";
import UserTable from "../components/UserTable";
import { Button, Modal, Box } from "@mui/material";
import UserForm from "../components/UserForm";

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        sx={{ marginTop: "50px", marginBottom: "30px" }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>
      <UserTable />

      {/* Modal for UserForm */}
      <Modal open={open} onClose={() => setOpen(false)}>
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
          <h2>Add a User</h2>
          <UserForm handleClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
