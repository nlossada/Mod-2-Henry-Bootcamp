export default function Card({ character, onClose }) {
   return (
      <span>
         <button onClick={onClose}>X</button>
         <h2>{character.name}</h2>
         <h2>{character.status}</h2>
         <h2>{character.species}</h2>
         <h2>{character.gender}</h2>

         <img src={character.image} alt='Rick Sanchez' />
      </span>
   );
}
