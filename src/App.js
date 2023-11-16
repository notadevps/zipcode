import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";
import { MdClear } from 'react-icons/md'
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import Card from './Card';
import { useSnackbar } from 'notistack';

const STATE = {
  ENTER: 0, 
  LOADING: 1, 
  RESULT: 2,
  ERROR: 3,
}

function App() {
  const [state, setState] = useState({ state: STATE.ENTER, message: '' });
  const [zipCode, setZipCode] = useState('');

  const [placeInfo, setPlaceInfo] = useState();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    console.log(state);
  }, [state]);

  const search = async () => {
    if (zipCode.length > 10) {
      return enqueueSnackbar('Zip code should not exceed 10 digits', { autoHideDuration: '5s', variant: 'error' } );
    }

    if (zipCode.length < 4) {
      return enqueueSnackbar('Zip code should at least be 4 digits', { autoHideDuration: '5s', variant: 'error' });
    }
    setState({ state: STATE.LOADING, message: ''});
    try {
      let req = await fetch('https://api.zippopotam.us/in/' + zipCode);
      let res = await req.json(); 

      if (req.status === 200) {
        setPlaceInfo(res);
        setState({state: STATE.RESULT, message: ''})
      } else if (req.status === 404) {
        setState({ state: STATE.ERROR, message: 'No places found!' })
      } else {
        setState({ state: STATE.ERROR, message: req.statusText && req.statusText.length > 5 ? req.statusText : 'Error occured!' })
      }
    } catch (e)  {
      setState({ state: STATE.ERROR, message: 'Invalid Zip Code' });
    }
  }

  const enterZipcode = (e) => {
    if (!isNaN(e.target.value)) {
      setZipCode(e.target.value)
    } 
  }


  return (
    <AppStyle>
      <div className='zipContainer'>
        <div className='zipInput' style={state.state === STATE.ERROR ? { borderBottom: '1px solid red'}: null}>
            {zipCode.length > 0 ? <MdClear onClick={(e) => {
              setZipCode(''); 
              setState({ state: STATE.ENTER, message: '' });
            }} style={{ paddingRight: '1rem', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer' }} /> : null}
            <input type='text' placeholder='Enter Zipcode' value={zipCode} onChange={(e) => enterZipcode(e)} />
            <CiSearch onClick={search} style={{ cursor: 'pointer' }}/>
        </div>

        {state.state === STATE.LOADING ? 
          <div className='center'>  
            <Oval
              height={80}
              width={80}
              color="rgba(255, 255, 255, 0.6)"
              visible={true}
              secondaryColor="rgba(255, 255, 255, 0.8)"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        : null}

        {state.state === STATE.RESULT ? 
          <div className='zipResult'>
            <Card post={placeInfo} />
          </div>
        : null}

        {state.state === STATE.ENTER ? 
          <div className='center'>
            <span>To know more about zip codes <a href='https://en.wikipedia.org/wiki/ZIP_Code'>Click Here</a></span>
          </div>
        : null}

        {state.state === STATE.ERROR ? 
          <div className='center'>
            <span style={{ color: 'red'}}>{state.message}</span>
          </div>
        : null}


        
      </div>
    </AppStyle>
  );
}

export default App;

const AppStyle = styled.div`
  .zipContainer {
    background-color: #1E1E1E;
    width: 100%;
    color: white;
    height: 100vh;
    padding: 1rem;
    display: flex; 
    flex-direction: column;
    align-items: center; 
    box-sizing: border-box;
  }  

  .zipInput {
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: flex-end;  
    font-size: 1.3rem;
    border-bottom: 1px solid #0398FC;
    padding: 0.5rem 0rem; 
    width: 80%;
    box-sizing: border-box;
  }

  input {
    border: none;
    outline: none; 
    font-size: 1.2rem;
    width: 100%;
    color: white;
    background-color: transparent;
  }

  a {
    color: #0398FC;
  }

  .zipInput {
    display: flex; 
    flex-direction: row; 
  }
  .center {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 80%;
  }

  .zipResult {
    width: 80%; 
  }
`;
