import 'react'


import heroLogo from "./assets/blue/Images/header-image-b.png"


import 'flexboxgrid/css/flexboxgrid.min.css';
import './App.css'
import { Discord } from './Discord';
import { Schedule } from './Schedule';

function App() {

  return (
    <>
    <div className='page'>
      <div className='row'>
        <div className='col hero'>
          <img src={heroLogo} className="logo" alt="SaikoCTF logo" />
        </div>
      </div>
      <div className='row content'>
        <div className='col col-xs-12 col-sm-3 prizebar last-xs first-sm'>
          <Schedule date_start={import.meta.env.VITE_CTF_DATE_START} date_end={import.meta.env.VITE_CTF_DATE_END}/>
          <div>
            <div className='award title'>$100</div>
            <div className='place-sm'><span>per participant who completes all surveys and CTF challenges (earnest attempt, no flag required)</span></div>
          </div>
          <hr/>
          <div>
            <div className='award title'>$10</div>
            <div className='place-sm'><span>additional per participant per flag captured (up to $100 for 10 flags)</span></div>
          </div>
          <hr/>
          <div>
            <div className='place'>1st Place Bonus</div>
            <div className='award title'>$350</div>
          </div>
          <hr/>
          <div>
            <div className='place'>2nd Place Bonus</div>
            <div className='award title'>$300</div>
          </div>
          <hr/>
          <div>
            <div className='place'>3rd Place Bonus</div>
            <div className='award title'>$250</div>
          </div>
          <hr/>
          <div>
            <div className="place-sm">Compensation can only be paid to
              participants who are not located in
              Cuba, North Korea, Iran, or Syria.
            </div>
          </div>
          
        </div>
        <div className='col col-xs-12 col-sm-9 details'>
          <div>
            <h2>Join us for a thrilling 2-day SaikoCTF Online Capture the Flag (CTF).</h2>

            <p>Do you like CTFs? Are you interested in combining offensive cybersecurity expertise and cutting edge-research? Are you an intermediate to advanced CTF player? Then SaikoCTF is for you!</p>

            <h3>Win up to $550!</h3>

            <p>SaikoCTF has been successfully played at HITB in Bangkok, ECSC in Turin, and Ekoparty in Buenos Aires and is now online.</p>

            <p>We are a group of researchers running SaikoCTF and collecting data to study cyber defenses. The challenges in this CTF involve host-based and web-based vulnerability discovery and exploitation without involving advanced cryptography or binary reverse engineering and exploitation. You will work in a virtualized environment with the aid of a Kali Linux penetration testing suite.</p>

            <p>Your privacy is our utmost priority. We will not collect personally identifiable information, such as your name, social media, or hacker handle. Instead, you will be randomly assigned a unique SaikoCTF handle during registration to protect your identity and to be used in the leaderboard. You only need a Discord account to join SaikoCTF.</p>

            <p>SaikoCTF is a timed challenge. There will be 10 unique challenges each accompanied by 5-minute surveys. Each challenge is limited to 1 hour. An automated scoring and publicized leaderboard ranks participants by flags captured and total solve time. Scores will be posted using the SaikoCTF handles only.</p>

            <p>Participation requirements: Must be at least 18 years old, be an experienced offensive CTF player, and understand written instructions in English.</p>
          </div>
          <Discord className='registration title' 
            prereg_date_start={import.meta.env.VITE_CTF_PREREG_DATE} 
            prereg_date_end={import.meta.env.VITE_CTF_DATE_START}
            href={import.meta.env.VITE_REGISTER_URL} label={import.meta.env.VITE_REGISTER_LABEL}/>
        </div>
      </div>
      <div className='row credits'>
        <div className='col col-xs-12'>
            <a href="http://www.onlinewebfonts.com" target="_blank">Font Credits</a>
            
        </div>
      </div>
    </div>

    </>
  )
}

export default App
