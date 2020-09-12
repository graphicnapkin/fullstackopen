import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      {<Total parts={course.parts} />}
    </div>
  )
}

const Header = props => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = ({ parts }) => {
  return(
    <>
      {parts.map(part => <Part name={part.name} exercise={part.exercises} key={part.id} />)}
    </>
  )
}

const Part = ({name,exercise}) => <p>{name} {exercise}</p>

const Total = ({parts}) => {
  return (
    <b>
      Number of exercises {parts.reduce((total, {exercises}) => total + exercises, 0)}
    </b>
  )
}

export default Course;
