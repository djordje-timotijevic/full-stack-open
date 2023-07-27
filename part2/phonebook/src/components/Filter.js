const Filter = (props) => {
    return (
        <div>
            Search:
            <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default Filter