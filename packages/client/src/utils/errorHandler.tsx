import React from "react";
type State = {
  hasError: boolean;
  error: Error | undefined;
};

export default function errorHandler<P>(Component: React.ComponentType<P>) {
  class ErrorHandler extends React.Component<P, State> {
    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    state: State = {
      hasError: false,
      error: undefined,
    };
    componentDidCatch(_error: Error, info: React.ErrorInfo) {
      console.error(
        "Component stack trace caught in <ErrorHandler />:",
        info.componentStack
      );
    }

    render() {
      if (this.state.hasError) {
        return <p>{this.state.error}</p>;
      }

      return <Component {...this.props} />;
    }
  }
  return ErrorHandler;
}
