require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const enquiriesRoute = require("./routes/enquiries");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/enquiries", enquiriesRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});