const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/trace-status', (req, res) => {
    res.json({ status: "ONLINE", message: "CodeVista Core Engine Pipeline Active" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Tracer Backend running on port ${PORT}`));