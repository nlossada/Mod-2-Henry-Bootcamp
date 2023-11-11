import Card from './Card';

export default function Cards({ characters }) {
   return (
      <div>
         {
            characters && characters.map((character) => {
               return <Card key={character.id} character={character} > </Card>
            })
         }
      </div>
   )
}

