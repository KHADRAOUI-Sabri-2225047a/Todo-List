import React, { useState, useEffect } from 'react'; // Importation de useState et useEffect depuis React
import './App.css'; // Importation du fichier CSS
import { ButtonCalendar, ButtonEdit, ButtonRemove } from "./Button.jsx"; // Importation des composants ButtonCalendar, ButtonEdit et ButtonRemove depuis le fichier Button.jsx
import Calendar from "react-calendar"; // Importation du composant Calendar depuis la bibliothèque react-calendar

function App() {
    // État pour stocker la liste des tâches
    const [TheList, setTheList] = useState([
        { id: 1, task: "task1", type: "True", date: null },
        { id: 2, task: "task2", type: "True", date: null },
        { id: 3, task: "task3", type: "True", date: null }
    ]);

    // État pour stocker le contenu de la nouvelle tâche
    const [NewTask, setNewTask] = useState("");

    // État pour stocker la tâche en cours d'édition
    const [EditingTask, setEditingTask] = useState(null);

    // État pour stocker les dates sélectionnées pour chaque bouton de calendrier
    const [selectedDates, setSelectedDates] = useState({});

    // Fonction appelée à chaque changement dans le champ de saisie de la nouvelle tâche
    const HandleChange = (event) => {
        setNewTask(event.target.value);
    };

    // Fonction appelée lors de la soumission du formulaire pour ajouter ou éditer une tâche
    const HandleSubmit = (event) => {
        event.preventDefault();

        if (EditingTask !== null) {
            // Mise à jour de la liste des tâches pour l'édition d'une tâche existante
            const updatedList = TheList.map(item =>
                item.id === EditingTask.id ? { ...item, task: NewTask } : item
            );
            setTheList(updatedList);
            setEditingTask(null);
        } else {
            // Ajout d'une nouvelle tâche à la liste
            const id = new Date().getTime();
            const task = NewTask;
            const newList = [...TheList, { id: id, task: task, date: null }];
            setTheList(newList);
        }

        // Réinitialisation du champ de saisie de la nouvelle tâche
        setNewTask("");
    };

    // Fonction pour supprimer une tâche de la liste
    const HandleButtonRemove = (id) => {
        const filteredList = TheList.filter((item) => item.id !== id);
        setTheList(filteredList);
    };

    // Fonction pour éditer une tâche de la liste
    const HandleEdit = (id) => {
        const taskToEdit = TheList.find(item => item.id === id);
        setNewTask(taskToEdit.task);
        setEditingTask(taskToEdit);
    };

    // Fonction pour basculer la visibilité du calendrier correspondant à un bouton spécifique
    const handleToggleCalendar = (taskId) => () => {
        setSelectedDates(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };

    // Fonction pour mettre à jour la date sélectionnée pour un bouton spécifique
    const handleDateChange = (taskId) => (date) => {
        const updatedTaskList = TheList.map(task => {
            if (task.id === taskId) {
                return { ...task, date: date };
            }
            return task;
        });
        setTheList(updatedTaskList);

        setSelectedDates(prevState => ({
            ...prevState,
            [taskId]: false
        }));
    };

    // Effet pour sauvegarder les tâches dans le local storage lorsqu'elles changent
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(TheList));
    }, [TheList]);

    return (
        <>
            <h1>Todo List :</h1>
            <ul>
                {TheList.map((task) => (
                    <li key={task.id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {task.task}
                            <ButtonRemove onClick={() => HandleButtonRemove(task.id)} />
                            <ButtonEdit onClick={() => HandleEdit(task.id)} />
                            <ButtonCalendar onClick={handleToggleCalendar(task.id)} />
                            {task.date && (
                                <span>{task.date.toLocaleDateString()}</span>
                            )}
                        </div>
                        {selectedDates[task.id] && (
                            <Calendar
                                value={task.date || new Date()}
                                onChange={handleDateChange(task.id)}
                                defaultView={"month"}
                                allowPartialRange
                                goToRangeStartOnSelects
                            />
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={HandleSubmit}>
                <input
                    value={NewTask}
                    type="text"
                    placeholder="Add Task..."
                    onChange={HandleChange}
                />
                <button>{EditingTask ? "Edit Task" : "Add"}</button>
            </form>
        </>
    );
}

export default App;
