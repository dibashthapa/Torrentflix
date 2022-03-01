import React from 'react';
import InternalError from '../components/internalError';

type State = {
  hasError: boolean;
  error: Error | undefined;
};

export class ErrorHandler extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  state: State = {
    hasError: false,
    error: undefined,
  };
  componentDidCatch(_error: Error, info: React.ErrorInfo) {
    console.error(
      'Component stack trace caught in <ErrorHandler />:',
      info.componentStack
    );
  }

  render() {
    console.log('hello');
    if (this.state.hasError) {
      return <InternalError>{this.state.error?.message}</InternalError>;
    }
    return this.props.children;
  }
}
