import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import CovidService from '../../service/covid-service'
import ErrorBoundary from '../error-boundary/Error-Boundary'
import errorAppearance from '../../utils/errorAppearance'

const covidService = new CovidService()

const Date = () => {
  const [date, setDate] = useState('')
  const [isError, setIsError] = useState(false)
  const [response, setResponse] = useState('')

  useEffect(() => {
    covidService
      .getActualDate()
      .then((data) => {
        setDate(data)
      })
      .catch((error) => {
        const arr = errorAppearance(error)
        setIsError(Boolean(arr.shift()))
        setResponse(arr.join(': '))
      })
  }, [])

  return (
    <div>
      <ErrorBoundary isError={isError} response={response}>
        <Typography variant="h5">{date}</Typography>
      </ErrorBoundary>
    </div>
  )
}

export default Date
