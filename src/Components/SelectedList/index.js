import { Fragment } from "react"
import DateTime from "../DateTime"
import DeleteButton from "../../Assets/DeleteButton.svg"
import AddButton from "../../Assets/AddButton.png"



const SelectedList = ({ itemsSelected, deleteItem, AddButtonHandler, DeleteButtonHandler, dateHandler }) => {

    return <Fragment key={itemsSelected?.id} > {itemsSelected.selected &&
        <div className="selected-card w-full gap-6 flex flex-col" >
            <div className="flex items-center w-full justify-between">
                <div className="flex gap-2 items-center ">
                    <div className="thumbnail-wrapper">
                        <img className="thumbnail" src={itemsSelected.picture.thumbnail} alt="NoImg" />
                    </div>
                    <div className="flex-1 name">{`${itemsSelected.name.first} ${itemsSelected.name.last}`}</div>
                </div>
                <div className="cursor-pointer" data-id={itemsSelected.email} onClick={deleteItem}>
                    <img src={DeleteButton} alt="NoImg" /></div>
            </div>

            {itemsSelected.date.map((x, i) => {
                return <div className="flex justify-between items-center" key={i}>
                    <div className="flex gap-4">
                        <DateTime label='Start Date & Time' keyValue='startDate' dataId={itemsSelected.email} id={x.id} dateHandler={dateHandler} value={x.startDate} />
                        <DateTime label='End Date & Time' keyValue='endDate' dataId={itemsSelected.email} id={x.id} value={x.endDate} dateHandler={dateHandler} />
                    </div>
                    <div className="flex gap-4">
                        {i !== 0 && <div className="flex cursor-pointer" onClick={() => DeleteButtonHandler(itemsSelected?.email, x.id)} >
                            <img src={DeleteButton} alt="NoImg" /></div>}
                        {itemsSelected.date.length === i + 1 && <div className="flex cursor-pointer" onClick={AddButtonHandler} data-id={itemsSelected?.email}>
                            <img src={AddButton} alt="NoImg" /></div>}
                    </div>
                </div>
            })}
        </div>
    }</Fragment>
}

export default SelectedList