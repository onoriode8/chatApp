import React from 'react';


class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({ hasError: true })
    }

    render() {
       const error = this.state.hasError
       return (
            <>
                {error ? <p 
                    style={{textAlign: "center", color: "red"}}
                    >Something went wrong.</p> : null}
                <div>
                    {this.props.children}
                </div>
            </>
       ) 
    }
}

export default ErrorBoundary;