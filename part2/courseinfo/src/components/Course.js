const CourseHeader = ({ text }) => {
    return (
      <h2>{text}</h2>
    )
  }
  
  const Part = ({ partName, partExercises}) => {
    return (
      <div>
        {partName} {partExercises}
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
            <Part key={part.id} partName={part.name} partExercises={part.exercises} />
          )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const initialValue = 0
    const totalExercises = parts.reduce((totalExercises, part) => totalExercises + part.exercises, initialValue)
    return (
      <h4>Total of {totalExercises} exercises</h4>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <CourseHeader text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course