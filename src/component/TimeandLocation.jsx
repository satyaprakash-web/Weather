import React from 'react'
import { formatToLocalTime } from './services/weatherService'

// The TimeandLocation component displays the current local time and location, 
// formatted using the formatToLocalTime function.
function TimeandLocation({weather: {dt, timezone, name, country}}) {
  return <div>
    <div className="flex items-center justify-center my-6">
      <p className="text-white text-xl font-extralight">
      {formatToLocalTime(dt, timezone)}
      </p>  
    </div>
    <div className="flex items-center justify-center my-3">
      <p className="text-white text-3l font-medium">
        {`${name},${country}`}
      </p>

    </div>
  </div>
}

export default TimeandLocation
