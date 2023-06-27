import React, { useState } from 'react';
import './App.css'
import logo from "./Tree Logo.png";
import logo2 from "./Truck.gif";
import logo3 from "./CSVlogo1.png"

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [invalidEmails, setInvalidEmails] = useState([]);
  const [validEmails, setValidEmails] = useState([]);
  const [op,setOp]=useState(0);

  const handleFileUpload = (event) => {
    
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split('\n');

      const emails = lines.map((line) => line.trim());
      setCsvData(emails);
      filterEmails(emails);
    };
    setOp(100);
    reader.readAsText(file);
  };

  const filterEmails = (emails) => {
    const invalid = [];
    const valid = [];

    emails.forEach((email) => {
      if (isValidEmail(email)) {
        valid.push(email);
      } else {
        invalid.push(email);
      }
    });

    setInvalidEmails(invalid);
    setValidEmails(valid);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    return emailPattern.test(email);
  };
  const dispmessage=()=>{
    const size=validEmails.length;
    if(size===0)
    window.alert(`Please upload the CSV file!`);
    else
      window.alert(`Emails sent sucessfully to ${size} valid emails`);
  }
  return (
    <div>
      <div className='headerbar'>
      <h1 className='headertitle'>Mass-Mail Dispatcher</h1><sub><b>master the art of delivery!!</b></sub>
      <img src={logo2} alt="" className='truck'></img>
      </div>
      

      <div className='buttonimageform'>
      <div className='buttoncontainer'>
        <img src={logo3} alt="" className="csvlogo"></img>
      <input type="file" accept=".csv" onChange={handleFileUpload} className='acbutton'/>
      </div>
      <img src={logo} alt="" className='tree'/>
      
      <div class="form-box">
  <h2>Type you Email</h2>
  <form>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required/>
    </div>
    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject" required/>
    </div>
    <div class="form-group">
      <label for="body">Body</label>
      <textarea id="body" name="body" rows="5" required></textarea>
    </div>
    <button type="submit"onClick={dispmessage}>Send</button>
  </form>
</div>
</div>
<div className='emailsdiv'>
<div className='emailslistdiv' style={{opacity:op}}>
     <span> <h2 id='invalid'>Invalid Emails</h2></span>
     
      <ul>
        {invalidEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul></div>
      <div className='emailslistdiv' style={{opacity:op}}>
      <span><h2 id="valid">Valid Emails</h2></span>
      
      <ul>
        {validEmails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      </div>
      </div>
      </div>
    
  
  );
};

export default App;
