import SearchBar from "./Searchbar"

export default function Header() {


    return (
        <header>
            <div className="container-fluid searchbar">
                <h1 >
                    BoolFlix
                </h1>

                <SearchBar />
            </div>
        </header>
    )
}