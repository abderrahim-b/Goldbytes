import './navbar.css'
import pfp from '../../assets/80944c1222ecb06ea53e47c153b1d911.jpg'
function Navbar(){

    return(
        <nav className="navbar">
            <div className="logo">Goldbytes</div>
            <form className="search-form">
                <input type="text" placeholder="Search anything" className='search'/>
            </form>
            <div className="profile">
                
                <button className="create-button">
                    <i class="fi fi-rr-square-plus"></i>
                    Create
                </button>
                <div className="profile-info">
                    <img src={pfp} alt="Profile"  />
                </div>
                
            </div>
        </nav>
    )
}
export default Navbar;