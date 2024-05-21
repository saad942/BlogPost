import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle   ,faMobileAlt  } from '@fortawesome/free-solid-svg-icons';
import './front.css'

export default function Front(){
    return(<div>
       <div className="blog">
        <div className="text">
            <h3>Une messagerie sécurisée, intelligente et facile à utiliser</h3>
            <p>Gagnez en efficacité avec Marsoul, qui intègre désormais, Marsoul Meet et d'autres outils.</p>
            <button>Créer un compte</button>

        </div>
        <div className="img"> 
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

       <div>c</div>
        
    </div>)
}