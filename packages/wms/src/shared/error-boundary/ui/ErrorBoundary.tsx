import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  fallbackRender?: (onReset: () => void) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error: Error): void {}

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallbackRender === "function") {
        return this.props.fallbackRender(() => {
          this.setState({ hasError: false });
        });
      } else {
        return this.props.fallback;
      }
    }

    return this.props.children;
  }
}
