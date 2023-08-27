import { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import ListingPage from "./ListingPage";
import CompletedPage from "./CompledPage";

const Main = () => {
    const [page, setPage] = useState('LandingPage')
    const [count, setCount] = useState('')

    useEffect(() => {
        setPage('LandingPage')
    }, [])
    return (
        <div className="w-full h-full justify-between flex">

            {page === 'LandingPage' ?
                < LandingPage setPage={setPage} /> :
                page === 'ListingPage' ?
                    < ListingPage onClick={setPage} setCount={setCount} />
                    :
                    < CompletedPage count={count} />
            }
        </div>
    )
}

export default Main