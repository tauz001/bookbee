import vehicleImg from "../../assets/vehicleImg01.jpg"

const Booking = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="h-40 bg-gray-100">
        <img src={vehicleImg} alt="vehicle" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Route & Date */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Shahganj to Lucknow</h3>
          <p className="text-sm text-gray-500">
            On: <span className="font-medium">01-01-2000</span>
          </p>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            View booking details
          </a>
        </div>

        {/* Host & Rating */}
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-600">
            Listed by <span className="font-medium text-gray-800">@user01</span>
          </p>
          <p className="text-sm text-yellow-600 font-medium">★ 4.9</p>
        </div>
      </div>
    </div>
  )
}

export default Booking
