import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash,faCalendar } from '@fortawesome/free-solid-svg-icons';

const buttonStyle = {
    cursor: 'pointer',
    marginRight: '10px',
};


export function ButtonRemove({ onClick }) {
    return (
        <div style={buttonStyle} onClick={onClick}>
            <FontAwesomeIcon icon={faTrash} />
        </div>
    );
}

export function ButtonEdit ({ onClick }) {
    return (

        <div style={buttonStyle} onClick={onClick}>
            <FontAwesomeIcon icon={faPencilAlt} />
        </div>
    );
}
export function ButtonCalendar ({ onClick}){

    return(
        <div style={buttonStyle} onClick={onClick}>
            <FontAwesomeIcon icon={faCalendar} />
        </div>

    );
}
