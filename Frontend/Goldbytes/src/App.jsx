import './App.css'
import Navbar from './Customer_side/components/navbar';
import Sidebar from './Customer_side/components/navigation';
 import Home from './Customer_side/pages/home_page/home';
function App() {
 

  return (
    <>
      <Navbar />
      <Sidebar />
      <Home />

    </>
  )
}

export default App
