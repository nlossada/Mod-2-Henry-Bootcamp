import React from "react";
import Botones from "./Botones";

const studentName = "Natalia";
const techSkills = ["Html", "Css", "JavaScript", "React", "Redux"];
const alerts = { m1: "Aprobado", m2: "En curso" };

export default function Bienvenido() {
  return (
    <div>
      <h1>Welcome to ReactWorld</h1>
      <h2>Our students and skills</h2>
      <h3>{studentName}</h3>
      <ul>
        {
          techSkills.map((skill) => {
            return (
              <li>{skill}</li>
            )
          })
        }
      </ul>
      <Botones alerts={alerts}></Botones>
    </div>
  );
}

// Esto lo exportamos para los tests
export { studentName, techSkills, alerts };
