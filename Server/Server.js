const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);

let submittedData = []; // Array to store submitted data for multiple teams

// Define endpoint to receive the object
app.post("/submitForm", (req, res) => {
  // Assuming the object is sent in the request body as JSON
  const {
    name,
    email,
    numberOfPlayers,
    teamName,
    selectedTeam,
    tactics,
    fieldStreet,
  } = req.body;
  console.log("Received form data:", req.body);

  // Store the received data for the current team
  const teamData = {
    name,
    email,
    numberOfPlayers,
    teamName,
    selectedTeam,
    tactics,
    fieldStreet,
  };

  submittedData.push(teamData); // Add the data to the array

  // Respond with a success message
  res.json({ message: "Form submitted successfully" });
});

// Define endpoint to retrieve the submitted data for all teams
app.get("/submittedData", (req, res) => {
  // Check if data has been submitted before
  if (submittedData.length === 0) {
    return res.status(404).json({ error: "No data submitted yet" });
  }

  // Send the submitted data for all teams as a response
  res.json(submittedData);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
