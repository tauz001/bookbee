export const hostTripToServer = async (pickupCity, exactPickup, exactDrop, dropCity, seatFare, kmRate, date, model, number, type, seats) => {
  try {
    const response = await fetch("http://localhost:3000/api/hostingTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({pickupCity, exactPickup, exactDrop, dropCity, seatFare, kmRate, date, model, number, type, seats}),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const item = await response.json()
    return item
  } catch (error) {
    console.error("Error posting trip:", error)
    throw error
  }
}

export const getHostedTrips = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/hostingTrip")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching trips:", error)
    throw error
  }
}

////after code

export const getHostedTrip = async tripId => {
  try {
    const response = await fetch(`http://localhost:3000/api/hostingTrip/${tripId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching trip:", error)
    throw error
  }
}

export const updateTrip = async (tripId, tripData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/hostingTrip/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error updating trip:", error)
    throw error
  }
}
