import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  console.log(byDateDesc)

  const nextCard = () => {
    if (data) {  /* utilisation de data pour accéder aux evenements si data n'etais pas definit pas de données affiché donc la fonction ne pourra rien faire */ 
      setTimeout (
       () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
      5000
      );
    }
  }; 

  useEffect(() => 
  {  
    if(byDateDesc){
      nextCard();
    }
  }); 

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            /* key={event.date}    titre des evenement sont garantis uniques utilisation pour la clef */ 
            key={`SlideCard${event.title}`}

            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((elem, radioIdx) => (
            <input
              key={`SlideCardRadio${elem.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly="readOnly"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

