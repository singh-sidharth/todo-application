import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
	const [notes, setNotes] = useState([]);

	const API_URL = "http://localhost/api/todoapp";

	useEffect(() => {
		refreshNotes();
	}, [API_URL]);

	const refreshNotes = () => {
		fetch(API_URL + "/GetNotes")
			.then((response) => response.json())
			.then((data) => {
				setNotes(data);
				console.log("New Data: ", data);
			});
	};
	const addClick = () => {
		const newNote = document.getElementById("newNotes").value;
		console.log("Send note", newNote);
		fetch(API_URL + "/AddNotes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ description: newNote }),
		})
			.then((response) => response.json())
			.then((data) => {
				refreshNotes();
			});
	};

	const deleteClick = (id) => {
		fetch(API_URL + "/DeleteNotes/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				refreshNotes();
			});
	};

	return (
		<>
			<div>
				<h2>Todo App</h2>
				<input type='text' id='newNotes' />
				&nbsp;
				<button onClick={addClick}>Add Notes</button>
				{notes.map((note) => (
					<p key={note.id}>
						<b>* {note.description}</b>
						<button onClick={() => deleteClick(note.id)}>Delete</button>
					</p>
				))}
			</div>
		</>
	);
};

export default App;
