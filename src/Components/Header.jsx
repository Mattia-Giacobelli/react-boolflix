import { Link } from "react-router-dom"
import SearchBar from "./Searchbar"

export default function Header() {


    return (
        <header>
            <div className="searchbar">

                <Link to={'https://portfolio-supabase.giacobelli-mattia12.workers.dev/'}
                    className="btn btn-outline-danger"> Portfolio</Link>

                <h1 >
                    BoolFlix
                </h1>

                <SearchBar />
            </div>
        </header>
    )
}