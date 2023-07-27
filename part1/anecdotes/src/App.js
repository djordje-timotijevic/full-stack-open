import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>
const Anecdote = ({ anecdote }) => <div>{anecdote}</div>
const AnecdoteStat = ({ voteNum }) => <div>Has {voteNum} votes</div>
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdotesLenght = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(anecdotesLenght))

  const randomNum = () => Math.floor(Math.random() * anecdotes.length)
  const highestVotedIndex = votes.reduce((maxIndex, currentValue, currentIndex, arr) => {
      if (currentValue > arr[maxIndex]) {
        return currentIndex
      } else {
        return maxIndex
      }
    }, 0)

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVote(newVotes)
  }

  return (
    <div>
      <div>
        <Heading text='Anecdote of the day' />
        <Anecdote anecdote={anecdotes[selected]} />
      </div>
      <div>
        <Button handleClick={() => handleVote()} text='Vote' />
        <Button handleClick={() => setSelected(randomNum)} text='Next anecdote' />
        <AnecdoteStat voteNum={votes[selected]} />
      </div>
      <div>
        <Heading text='Anecdote with most votes' />
        <Anecdote anecdote={anecdotes[highestVotedIndex]} />
        <AnecdoteStat voteNum={votes[highestVotedIndex]} />
      </div>
    </div>
  )
}

export default App