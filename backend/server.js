const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Analyzer API running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const axios = require("axios");

app.get("/repo", async (req, res) => {
  const { url } = req.query;

  try {
    // Extract owner and repo name
    const parts = url.split("/");
    const owner = parts[3];
    const repo = parts[4];

    // Call GitHub API
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch repo data" });
  }
});