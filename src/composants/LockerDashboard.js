import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import students from './students';
import '../css/LockerDashboard.css';

function LockerDashboard() {
    const [searchText, setSearchText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [lockerStatus, setLockerStatus] = useState(
        students.reduce((acc, student) => ({ ...acc, [student.id]: 'free' }), {})
    );
    const [theme, setTheme] = useState('light');
    const [lockerHistory, setLockerHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const filteredStudents = students.filter(student =>
        typeof student.name === 'string' && student.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAccessClick = (studentId) => {
        setSelectedStudentId(studentId);
        setShowModal(true);
    };

    const handleSubmitPassword = () => {
        if (password === '0000') {
            setLockerStatus((prevStatus) => ({ ...prevStatus, [selectedStudentId]: 'occupied' }));
            addNotification('Succès : Le casier a été ouvert.', 'success');
            logLockerAction(selectedStudentId, 'opened');
            setShowModal(false);
            setPassword('');
        } else {
            setErrorMessage('Mot de passe incorrect');
            addNotification('Erreur : Mot de passe incorrect.', 'error');
            setPassword('');
        }
    };

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 5000);
    };

    const handleLockerReset = (studentId) => {
        setLockerStatus((prevStatus) => ({ ...prevStatus, [studentId]: 'free' }));
        addNotification('Casier réinitialisé.', 'success');
        logLockerAction(studentId, 'reset');
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const logLockerAction = (studentId, action) => {
        const student = students.find((s) => s.id === studentId);
        if (student) {
            setLockerHistory((prevHistory) => [
                ...prevHistory,
                { name: student.name, action, timestamp: new Date().toLocaleString() },
            ]);
        }
    };

    const renderNotification = () => (
        <div className="notifications">
            {notifications.map((notif) => (
                <div key={notif.id} className={`notification ${notif.type}`}>
                    {notif.message}
                </div>
            ))}
        </div>
    );

    const renderLockerHistory = () => (
        <div className="locker-history">
            <h2>Historique des actions</h2>
            <ul>
                {lockerHistory.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.name}</strong> - {entry.action} à {entry.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderErrorMessage = () => (
        errorMessage && <div className="error-message">{errorMessage}</div>
    );

    return (
        <div className="locker-dashboard">
            <h1 className="text-glow">Système de Casier Connecté</h1>
            <button className="button toggle-theme" onClick={toggleTheme}>
                Mode {theme === 'light' ? 'Sombre' : 'Clair'}
            </button>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            {renderErrorMessage()}
            <div className="student-list dynamic-grid">
                {filteredStudents.map(student => (
                    <div key={student.id} className="student-card shadow-hover">
                        <div className="student-info">
                            <div>{student.name}</div>
                            <div>
                                <span className={`indicator ${lockerStatus[student.id]}`}></span>
                                {lockerStatus[student.id] === 'free' ? 'Libre' : 'Occupé'}
                            </div>
                        </div>
                        <button
                            className="button"
                            onClick={() => handleAccessClick(student.id)}
                        >
                            Accéder au casier
                        </button>
                        <Link to={`/details/${student.id}`} className="button-details">
                            Voir détails
                        </Link>
                        {lockerStatus[student.id] === 'occupied' && (
                            <button
                                className="button-secondary"
                                onClick={() => handleLockerReset(student.id)}
                            >
                                Réinitialiser le casier
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal fade-in">
                    <div className="modal-content">
                        <h2>Entrez le mot de passe</h2>
                        <input
                            type="password"
                            className="input password-input"
                            placeholder="••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="button-secondary" onClick={handleSubmitPassword}>
                            Valider
                        </button>
                    </div>
                </div>
            )}
            {renderNotification()}
            {renderLockerHistory()}
        </div>
    );
}

export default LockerDashboard;
