import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Log to console for developer debugging
    // You can also send this to an external logging service
    // e.g., Sentry, LogRocket
    // Keep this minimal and safe for local dev
    // eslint-disable-next-line no-console
    console.error('Uncaught error in component tree:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
          <div className="max-w-xl p-8 rounded-lg bg-red-50 dark:bg-red-900/60 text-red-900 dark:text-red-100 shadow">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm mb-4">A rendering error occurred. The app caught it and prevented a full black/white screen.</p>
            <details className="text-xs mb-4 whitespace-pre-wrap">
              {this.state.error ? String(this.state.error) : 'No error details.'}
            </details>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-teal-600 text-white rounded-md"
              >
                Reload
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 border rounded-md"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
