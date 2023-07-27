const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name
                            </td>
                            <td>
                                <input value={props.nameInput[0]} onChange={props.nameInput[1]} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Number
                            </td>
                            <td>
                                <input value={props.numberInput[0]} onChange={props.numberInput[1]} />
                            </td>
                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm