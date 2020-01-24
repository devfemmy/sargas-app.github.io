import React, { Component } from 'react';
import '../OrderHistory/history.css';
import './freebies.css';
import axios from 'axios'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, UncontrolledCollapse
  } from 'reactstrap';
import Spinners from '../../UI/Spinner/spinner';

class Blog extends Component {
    state = { 
        blogs: [],
        loader: false
     }
    backToPrevPageHandler = () => {
        this.props.history.goBack();
    }
    componentDidMount() {
        axios.get('https://www.sargasenergy.com/wp-json/wp/v2/posts')
        .then(res => {
            const data = res.data
            this.setState({blogs: data, loader: true})
        }).catch(err => {
            console.log(err)
        })
    }
    render() { 
        let showBlogs = <Spinners />
        if (this.state.loader) {
            showBlogs = (
                <div className = "blogs-div">
                {this.state.blogs.map((blog, index) => {
                     const date = new Date (blog.date);
                     const hh = date.getHours()
                     const mmm = date.getMinutes();

                     const time = `${hh}:${mmm}`
                     const day = date.getDate();
                     const mm = date.getUTCMonth();
                     var month = [];
                         month[0] = "January";
                         month[1] = "February";
                         month[2] = "March";
                         month[3] = "April";
                         month[4] = "May";
                         month[5] = "June";
                         month[6] = "July";
                         month[7] = "August";
                         month[8] = "September";
                         month[9] = "October";
                         month[10] = "November";
                         month[11] = "December";
                     const newMonth = month[mm]
                     const year = date.getFullYear();
                     const displayDate = `${newMonth} ${day}, ${year}`
                    const toggler = `#${blog.slug}`;
                    return (
                        <Card key = {index}>
                        <CardImg top width="100%" src={blog.jetpack_featured_media_url} alt="Card image cap" />
                        <CardBody>
                    <CardTitle style={{color: 'black', fontWeight: 'bold', fontSize: '24px'}}>{blog.title.rendered}</CardTitle>
                <CardSubtitle style={{color: 'black', opacity: '0.6'}}><span style= {{color: '#009245'}}>{displayDate}</span> {time}</CardSubtitle>
                    <CardText  dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered}} style={{color: 'black'}}></CardText>
                        <UncontrolledCollapse toggler={toggler}>
                            <div>
                                <p  dangerouslySetInnerHTML={{ __html: blog.content.rendered}} style= {{color: 'black'}}>
                                </p>
                            </div>
                        </UncontrolledCollapse>
                        <Button outline color="success"  id={blog.slug} >CONTINUE READING</Button>
                        </CardBody>
                    </Card>
                    )
                })}
                
            </div>
            )
        }
        return ( 
            <div style={{backgroundColor: 'white'}}>
                <div id = "sticky_elements" className= "payment-header2">
                    <div className = "header-wrapper">
                            <p onClick= {this.backToPrevPageHandler} className= "payment-text">&larr; 
                            </p>
                         <h5 className= "payment-text2">Blog</h5>   
                    </div>
                   
                </div> 
                {showBlogs}
              
            </div>
         );
    }
}
 
export default Blog;