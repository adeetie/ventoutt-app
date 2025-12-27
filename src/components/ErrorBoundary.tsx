import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#fff', color: '#000', minHeight: '100vh' }}>
                    <h1 style={{ color: '#d32f2f' }}>Something went wrong.</h1>
                    <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto', marginTop: '1rem' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Error:</h2>
                        <pre style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <h2 style={{ fontSize: '1.2rem', margin: '1rem 0 0.5rem' }}>Component Stack:</h2>
                        <pre style={{ fontSize: '0.9rem' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#333', color: '#white', border: 'none', borderRadius: '4px' }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
