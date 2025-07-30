export const userBookingOnServer = async payload => {
  const res = await fetch("http://localhost:3000/api/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Booking failed")
  }

  return await res.json()
}
