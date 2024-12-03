import '@/app/styles/Input.css';
const Input =({desc,type})=>(<div className='input-wrap'>
  <h3 className='input-desc'>{desc}</h3>
  <input className='input-setting' type={type}/>
</div>);
export default Input;