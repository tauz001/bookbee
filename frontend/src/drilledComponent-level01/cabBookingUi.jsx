const CabBookingUi = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="pickUp" className="block text-sm font-medium mb-1">
          Choose Pick-Up
        </label>
        <select name="pickUp" id="pickUp" className="w-full border rounded px-3 py-2">
          <optgroup label="Shahganj">
            <option value="jci-circle">JCI Circle</option>
            <option value="bhelara">Bhelara</option>
          </optgroup>
          <optgroup label="Lucknow">
            <option value="ahmamau">Ahmamau</option>
            <option value="gomti-nagar">Gomti-nagar</option>
          </optgroup>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date & Time</label>
        <input type="datetime-local" className="w-full border rounded px-3 py-2" />
      </div>
    </div>
  )
}

export default CabBookingUi
