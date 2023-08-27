import { useState } from "react"
import Arrow from "../../Assets/Arrow.svg"

const Accordion = ({ title = '', titleChild, children }) => {
    const [open, setOpen] = useState(true)

    const listUser = () => {
        setOpen(!open)
    }
    return (
        <div className="user-list cursor-pointer">
            <div onClick={listUser} className="flex justify-between dropdown">
                <span className="pl-4">{title}</span>
                <img className={`${open ? 'imgRotate' : 'imgNoRotate'}`} src={Arrow} alt="NoImg" />
            </div>
            {titleChild && titleChild()}
            <div className={`${open ? 'show' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}


export default Accordion