import React, { useState } from 'react';
import './App.css';
import { ButtonCalendar, ButtonEdit, ButtonRemove } from "./Button.jsx";
import Calendar from "react-calendar";

function App() {
    const [TheList, setTheList] = useState([
        { id: 1, task: "task1", type: "True", date: null },
        { id: 2, task: "task2", type: "True", date: null },
        { id: 3, task: "task3", type: "True", date: null }
    ]);
    const [NewTask, setNewTask] = useState("");
    const [EditingTask, setEditingTask] = useState(null);

    const [selectedDates, setSelectedDates] = useState({}); // Nouvel état pour stocker les dates sélectionnées pour chaque bouton de calendrier

    const HandleChange = (event) => {
        setNewTask(event.target.value);
    };

    const HandleSubmit = (event) => {
        event.preventDefault();

        if (EditingTask !== null) {
            const updatedList = TheList.map(item =>
                item.id === EditingTask.id ? { ...item, task: NewTask } : item
            );
            setTheList(updatedList);
            setEditingTask(null);
        } else {
            const id = new Date().getTime();
            const task = NewTask;
            const newList = [...TheList, { id: id, task: task, date: null }];
            setTheList(newList);
        }

        setNewTask("");
    };

    const HandleButtonRemove = (id) => {
        const filteredList = TheList.filter((item) => item.id !== id);
        setTheList(filteredList);
    };

    const HandleEdit = (id) => {
        const taskToEdit = TheList.find(item => item.id === id);
        setNewTask(taskToEdit.task);
        setEditingTask(taskToEdit);
    };

    const handleToggleCalendar = (taskId) => () => { // Fonction qui retourne une fonction pour basculer la visibilité du calendrier correspondant au bouton spécifique
        setSelectedDates(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId] // Inverse la visibilité du calendrier correspondant au bouton spécifique
        }));
    };

    const handleDateChange = (taskId) => (date) => { // Fonction qui retourne une fonction pour mettre à jour la date sélectionnée pour le bouton spécifique
        const updatedTaskList = TheList.map(task => {
            if (task.id === taskId) {
                return { ...task, date: date };
            }
            return task;
        });
        setTheList(updatedTaskList);

        setSelectedDates(prevState => ({
            ...prevState,
            [taskId]: false // Ferme le calendrier après avoir sélectionné une date
        }));
    };

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
                            <ButtonCalendar onClick={handleToggleCalendar(task.id)} /> {/* Passer l'identifiant de la tâche spécifique */}
                            {task.date && ( // Afficher la date sélectionnée pour la tâche spécifique
                                <span>{task.date.toLocaleDateString()}</span>
                            )}
                        </div>
                        {selectedDates[task.id] && ( // Afficher le calendrier correspondant à la tâche spécifique si une date est sélectionnée
                            <Calendar
                                value={task.date || new Date()} // Utiliser la date de la tâche ou la date actuelle si aucune date n'est sélectionnée
                                onChange={handleDateChange(task.id)}
                                defaultView={"month"}
                                //activeStartDate={new Date(2024, 2, 28)}
                                //nextLabel={"next"}
                                //selectRange
                                allowPartialRange
                                goToRangeStartOnSelects
                                //showWeekNumbers
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
