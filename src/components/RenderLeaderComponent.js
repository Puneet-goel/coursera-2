import React from "react"; 
import { Media } from 'reactstrap';

function RenderLeader(props){
	return(
        <div className="col-12 mt-5">
            <Media tag="li">
                <Media  object src={props.leader.image} alt={props.leader.name} />
                <Media body className="ml-5">
                    <Media heading > {props.leader.name}</Media>
                    <Media > <p>{props.leader.designation}</p> </Media>
                    <Media > {props.leader.description} </Media>
                </Media>
		    </Media>
        </div>
    )
}

export default RenderLeader;