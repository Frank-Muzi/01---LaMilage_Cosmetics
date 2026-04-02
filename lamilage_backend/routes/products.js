const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/", async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("Product_tbl")
      .select("*");

    if (error) {
      console.error("Supabase products error:", error);
      return res.status(500).json({
        error: "Failed to fetch products from database",
        details: error.message
      });
    }

    res.json(products || []);

  } catch (error) {
    console.error("Server error in products route:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
});

// GET /api/products/:id - Get single product
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from("Product_tbl")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase product error:", error);
      return res.status(404).json({
        error: "Product not found",
        details: error.message
      });
    }

    res.json(product);

  } catch (error) {
    console.error("Server error in product route:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
});

module.exports = router;