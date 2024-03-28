// Importations nécessaires depuis React et FontAwesome
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';

// Style CSS pour les boutons
const buttonStyle = {
    cursor: 'pointer', // Curseur de la souris en forme de pointeur
    marginRight: '10px', // Marge à droite de 10 pixels
};

// Composant de bouton pour supprimer une tâche
export function ButtonRemove({ onClick }) {
    return (
        <div style={buttonStyle} onClick={onClick}> {/* Style CSS du bouton et gestionnaire de clic */}
            <FontAwesomeIcon icon={faTrash} /> {/* Icône de la corbeille */}
        </div>
    );
}

// Composant de bouton pour éditer une tâche
export function ButtonEdit ({ onClick }) {
    return (
        <div style={buttonStyle} onClick={onClick}> {/* Style CSS du bouton et gestionnaire de clic */}
            <FontAwesomeIcon icon={faPencilAlt} /> {/* Icône du crayon */}
        </div>
    );
}

// Composant de bouton pour afficher le calendrier
export function ButtonCalendar ({ onClick }) {
    return (
        <div style={buttonStyle} onClick={onClick}> {/* Style CSS du bouton et gestionnaire de clic */}
            <FontAwesomeIcon icon={faCalendar} /> {/* Icône du calendrier */}
        </div>
    );
}
