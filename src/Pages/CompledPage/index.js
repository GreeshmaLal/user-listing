
const CompletedPage = ({ onClick, count = '' }) => {
    return (
        <div className="completed-button">
            <button onClick={onClick} className="btn-completed relative">Completed</button>
            {count && <div className="notification">{count}</div>
            }        </div>
    )
}

export default CompletedPage