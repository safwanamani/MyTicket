import React from "react";

function FormButton(props) {
    return (
        <div className="form-button">
            <button className="btn" type="submit" onClick={props.onClick}>
                {props.name}
            </button>
        </div>
    )
}

export default FormButton