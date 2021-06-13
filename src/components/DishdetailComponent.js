import React from "react";
import { Card,CardImg,CardText,CardBody,CardTitle } from "reactstrap";

function RenderDish({dish}){
	if(dish!=null){
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
    else{
        return (<div></div>);
    }
}

function RenderComments({dish}){

	if(dish!=null){

        const comments = dish.comments;
        const x = comments.map((current)=>{
            return (
                <div className="container">
                    <p> {current.comment} </p>
                    <p> --{current.author},{new Intl.DateTimeFormat('en-US',{year :'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(current.date)))} </p>
                </div>
            );
        });
            
        return(
            <div>
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                    {x}
                </ul>
            </div>  
        );
    }
    else{
        return (<div></div>);
    }
}

const DishDetail = (props) =>{
	return (
		<div className="row">
            <div  className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div  className="col-12 col-md-5 m-1">
                <RenderComments dish={props.dish} />
            </div>
        </div>
	);
}

export default DishDetail;