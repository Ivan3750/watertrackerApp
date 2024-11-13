import './../../styles/profile.css'; // Даня ти можеш використовувати "@/app/style/profile.css" @ - корень
import Input from './Input';
const profilePage =()=> (
  <div id='profile'>
    <div id='profile-top'>
      <div id='back'/>
      <div id='header'>My Profile</div>
      <div id='edit'/>
    </div>
    <div id='profile-content'>
      <div id='profile'/>
      <Input type='text' desc='First Name'/>
      <Input type='text' desc='Last Name'/>
      <Input type='email' desc='Email Adress'/>
      <Input type='number' desc='Age'/>
      <button id='profile-update'>Update</button>
    </div>
  </div>
);
export default profilePage;