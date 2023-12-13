import {PencilRuler } from 'lucide-react';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

render() {
  const { hasError } = this.state;

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-background-2">
        <div className="bg-app-background-1 p-8 rounded shadow-md text-center">
          <PencilRuler size={100} className="text-app-hover-green text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
          <p className="text-app-white">Please refresh the page or try again later.</p>
          <p className="text-app-green">We will fix this soon</p>
        </div>
      </div>
    );
  }

  return this.props.children;
}
}

export default ErrorBoundary;
