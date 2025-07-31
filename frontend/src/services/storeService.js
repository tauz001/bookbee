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

export const getUserCabBooking = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cabbooking")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching trips:", error)
    throw error
  }
}

export const getUserSeatBooking = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/seatbooking")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching trips:", error)
    throw error
  }
}


export const getCabBookingById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/cabbooking/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching cab booking:", error)
    throw error
  }
}

export const getSeatBookingById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/seatbooking/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching seat booking:", error)
    throw error
  }
}
