import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import CovidService from '../../service/covid-service'

const Date = () => {
  const covidService = new CovidService()
  const [date, setDate] = useState('')
  useEffect(() => {
    covidService.getActualDate().then((data) => {
      setDate(data)
    })
  }, [])
  return (
    <div>
      <Typography variant="h5">{date}</Typography>
    </div>
  )
}

export default Date
