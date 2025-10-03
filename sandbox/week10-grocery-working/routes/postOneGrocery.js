app.post("/groceryInventory", async (req, res) => {
  try {
      const result = await db.collection(${ process.env.MONGO_COLLECTION }).insertOne(req.body);
    res.status(201).json({
      success: true,
      message: "Grocery created successfully!",
      insertedId: result.insertedId,
      data: { _id: result.insertedId, ...req.body }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});