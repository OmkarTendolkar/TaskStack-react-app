import NavBar from "./components/NavBar"
import TaskStack from "./components/TaskStack"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <div className="bg-teal-200 w-full h-screen pt-[70px]">
        <NavBar />
        <TaskStack />
        <Footer />
      </div>
    </>
  )
}

export default App
