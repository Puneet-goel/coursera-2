/* eslint-disable */
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, ModalHeader, ModalBody, Modal, Button, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form'

const required = (val) => val && val.length ;
const minLength = (len) => (val) => !(val) || (val.length>=len);
const maxLength = (len) => (val) => !(val) || (val.length<=len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen 
        });
    };

    handleSubmit(values){
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return (
            <div> 
                <Button outline color="secondary" onClick={this.toggleModal} className="fa fa-pencil"> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor="rating" >Rating</Label>
                            <Control.select model=".rating" name="rating" rows="6" className="col-xl">
                                <option>1</option> 
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select> 
                            <Label htmlFor="author" >Your Name</Label>
                            <Control.text model=".author" id="author" name="author" 
                                placeholder="Your Name" 
                                rows="6" 
                                className="col-xl"
                                validators = {{
                                    required,minLength : minLength(3),maxLength : maxLength(15)
                                }}
                            />
                            <Errors 
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required : "Required",
                                    minLength :  "Must be greater than 2 characters",
                                    maxLength : "Must be 15 characters or less"
                                }}
                            />
                            <Label htmlFor="comment">Comment</Label> 
                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="col-xl"/> <br/>
                            <Button type="submit" color="primary" >Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish}){
	return(
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>  
    );
}

function RenderComments({comments, addComment, dishId}){
    console.log(comments);
	const x = comments.map((comment)=>{
        return (
            <div className="container" key={comment.id}>
                <p> {comment.comment} </p>
                <p> --{comment.author},{new Intl.DateTimeFormat('en-US',{year :'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
            </div>
        );
    });
    return(
        <div>
            <h4>Comments</h4>
            <ul className = "list-unstyled">
                { x }
            </ul>
            <CommentForm addComment={addComment} dishId={dishId}/>
        </div>  
    );
}

const DishDetail = (props) =>{

    if(props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active >{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
    else{
        return (<div></div>);
    }
}

export default DishDetail;