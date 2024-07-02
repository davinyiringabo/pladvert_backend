const registerRoomTypes = async (req) => {
  const { roomTypes } = req.body;

  console.log("hotel room types ==>> ", roomTypes);
  for (const room of roomTypes) {
    const result = await cloudinary.uploader.upload(room.image, {
      folder: "uploads",
    });
    uploadedImages.push(result.secure_url);

    await fs.unlink(image.path);
  }
  // try {
  const roomId = uuidv4();
  return await client.query(
    "INSERT INTO roomtypes (id,name,price,stock,images) VALUES ($1,$2,$3,$4,$5)",
    [
      roomId,
      roomTypes[0].name,
      roomTypes[0].price,
      roomTypes[0].stock,
      roomTypes[0].image,
    ],
  );
  // }
  // catch(err){
  //     console.error("Error registering accommodation hotel:", err);
  //     return res.status(500).json({
  //         message: "Internal server error",
  //         status: 500,
  //         data: err,
  //     });
  // }
};
