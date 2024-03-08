import { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    
    const handleSignOut = () => {
      if (window.sessionStorage.getItem('token')) {
        fetch('http://3.83.96.106:443/signout', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
           }
        })
        .then(res => res.json())
        .then (res => {
          if(res.success) {
            window.sessionStorage.removeItem('token')
            onRouteChange('signout')
          }
        })
        .catch(console.log)
      } else {
        return onRouteChange('signout')
      }
    }
       
    return( 
        <div className="pa4 tc">
           <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            >
            <DropdownToggle
                aria-expanded
                data-toggle="dropdown"
                tag="span"
            >
                <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                    className="br-100 ba h3 w3 dib pointer" alt="profile" />
            </DropdownToggle>
            <DropdownMenu
              className="b--transparent shadow-5" 
              style={{ marginTop: '20px',backgroundColor: "rgba(255, 255, 255, 0.5"}}>
                <DropdownItem  onClick={toggleModal}>
                  View Profile
                </DropdownItem >
                <DropdownItem  onClick={handleSignOut}>
                  Sign Out
                </DropdownItem >
            </DropdownMenu>
        </Dropdown>     
    </div>     
    )
}

export default ProfileIcon;