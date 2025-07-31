export const userBookingOnServer = async payload => {
  const path = payload.bookingType === "reserveSeat" ? "seatbooking" : "cabbooking"

  const res = await fetch(`http://localhost:3000/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let errorMessage = "Booking failed"
    try {
      const err = await res.json()
      errorMessage = err.message || errorMessage
    } catch {
      const fallback = await res.text()
      errorMessage = fallback || errorMessage
    }
    throw new Error(errorMessage)
  }

  try {
    return await res.json()
  } catch {
    return {} // fallback in case server gives no response JSON
  }
}
