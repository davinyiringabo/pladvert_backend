exports.registerAccommodation = (req,res)=>{
    // I want it to be a
    const {name, location, images, type, price} = req.body;
    console.log(req.body);
    if(!name || !location || !images || !type || !price){
        return res.status(400).send({
            message: "Please provide required data",
            status: 400
        })
    }
    res.status(200).send({
        message: "Accommodation registered successfully",
        status: 200
    })
}
module.exports = exports