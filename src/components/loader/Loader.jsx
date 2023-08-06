import loader from '../../img/loader.gif';
import ReactDOM  from 'react-dom';
import './Loader.scss';

const Loader = () => {
  return ReactDOM.createPortal  (
    <div className='wrapper'>
        <div className='loader'>
            <img src={loader} alt="loading..." />
        </div>
    </div>,

    document.getElementById('loader')
  )
}

export default Loader;
