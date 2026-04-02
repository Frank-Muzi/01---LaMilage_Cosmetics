const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Orders route working");
});

// POST /orders - Handle order submission
router.post("/", async (req, res) => {
  try {
    const { cart, address } = req.body;

    // Validate required fields
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Cart is required and must not be empty" });
    }

    if (!address || typeof address !== 'string' || address.trim().length === 0) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Here you would typically save to database
    // For now, just return success
    console.log("Order received:", { cart, address, total });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: Date.now(), // Mock order ID
      total: total
    });

  } catch (error) {
    console.error("Order processing error:", error);
    res.status(500).json({ message: "Failed to process order" });
  }
});

module.exports = router;