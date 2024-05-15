import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import students from './students';
import '../css/LockerDashboard.css';

function LockerDashboard() {
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const filteredStudents = students.filter(student =>
        typeof student.name === 'string' && student.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAccessClick = (studentId) => {
        setSelectedStudentId(studentId);
        setShowModal(true);
    };

    const handleSubmitPassword = () => {
        // Vérifier si le mot de passe est correct (4 fois zéro)
        if (password === '0000') {
            // Rediriger vers les détails du casier
            window.location.href = `/details/${selectedStudentId}`;
        } else {
            alert('Mot de passe incorrect');
            setPassword('');
        }
    };

    return (
        <div className="locker-dashboard">
            <h1>Casier</h1>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <div className="student-list">
                {filteredStudents.map(student => (
                    <div key={student.id} className="student-card">
                        <div>{student.name}</div>
                        <button onClick={() => handleAccessClick(student.id)}>Accéder au casier</button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Entrez le mot de passe</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleSubmitPassword}>Valider</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LockerDashboard;
