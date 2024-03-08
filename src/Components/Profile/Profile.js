import { useState } from 'react';
import './Profile.css';

const Profile = ({ isPrrofileOpen, toggleModal, user, loadUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age || '00');
  const [email, setEmail] = useState(user.email);

  const onFormChange = (event) => {
    switch(event.target.name) {
      case 'user-name':
        setName(event.target.value);
        break;
      case 'user-email':
        setEmail(event.target.value);
        break;
      case 'user-age':
        setAge(event.target.value);
        break;
      default:
        return;
    }
  }
  const onUpdateProfile = (data) => {
    fetch(`http://3.83.96.106:443/profile/${user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({formInput: data})
    })
    .then(response => {
      if(response.status === 200 || response.status === 304) {
        toggleModal();
        loadUser({...user, ...data});
      }
    })
    .catch(err => console.log('error updating user'))

  }
    return (
       <div className="profile-modal">
         <div className='box'>
          <div className='modal-close' onClick={toggleModal}>&times;</div>
         <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
              className="br-100 ba h3 w3 dib" alt="profile" />
            <h1 className='user_name'>{name.toUpperCase()}</h1>
            <div className='joined_date'>joined at: <span>{new Date(user.joined).toLocaleDateString()}</span></div>
            <hr/>
            <div>
              
            </div>
            <div>
              <div>
                <div className='label_info'>Name:</div>
                <input className='profile_input' 
                       type='text'
                       name='user-name' value={name.toUpperCase()} 
                       onChange={(ev) => onFormChange(ev)}/>
              </div>
             {/* { <div>
                <div className='label_info'>Age:</div>
                <input className='profile_input'
                       type='number' 
                       name='user-age' 
                       value={age}
                       onChange={(ev) => onFormChange(ev)}/>
              </div>} */}
              <div>
                <div className='label_info'>Email:</div>
                <input className='profile_input'
                       type='email' 
                       name='user-email' 
                       value={email}
                       onChange={(ev) => onFormChange(ev)}/>
              </div>
            </div>
            <div className='mybtns'>
              <button className='mybtn btn-save' onClick={() => {onUpdateProfile({name,email,age})}}>Save</button>
              <button className='mybtn btn-cancel' onClick={toggleModal}>Cancel</button>
            </div>
         </div>
       </div>
    )
}
export default Profile;