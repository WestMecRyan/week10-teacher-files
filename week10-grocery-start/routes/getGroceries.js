app.get('/groceryInventory', async (req, res) => {
  try {
    const data = await db
      .collection(`${process.env.MONGO_COLLECTION}`)
      .find({})
      .toArray();
    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
