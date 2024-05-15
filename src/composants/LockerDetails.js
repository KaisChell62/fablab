import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import students from './students'; // Assurez-vous d'importer correctement le tableau students
import '../css/LockerDetails.css'; // Assurez-vous d'importer correctement votre fichier CSS

function LockerDetails() {
  const { id } = useParams();
  const [locked, setLocked] = useState(false); // État pour suivre si le casier est verrouillé ou déverrouillé
  const [time, setTime] = useState(new Date()); // État pour stocker l'heure actuelle

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Mettre à jour l'heure toutes les secondes

    return () => clearInterval(timer); // Nettoyer le timer lors du démontage du composant
  }, []);

  const locker = students.find(student => student.id === parseInt(id));

  if (!locker) {
    return <div>Casier non trouvé</div>;
  }

  const handleLockToggle = () => {
    setLocked(!locked);
  };

  return (
    <div className="card">
      <h2>Détails du casier</h2>
      <div className="card-details">
        <p><strong>Nom:</strong> {locker.name}</p>
        <p><strong>Age:</strong> {locker.age}</p>
        <p><strong>Campus:</strong> {locker.campus}</p>
        <p><strong>Heure actuelle:</strong> {time.toLocaleTimeString()}</p>
      </div>
      <div className="lock-status">
        <div className={`led ${locked ? 'red' : 'green'}`}></div> {/* Utilisez des classes CSS pour définir la couleur de la LED en fonction de l'état */}
        <p><strong>État du casier:</strong> {locked ? 'Verrouillé' : 'Déverrouillé'}</p> {/* Affiche l'état du casier en fonction de l'état */}
      </div>
      <button onClick={handleLockToggle}>{locked ? 'Déverrouiller' : 'Verrouiller'}</button>
    </div>
  );
}

export default LockerDetails;
