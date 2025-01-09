import { Component } from 'react';


class ErrorBoundary extends Component {
    state = {
        hasError: false
    };
    
    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
    }

    render() {
        const error = this.state.hasError;

        if(error === true) {
            return (
                <div style={{textAlign: "center"}}>
                    <p>Something went wrong!</p>
                </div>
            );
        }

        return ( 
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default ErrorBoundary;