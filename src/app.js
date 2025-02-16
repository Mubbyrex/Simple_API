const express = require("express");

const app = express();
app.use(express.json());

// In-memory data store
const users = [];

// Create a new User
app.post("/users", (req, res) => {
  try {
    const { name, role } = req.body;
    const user = { id: users.length + 1, name, role };
    users.push(user);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Retrieves all users
app.get("/users", (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a user
app.put("/users/:id", (req, res) => {
  try {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) throw new Error("User not found");
    Object.assign(user, req.body);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  try {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (index === -1) throw new Error("User not found");
    users.splice(index, 1);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 5000;

app.listen(port, () => {
  console.log("API server started on port 5000");
});
