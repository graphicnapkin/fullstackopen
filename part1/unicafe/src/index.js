import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={'give feedback'} />
      <Button text={'good'} handleClick={()=>setGood(good + 1)}/>
      <Button text={'neutral'} handleClick={()=>setNeutral(neutral + 1)}/>
      <Button text={'bad'} handleClick={()=>setBad(bad + 1)}/>
      <Header title={'statistics'} />
      <Statistics good={good} bad={bad} neutral={neutral} />
      
    </div>
  )

}

const Header = ({title}) => <h1>{title}</h1>
const Button = ({text,handleClick}) => <button onClick={handleClick}>{text}</button>
const Statistic = ({name,count}) => <tr><td>{name}</td><td>{count}</td></tr>

const Statistics = ({good,bad,neutral}) => {
  const all = good + neutral + bad
  if(!all) return (<span>No feedback given</span>)
  const average = (good - bad) / all
  const positive = `${good / all} %`
  return (
    <table>
      <tbody>
        <tr>
          <th style={{textAlign:'left'}}>stat</th>
          <th style={{textAlign:'left'}}>count</th>
        </tr>
        <Statistic name='good' count={good}/>
        <Statistic name='neutral' count={neutral}/>
        <Statistic name='bad' count={bad}/>
        <Statistic name='all' count={all}/>
        <Statistic name='average' count={average}/>
        <Statistic name='positive' count={positive}/>
      </tbody>
    </table>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
