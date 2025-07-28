export const hostTripToServer = async (pickupCity, exactPickup, exactDrop, dropCity, fare) => {
  try {
    const response = await fetch("http://localhost:3000/api/hostingTrip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({pickupCity, exactPickup, exactDrop, dropCity, fare}),
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
