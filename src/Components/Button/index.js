
const Button = ({ name = '', className = '', onClick, src = '' }) => {
    return <button onClick={onClick} className={className}>{name ? name : <img src={src} alt="NoImg" />}</button>
}

export default Button