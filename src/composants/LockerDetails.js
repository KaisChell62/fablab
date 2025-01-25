import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import students from './students'; // Assurez-vous que cette importation pointe vers le bon fichier
import '../css/LockerDetails.css'; // CSS pour personnaliser les détails du casier

function LockerDetails() {
  const { id } = useParams(); // Récupération de l'ID du casier depuis les paramètres de l'URL
  const navigate = useNavigate(); // Pour naviguer entre les pages
  const [locked, setLocked] = useState(false); // État du verrouillage
  const [time, setTime] = useState(new Date()); // Horloge en temps réel
  const [accessLogs, setAccessLogs] = useState([]); // Historique des accès
  const [content, setContent] = useState([]); // Contenu actuel du casier
  const [newItem, setNewItem] = useState(''); // Champ pour ajouter un nouvel objet
  const [batteryLevel, setBatteryLevel] = useState(100); // Simulation du niveau de batterie
  const [notifications, setNotifications] = useState([]); // Gestion des notifications dynamiques
  const [temperature, setTemperature] = useState(22); // Température interne simulée du casier
  const [humidity, setHumidity] = useState(50); // Humidité simulée

  // Simulation de l'horloge, de la batterie et des conditions internes
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setBatteryLevel(prev => (prev > 0 ? prev - 0.1 : 0)); // Baisse progressive de la batterie
      setTemperature(prev => (Math.random() > 0.5 ? prev + 0.1 : prev - 0.1)); // Variations aléatoires de température
      setHumidity(prev => (Math.random() > 0.5 ? prev + 0.1 : prev - 0.1)); // Variations aléatoires d'humidité
    }, 1000);

    return () => clearInterval(timer); // Nettoyage du timer à la destruction
  }, []);

  const locker = students.find(student => student.id === parseInt(id)); // Recherche du casier correspondant

  if (!locker) {
    return <div>Casier non trouvé</div>;
  }

  const handleLockToggle = () => {
    setLocked(!locked);
    addAccessLog(!locked ? 'Verrouillé' : 'Déverrouillé');
    addNotification(`Le casier a été ${!locked ? 'verrouillé' : 'déverrouillé'}`);
  };

  const addAccessLog = (action) => {
    setAccessLogs(prevLogs => [
      ...prevLogs,
      { action, time: new Date().toLocaleString() }
    ]);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setContent([...content, newItem]);
      setNewItem('');
      addNotification('Objet ajouté au casier');
    } else {
      addNotification('Veuillez entrer un objet valide');
    }
  };

  const handleRemoveItem = (item) => {
    setContent(content.filter(i => i !== item));
    addNotification('Objet retiré du casier');
  };

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications([...notifications, { id, message }]);
    setTimeout(() => {
      setNotifications(notifications.filter(n => n.id !== id));
    }, 5000);
  };

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  const handleClearContents = () => {
    setContent([]);
    addNotification('Le contenu du casier a été vidé');
  };

  const handleAdjustTemperature = (adjustment) => {
    setTemperature(prev => prev + adjustment);
    addNotification(`La température a été ajustée de ${adjustment}°C`);
  };

  const handleAdjustHumidity = (adjustment) => {
    setHumidity(prev => prev + adjustment);
    addNotification(`L'humidité a été ajustée de ${adjustment}%`);
  };

  return (
    <div className="locker-details">
      <h2>Détails du casier</h2>
      <div className="card-details">
        <p><strong>Nom:</strong> {locker.name}</p>
        <p><strong>Âge:</strong> {locker.age}</p>
        <p><strong>Campus:</strong> {locker.campus}</p>
        <p><strong>Heure actuelle:</strong> {time.toLocaleTimeString()}</p>
        <p><strong>Niveau de batterie:</strong> {batteryLevel.toFixed(1)}%</p>
        <p><strong>Température interne:</strong> {temperature.toFixed(1)}°C</p>
        <p><strong>Humidité interne:</strong> {humidity.toFixed(1)}%</p>
      </div>
      <div className="lock-status">
        <div className={`led ${locked ? 'red' : 'green'}`}></div>
        <p><strong>État du casier:</strong> {locked ? 'Verrouillé' : 'Déverrouillé'}</p>
      </div>
      <button onClick={handleLockToggle}>{locked ? 'Déverrouiller' : 'Verrouiller'}</button>

      <div className="locker-content">
        <h3>Contenu du casier</h3>
        <ul>
          {content.map((item, index) => (
            <li key={index}>
              {item} <button onClick={() => handleRemoveItem(item)}>Retirer</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Ajouter un objet"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Ajouter</button>
        <button onClick={handleClearContents}>Vider le contenu</button>
      </div>

      <div className="access-logs">
        <h3>Historique d'accès</h3>
        <ul>
          {accessLogs.map((log, index) => (
            <li key={index}>{log.action} à {log.time}</li>
          ))}
        </ul>
      </div>

      <div className="notifications">
        {notifications.map(notification => (
          <div key={notification.id} className="notification">
            {notification.message}
          </div>
        ))}
      </div>

      <div className="environment-controls">
        <h3>Contrôle des conditions internes</h3>
        <button onClick={() => handleAdjustTemperature(1)}>Augmenter la température</button>
        <button onClick={() => handleAdjustTemperature(-1)}>Diminuer la température</button>
        <button onClick={() => handleAdjustHumidity(5)}>Augmenter l'humidité</button>
        <button onClick={() => handleAdjustHumidity(-5)}>Diminuer l'humidité</button>
      </div>

      <button onClick={handleReturnToDashboard}>Retour au tableau de bord</button>
    </div>
  );
}

export default LockerDetails;