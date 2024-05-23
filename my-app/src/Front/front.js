import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle   ,faMobileAlt  } from '@fortawesome/free-solid-svg-icons';
import './front.css'
import { useNavigate } from "react-router-dom";

export default function Front(){
    const navigate =useNavigate()
    return(<div>
       <div className="blog">
        <div className="text">
            <h3>Une messagerie sécurisée, intelligente et facile à utiliser</h3>
            <p>Gagnez en efficacité avec Marsoul, qui intègre désormais, Marsoul Meet et d'autres outils.</p>
            <button onClick={() => navigate('/regestry')} className="btn">Créer un compte</button>

        </div>
        <div > 
        <img src="./images/React App - Personnel – Microsoft​ Edge 20_05_2024 13_33_27.png" className="img"/>

        </div>
       </div><br/><br/><br/><br/><br/><br/>
       <div className='cont'>
        <div className="cmt">
        <FontAwesomeIcon icon={faCheck} className="icon" />
        <h3>Compatible avec d'autres outils</h3>
        <p>Marsoul fonctionne parfaitement bien avec des clients ,
             y compris pour la synchronisation des contacts et des événements.</p>
        

        </div>
        <div className="cmt">
        <FontAwesomeIcon icon={faTimesCircle} className="icon" />
        <h3>Soyez productif, même hors connexion</h3>
        <p>Avec Marsoul hors connexion, lisez ou supprimez vos messages Marsoul, répondez-y ou
             effectuez des recherches dedans sans être connecté à Internet.</p>

        </div>
        <div className="cmt">
        <FontAwesomeIcon icon={   faMobileAlt} className="icon"/>
        <h3>Utilisez Marsoul sur n'importe quel appareil</h3>
        <p>Profitez de la simplicité de Marsoul, où que vous soyez.</p>

        </div>

       </div>


       <div class="container">
    <div>
        <img src="./images/React App - Google Chrome 22_05_2024 16_25_55.png" alt="Dachbord" className="dachbord"/>
    </div>
    <div>
        <h3>Depuis toujours, Marsoul repose sur une stratégie de sécurité renforcée.</h3>
        <p>Nous mettons tout en œuvre pour vous protéger contre le spam, l'hameçonnage et les logiciels malveillants, avant même qu'ils n'atteignent votre boîte de réception. Nos fonctionnalités de filtrage du spam optimisées par l'IA bloquent près de 10 millions d'e-mails indésirables par minute.</p>
    </div>
</div>





       <div className='cont' style={{marginTop:'250px', marginBottom:'200px'}}>
        <div className="cmt" style={{marginLeft:'510px' }}>
        <h3 style={{fontSize:'40px'}}>Montrez au monde entier comment faire.</h3>
        <p style={{fontSize:'20px'}}>Marsoul est encore plus performant. Profitez-en !</p>
        <button onClick={() => navigate('/regestry')} className="btn">Créer un compte</button>


        </div>
     

       </div>

        
    </div>)
}