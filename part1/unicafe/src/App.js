import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.values.total === 0) {
    return (
      <div>No feedback data</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.values.good} />
        <StatisticsLine text="neutral" value={props.values.neutral} />
        <StatisticsLine text="bad" value={props.values.bad} />
        <StatisticsLine text="total" value={props.values.total} />
        <StatisticsLine text="average" value={props.values.average} />
        <StatisticsLine text="positive" value={props.values.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalStats = good + neutral + bad

  const values = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: good + neutral + bad,
    average: (totalStats / 3).toFixed(2),
    positive: (good * (100 / totalStats).toFixed(2))
  }

  return (
    <div>
      <Heading text='Give Feedback'/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      
      <Heading text='Statistics' />
      <Statistics values={values} />
    </div>
  )
}

export default App;