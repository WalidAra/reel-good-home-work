import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorFallbackProps {
  error: Error | null
  resetError?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  Props & { fallback?: ReactNode | ((props: ErrorFallbackProps) => ReactNode) },
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props
      if (typeof fallback === "function") {
        return fallback({
          error: this.state.error,
          resetError: this.resetError,
        })
      }
      return fallback
    }

    return this.props.children
  }
}
