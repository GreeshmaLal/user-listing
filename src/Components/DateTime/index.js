import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"
const DateTime = ({ label = '', dateHandler, dataId, id, value, keyValue = '' }) => {
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (value) {
            setStartDate(value)
        }
    }, [value])

    let changedDate = (date) => {
        let data = {}
        if (id) {
            data.id = id
        }
        if (dataId) {
            data.dataId = dataId
        }
        data.value = date
        dateHandler(data, keyValue)

    }
    return (
        <div className="date">
            <div className="label">{label}</div>
            <DatePicker
                selected={startDate}
                onChange={(date) => changedDate(date)}
                showTimeSelect
                timeIntervals={15}
                dateFormat="MMMM d, h:mm aa"

            /></div>
    )
}

export default DateTime