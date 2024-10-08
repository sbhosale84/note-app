import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./notes.css";

function Notes() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  function handleSave() {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNote("");
  }

  function handleToggle() {
    setShowNotes(!showNotes);
  }

  return (
    <div className="main-container">
      <div className="left-container">
        <textarea
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <button className="btn" onClick={handleSave}>
          save note
        </button>
      </div>
      <div className="right-container">
        <ReactMarkdown>{note}</ReactMarkdown>
      </div>
      <div>
        {
          <button onClick={handleToggle} className="btn">
            {showNotes ? "hide notes" : "show notes"}
          </button>
        }
      </div>
      {showNotes && (
        <div className="note-list">
          {notes.length > 0 ? (
            <div>
              {notes.map((value, i) => 
                 <div  key={i} className="saved-note">
                 <ReactMarkdown>{value}</ReactMarkdown>
               </div>
              )}
            </div>
          ) : (
            "No notes found"
          )}
        </div>
      )}
    </div>
  );
}

export default Notes;
