import React, {Component} from 'react';
import Modal from '../UI/Modal/modal.js';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use((res) => {
                // if (res.status === 401) {
                //     this.props.history.push({
                //         pathname: '/login'
                //       })
                // }
                return res;
            }, (error) => {
                console.log ("this error",)
               this.setState({error: error})  
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);

        }
        removeErrorHandler = () => {
            this.setState({error: null})
        }
        render() {
            // const { addToast } = useToasts()
            return (
                <div>
               
                { <Modal show = {this.state.error}
                modalClosed = {this.removeErrorHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal> }


                <WrappedComponent {...this.props}/>
                </div>
                 
            )
        }
       
    } 
}

export default errorHandler;