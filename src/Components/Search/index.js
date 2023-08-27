import searchIcon from "../../Assets/SearchIcon.svg"

const Search = ({ search = '', setSearch }) => {
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }
    return (
        <div className="pr-4 relative">
            <input type="text" value={search} className="search " placeholder="Search Resources" onChange={onChangeHandler} />
            <img className="absolute search-icon" src={searchIcon} alt="NoImg" />
        </div>
    )
}


export default Search