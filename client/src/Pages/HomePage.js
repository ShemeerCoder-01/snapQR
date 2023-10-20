import React, { useContext, useEffect, useState } from 'react';
import QRReader from '@wypratama/react-qr';
import '@wypratama/react-qr/dist/style.css';
import { fetchDocs } from '../actions/FetchDocs';
import axios from 'axios'
import { userContext } from '../userContext';
import LoginPage from '../Components/Login/index';
import Cookies from 'js-cookie';

function HomePage() {
  const [reader, setReader] = useState(false);
  const [result, setResult] = useState('');
  const [prevDocs, setPrevDocs] = useState([]);
  const [token,setToken] = useState('');
  const { state } = useContext(userContext);

  // retrieing logged user email from session Storage
  let user = sessionStorage.getItem('user');

 
  useEffect(() => {
    //making api call to fetch previously scanned docs
    if(user !== null) fetchDocs(setPrevDocs,user);
   let currToken =  Cookies.get('accessToken'); // retrieving accesstoken from Cookie and storing in a 
   setToken(currToken);                         // state variable to disable and enable buttons according to that.
  }, [user,token]);


  const handleResult = (result) => {
    setResult(result); // storing scanned data to a state variable.
  };


  const handleClick = async () => {
    //db call and store the data in db using axios.
    let user = sessionStorage.getItem('user');
    const response = await axios.post('http://localhost:8001/qrcodes', { result,userEmail:user });
    console.log(response);
    window.location.href = result
  }


  return (
    <div className='wrapper'>
      {state.userState === true ? 
      <div>
        <LoginPage />
      </div> :
       <>
        {reader === true && result === '' && <QRReader onResult={handleResult} width='500px' height='500px' />}
        <div className='upload' style={{ display: reader === false ? 'flex' : 'none' }}>
          <button className='btn' onClick={() => setReader(true)}>
            Scan QR Code <span>+</span>
          </button>
        </div>
        {result  &&
        
          <>
            <p>Do you want to redirect to this Page : {result}</p>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
              <button className='btn' disabled={token=== '' ||user === null ?true:false} onClick={() => window.location.href = result}>Proceed without Saving</button>
              <button className='btn' disabled={token=== '' || user === null?true:false} onClick={handleClick}>Save and Proceed</button>
            </div>

          </>
        }

        <h3>Previously Scanned Documents : </h3>
        <div>
          {prevDocs.length === 0?
          (
            <div style={{ display: "flex", gap: "6px !important", alignItems: "center", justifyContent: "space-between" }}>
              <h3>No Items Found...</h3>
            </div>
          ):
          prevDocs.map((scanned, index) => {
            return (
              <div key={scanned.id} style={{ display: "flex", gap: "6px", alignItems: "center", justifyContent: "space-between" }}>
                <p>{index + 1}. </p>
                <p>  <strong>Url</strong> : {scanned.content}</p>
                <p> <strong>Date</strong> : {scanned.scandate}</p>
              </div>
            )
          })}
        </div>
      </>
      }
    </div>

  )
}

export default HomePage;