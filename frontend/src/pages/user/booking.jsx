import vehicleImg from "../../assets/vehicleImg01.jpg"

const Booking = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img src={vehicleImg} alt="vehicle" className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold">Shahganj to Lucknow</h3>
          <h5 className="text-sm text-gray-500">on date 01-01-2000</h5>
          <a href="#" className="text-blue-500 underline text-xs">
            more info. about our Booking..
          </a>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h4 className="text-sm font-medium">Listed By @user01</h4>
          <h5 className="text-sm text-yellow-600">Rating : 4.9</h5>
        </div>
      </div>
    </div>
  )
}

export default Booking
