const UserSeatBooking = require("../models/userBooking")

exports.createUserSeatBooking = async (req, res, next) => {
  console.log(req.body)
  const {pickupCity, exactPickup, dropCity, exactDrop, onDate} = req.body
  const userSeatBooking = new UserSeatBooking({pickupCity, exactPickup, dropCity, exactDrop, onDate})
  await userSeatBooking.save()
  res.status(201).json(UserSeatBooking)
}

// const HostedTrip = require("../models/hostingTrip")

// exports.createHostedTrip = async (req, res, next) => {
//   console.log(req.body)
//   const {pickupCity, exactPickup, exactDrop, dropCity, fare} = req.body
//   const hostedTrip = new HostedTrip({pickupCity, exactPickup, exactDrop, dropCity, fare})
//   await hostedTrip.save()
//   res.status(201).json(hostedTrip)
// }
