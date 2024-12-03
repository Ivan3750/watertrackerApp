import "@/app/styles/profile.css";
import Input from '../Input';

const ProfileApp =()=> (
  <div id='profile'>
    <div id='profile-top'>
      <div id='back'/>
      <div id='header'>My Profile</div>
      <div id='edit'/>
    </div>
    <div id='profile-content'>
      <div id='profile'/>
      <Input type='text' desc='Username'/>
      <Input type='email' desc='Email Adress'/>
      <Input type='number' desc='Age'/>
      <button id='profile-update'>Update</button>
    </div>
  </div>
);
export default ProfileApp;