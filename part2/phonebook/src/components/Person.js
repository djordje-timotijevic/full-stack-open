const Person = ({ person, handleDelete, personId }) => {
    return (
        <div>
            <li>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.name, personId)}>Delete</button>
            </li>
        </div>
    )
}

export default Person