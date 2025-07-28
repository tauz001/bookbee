export const hostTripToServer = async (pickupCity, exactPickup, exactDrop, dropCity, fare) => {
  const response = await fetch("http://localhost:3000/api/hostingTrip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({pickupCity, exactPickup, exactDrop, dropCity, fare}),
  })
  const item = await response.json()
  return item // Remove mapServerItemToLocalItem as it's not defined
}
