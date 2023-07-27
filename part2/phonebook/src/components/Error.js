const Error = ({ text }) => {
    const errorStyle = {
        width: 400,
        padding: 5,
        color: 'white',
        fontSize: 20,
        border: 'solid',
        borderRadius: 7,
        backgroundColor: 'darkRed'
    }
    if (text === null) {
        return null
    }
    return (
        <div style={errorStyle}>
            {text}
        </div>
    )
}

export default Error