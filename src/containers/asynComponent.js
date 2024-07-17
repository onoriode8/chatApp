import { Component } from 'react';


const asyncComponent = ( asyncParameter ) => {
    console.log("ASYN-COMPONENT");
    return class extends Component {
        state = {
            component: null
        }

        // continue working on this asyncComponent file for lazy loading.
        
        componentDidMount() {
            asyncParameter()
              .then(response => {
                console.log("RESPONSE", response)
                this.setState({ component: response.default })
              })
        }

        render() {
            const C = this.state.component;

            console.log("after componentDidMount", C)

            return (
                C ? C : null
            )
        }
    }
}

export default asyncComponent;