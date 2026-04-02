const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Enquiries route working");
});

// POST /enquiries - Handle contact form submission
router.post("/", async (req, res) => {
  try {
    const { name, email, product, message } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Here you would typically save to database or send email
    // For now, just log and return success
    console.log("Enquiry received:", { name, email, product, message });

    res.status(201).json({
      message: "Enquiry sent successfully",
      enquiryId: Date.now() // Mock enquiry ID
    });

  } catch (error) {
    console.error("Enquiry processing error:", error);
    res.status(500).json({ message: "Failed to send enquiry" });
  }
});

module.exports = router;