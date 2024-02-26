

const NavBar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between bg-white h-[50px] shadow font-poppins fixed top-0 left-0 right-0">
        <div className="text-xl font-semibold ml-10 mr-5">
          TaskStack 
        </div>
        <ul className="flex space-x-5 mr-10">
          <li>Home</li>
          <li>Your Task</li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar