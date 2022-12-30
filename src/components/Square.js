import React from "react";

const Square = (props) => {
    return (
        <button
            className={props.squareIsSelected ? "square_selected" : "square"}
            onClick={props.onClick}
        >
            <span className={props.value === 'X' ? 'value-x' : 'value-o'}>{props.value}</span>
        </button>
    );
}


export default Square;