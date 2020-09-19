import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [val, setVal] = useState(0)
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React',
        exercises:10
      },
      {
        name:'Using props to pass data',
        exercises:7
      },
      {
        name:'State of a component',
        exercises:14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
      <button onClick={()=>setVal(val + 1)}>Increase Val</button>
      <button onClick={()=>console.log(val)}>Log Val</button>
    </div>
  )
}

const Header = props => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = props => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Total = props => {
  return (
      <p>
        Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>

  )
}

const Part = ({part,exercise}) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))