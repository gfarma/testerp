const express = require("express");
const router = express.Router();
const Partner = require("../models/Partner");

// Get all partners
router.get("/", async (req, res) => {
  try {
    const partners = await Partner.findAll();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new partner
router.post("/", async (req, res) => {
  console.log("Received partner data:", req.body);  // Προσθήκη αυτής της γραμμής
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    console.error("Error creating partner:", err);  // Προσθήκη αυτής της γραμμής
    res.status(400).json({ error: err.message });
  }
});

// Get single partner by ID
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (partner) {
      res.json(partner);
    } else {
      res.status(404).json({ message: "Partner not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a partner by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Partner.update(req.body, {
      where: { PartnerID: req.params.id },
    });
    if (updated) {
      const updatedPartner = await Partner.findByPk(req.params.id);
      res.json(updatedPartner);
    } else {
      res.status(404).json({ message: "Partner not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a partner by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Partner.destroy({
      where: { PartnerID: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Partner deleted" });
    } else {
      res.status(404).json({ message: "Partner not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;