import React from "react";
// eslint-disable-next-line no-unused-vars
import Animals from "../Animals/Animals";
// eslint-disable-next-line no-unused-vars
import Species from "../Species/Species";
import styledZoo from "./Zoo.module.css";

export default function Zoo() {
  const [zoo, setZoo] = React.useState({
    zooName: "",
    animals: [],
    species: [],
    allAnimals: [],
  })
  function handleInputChange(event) {
    console.log(event)
    const text = event.target.value
    setZoo({ ...zoo, zooName: text });
    // no es document.querySelector("#zooInput").value  ni .nativeEvent.data
  }

  React.useEffect(() => {
    fetch("http://localhost:3001/zoo")
      .then((res) => res.json())
      .then((data) =>
        setZoo({
          ...zoo,
          animals: data.animals,
          species: data.species,
          allAnimals: data.animals,
        })
      )
      .catch((error) => console.log(error));
  }, []);

  function handleSpecies(event) {
    // console.log(zoo.animals)
    // console.log(event.target.value)
    // se puede hacer const {value} = event.target y luego uso solo el value
    const filtSpecie = zoo.allAnimals.filter((animalFilter) => event.target.value === animalFilter.specie)
    console.log(filtSpecie)
    setZoo({ ...zoo, animals: filtSpecie })
  }
  function handleAllSpecies() {
    setZoo({ ...zoo, animals: zoo.allAnimals })
  }


  return (
    <div>
      <div >
        <label>Zoo Name:</label>
        <input type="text" value={zoo.zooName} onChange={handleInputChange} />
        <h1>{zoo.zooName}</h1>
      </div>


      <Species species={zoo.species} handleSpecies={handleSpecies} handleAllSpecies={handleAllSpecies} />
      <Animals animals={zoo.animals} />

    </div>
  );
}

