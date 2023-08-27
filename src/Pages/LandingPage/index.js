import Button from "../../Components/Button"

const LandingPage = ({ setPage }) => {
    return (
        <Button name="Click Me" onClick={() => setPage('ListingPage')} className="btn-landing" />
    )
}

export default LandingPage