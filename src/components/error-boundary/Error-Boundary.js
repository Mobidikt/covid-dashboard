/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React from 'react'
import './Error-Boundary.scss'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(errorDetails) {
    this.setState({ hasError: true })
    this.setState({ errorInfo: errorDetails })
  }

  render() {
    const { children, isError, response } = this.props

    if (isError) {
      return (
        <div className="error-container">
          <h2 className="error-title">Something went wrong.</h2>
          <details>
            <p className="error-text">{response}</p>
          </details>
        </div>
      )
    }
    return children
  }
}

export default ErrorBoundary
