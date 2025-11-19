import { BrowserRouter, Route, Routes } from "react-router-dom"
import
import FilmAndTvSeries from "./Pages/FilmAndTvSeries"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilmAndTvSeries />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
