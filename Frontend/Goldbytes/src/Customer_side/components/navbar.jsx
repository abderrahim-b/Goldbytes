import { useState, useRef, useEffect } from 'react'
import './navbar.css'
import pfp from '../../assets/80944c1222ecb06ea53e47c153b1d911.jpg'

function Navbar(){
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return(
        <nav className="navbar">
            <div className="logo">Goldbytes</div>
            <form className="search-form">
                <input type="text" placeholder="Search anything" className='search'/>
            </form>
            <div className="profile">
                <button className="create-button">
                    <i className="fi fi-rr-square-plus"></i>
                    Create
                </button>
                <div className="profile-info" ref={dropdownRef}>
                    <img
                        src={pfp}
                        alt="Profile"
                        onClick={() => setDropdownOpen(prev => !prev)}
                    />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <img src={pfp} alt="Profile" className="dropdown-pfp" />
                                <div>
                                    <p className="dropdown-name">Username</p>
                                    <p className="dropdown-email">user@email.com</p>
                                </div>
                            </div>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item">
                                <i className="fi fi-rr-user"></i>
                                Profile
                            </button>
                            <button className="dropdown-item">
                                <i className="fi fi-rr-settings"></i>
                                Post Management
                            </button>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item dropdown-logout">
                                <i className="fi fi-rr-sign-out-alt"></i>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;