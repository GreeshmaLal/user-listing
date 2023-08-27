import Button from "../../Components/Button"
import CloseButton from "../../Assets/CloseButton.svg"
import { useEffect, useState } from "react"
import NoData from "../../Assets/NoData.svg"
import Checked from "../../Assets/Checked.svg"
import Search from "../../Components/Search"
import Accordion from "../../Components/Accordion"
import SelectedList from "../../Components/SelectedList"
import { v4 as uuid } from 'uuid';


const ListingPage = ({ onClick, setCount }) => {
    const [selected, setSelected] = useState([])
    const [userList, setUserList] = useState([])
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])


    const dateHandler = (data, keyValue) => {
        let list = selected?.map((selectedList) => {
            if (selectedList.email === data.dataId) {

                let dateList = selectedList.date?.map((x) => {
                    if (x.id === data.id) {
                        return {
                            ...x,
                            [keyValue]: data.value
                        }
                    }
                    else {
                        return x
                    }
                })
                return {
                    ...selectedList,
                    date: dateList
                }
            }
            else {
                return selectedList
            }
        })
        setSelected(list)
    }

    const selectData = (e) => {
        //since the mock Api data has some null values for id, hence using email
        return userList?.map((todo) =>
            todo.email === e.currentTarget.dataset.id
                ? { ...todo, selected: !todo.selected, date: !todo?.selected ? [{ id: uuid(), startDate: new Date(), endDate: new Date() }] : [] }
                : todo
        )
    }

    const openUser = (e) => {
        setUserList(selectData(e))
    }

    const deleteItem = (e) => {
        setUserList(selectData(e))
    }


    const onClickHandler = () => {
        onClick('CompletedPage')
        setCount(userList?.filter((x) => x.selected)?.length)
    }
    const DeleteButtonHandler = (email, dateId) => {
        setSelected(selected?.map((x) => {
            if (x.email === email) {
                let date = x.date.filter((y) => y.id !== dateId)
                return {
                    ...x,
                    date: date
                }
            }
            else {
                return x
            }
        }))
    }
    const AddButtonHandler = (e) => {
        const email = e.currentTarget.dataset.id

        setSelected(selected?.map((x) => {
            if (x.email === email) {
                return {
                    ...x,
                    date: [...x.date, { id: uuid(), startDate: new Date(), endDate: new Date() }]
                }
            }
            else {
                return x
            }
        }))
    }

    const searchHandler = (e) => {
        setSearch(e)
        let userList = userDetails
        if (e !== '') {
            let array = userList.filter((val) => val?.name.first?.toLowerCase()?.includes(e?.toLowerCase() || val?.name.last?.toLowerCase()?.includes(e?.toLowerCase())))
            setUserList(array)
        }
        else {
            let array = userDetails
            setUserList(array)
        }

    }

    useEffect(() => {
        setSelected(userList?.filter((x) => x.selected))
    }, [userList])

    useEffect(() => {
        const URL = "https://randomuser.me/api/?results=30";
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                setUserList(
                    data.results?.map((x) => {
                        return {
                            ...x, selected: false
                        }
                    })
                );
                setUserDetails(data.results?.map((x) => {
                    return {
                        ...x, selected: false
                    }
                }))
            });

    }, [])
    const titleChild = () => <div className="pb-2 pt-2 pl-4">
        <Search setSearch={searchHandler} search={search} />
    </div>
    return (
        <div className="listing-wrapper flex-col">
            <div className="flex w-full justify-between head">
                <div className="listing-title">Assignees & Schedule </div>
                <Button src={CloseButton} onClick={() => onClick('LandingPage')} />
            </div>
            <div className="flex tab-active">Schedule</div>
            <div className="flex w-full h-full list">
                <Accordion title='Resources' titleChild={titleChild} >
                    <div className="flex-col flex ">
                        {userList?.map((items, i) => {
                            return <div key={i} onClick={openUser} className={`${items?.selected ? 'selected-data' : ''} py-2 pl-4 flex justify-between person-img w-full`} data-id={items.email} >
                                <div className="flex gap-2 items-center ">
                                    <div className="thumbnail-wrapper">
                                        <img className="thumbnail" src={items?.picture?.thumbnail} alt="NoImg" />
                                    </div>
                                    <div className="flex-1 name">{`${items.name.first} ${items.name.last}`}</div>
                                </div>
                                {items?.selected && <div className="pr-2">
                                    <img src={Checked} alt="NoImg" />
                                </div>
                                }
                            </div>
                        })}</div>
                </Accordion>
                {selected?.length ? <div className="flex-col w-full h-full">
                    <div className="selected-user flex-col w-full">
                        {selected?.map((itemsSelected, i) => {
                            return <SelectedList dateHandler={dateHandler} key={i} DeleteButtonHandler={DeleteButtonHandler} itemsSelected={itemsSelected} deleteItem={deleteItem} AddButtonHandler={AddButtonHandler} />
                        }
                        )}

                    </div>
                    <div className="p-4 flex w-full justify-end gap-4">
                        <Button name="Cancel" className="btn btn-cancel" onClick={() => setUserList(userDetails)} />
                        <Button name="Save" className="btn btn-save" onClick={onClickHandler} />
                    </div>
                </div> :
                    <div className="h-full w-full nodata-new">
                        <div className="flex w-full h-full items-center justify-center nodata">
                            <img src={NoData} alt="NoImg" />
                        </div>
                    </div>
                }
            </div>

        </div >

    )
}

export default ListingPage