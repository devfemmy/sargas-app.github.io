import React, {Component} from 'react';
import Modal from '../UI/Modal/modal.js';
import auth from '../auth/auth'

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
                if ((res.data.status === 2001 && res.data.message === 'Invalid Token') 
                || (res.data.status === 2001 && res.data.message === "Expired Token") 
                || (res.data.status === 2001 && res.data.message === "Disabled Token" )) {
                    auth.logout(() => {
                        this.props.history.push("/");
                    });
                }
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