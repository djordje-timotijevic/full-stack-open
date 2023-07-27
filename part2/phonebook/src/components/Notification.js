const Notification = ({ text }) => {
    const notificationStyle = {
        width: 400,
        padding: 5,
        color: 'white',
        fontSize: 20,
        border: 'solid',
        borderRadius: 7,
        backgroundColor: 'green'
    }
    
    if (text === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {text}
        </div>
    )
}

export default Notification