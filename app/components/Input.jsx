import '@/app/styles/Input.css';
const Input =({desc,type, value, onChange})=>(<div className='input-wrap'>
  <h3 className='input-desc'>{desc}</h3>
  <input className='input-setting' type={type} value={value} onChange={(e)=>{ onChange(e.target.value)}}/>
</div>);
export default Input;