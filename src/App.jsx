import { BrowserRouter, Route, Routes } from "react-router-dom"
import MoviesAndTvSeries from "./Pages/MoviesAndTvSeries"
import { MoviesProvider } from "./Contexts/MoviesProvider"



function App() {


  return (
    <>
      <MoviesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesAndTvSeries />} />
          </Routes>
        </BrowserRouter>
      </MoviesProvider>
    </>
  )
}

export default App
