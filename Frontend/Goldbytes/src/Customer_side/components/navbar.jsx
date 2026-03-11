import { useState, useRef, useEffect } from 'react'
import './navbar.css'
import pfp from '../../assets/80944c1222ecb06ea53e47c153b1d911.jpg'

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    const [postType, setPostType] = useState('Discussion')
    const [typeMenuOpen, setTypeMenuOpen] = useState(false)
    const dropdownRef = useRef(null)
    const createRef = useRef(null)

    const postTypes = ['Discussion', 'Tip', 'Question']

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
            if (createRef.current && !createRef.current.contains(e.target)) {
                setCreateOpen(false)
                setTypeMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className="navbar">
            <div className="logo">Goldbytes</div>
            <form className="search-form">
                <input type="text" placeholder="Search anything" className='search' />
            </form>
            <div className="profile">
                <div className="create-wrapper" ref={createRef}>
                    <button className="create-button" onClick={() => setCreateOpen(prev => !prev)}>
                        <i className="fi fi-rr-square-plus"></i>
                        Create
                    </button>
                    {createOpen && (
                        <>
                        <div className="overlay" onClick={() => setCreateOpen(false)} />
                        <div className="create-menu">
                            
                            <h2>Create New Post</h2>
                            <div className="type-selector">
                                <button
                                    className="type-trigger"
                                    onClick={() => setTypeMenuOpen(prev => !prev)}
                                >
                                    <i className={`fi ${
                                        postType === 'Discussion' ? 'fi-rr-comments' :
                                        postType === 'Tip' ? 'fi-rr-lightbulb' :
                                        'fi-rr-interrogation'
                                    }`}></i>
                                    {postType}
                                    <i className={`fi fi-rr-angle-small-down type-arrow ${typeMenuOpen ? 'open' : ''}`}></i>
                                </button>
                                {typeMenuOpen && (
                                    <div className="type-menu">
                                        {postTypes.map(type => (
                                            <button
                                                key={type}
                                                className={`type-item ${postType === type ? 'active' : ''}`}
                                                onClick={() => {
                                                    setPostType(type)
                                                    setTypeMenuOpen(false)
                                                }}
                                            >
                                                <i className={`fi ${
                                                    type === 'Discussion' ? 'fi-rr-comments' :
                                                    type === 'Tip' ? 'fi-rr-lightbulb' :
                                                    'fi-rr-interrogation'
                                                }`}></i>
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="create-scroll">
                                <input type="text" placeholder="Title" className="create-input" />
                                <textarea placeholder="Description" className="create-textarea1"></textarea>
                                <textarea placeholder="Put your code, config..." className="create-textarea"></textarea>
                                <button className="create-submit">Submit</button>
                            </div>
                        </div>
                    </>)}
                </div>

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