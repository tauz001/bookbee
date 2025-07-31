const HostedTrip = require("../models/hostingTrip")

exports.createHostedTrip = async (req, res, next) => {
  console.log(req.body)
  const {pickupCity, exactPickup, exactDrop, dropCity, fare, date, model, number, type, seats} = req.body
  const hostedTrip = new HostedTrip({pickupCity, exactPickup, exactDrop, dropCity, fare, date, model, number, type, seats})
  await hostedTrip.save()
  res.status(201).json(hostedTrip)
}

// Change TripList to getTripList to match router
exports.getTripList = async (req, res) => {
  try {
    const trips = await HostedTrip.find()
    res.status(200).json(trips)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
