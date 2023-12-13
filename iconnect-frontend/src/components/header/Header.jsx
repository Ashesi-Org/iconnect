/* eslint-disable react/prop-types */
import NavBar from "../navbar/Navbar"

const Header = ({ selectedLink, setSelectedLink, inbox, setInbox }) => {
  return (
    <div>
     <NavBar selectedLink={selectedLink} setSelectedLink={setSelectedLink} inbox={inbox} setInbox={setInbox} />
    </div>
  )
}

export default Header
