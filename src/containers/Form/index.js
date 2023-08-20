import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => 

  new Promise((resolve) => { 
    setTimeout(resolve(), 5000); 
  })

const Form = ({ onSuccess, onError }) => { 
  const [sending, setSending] = useState(false);
  const sendContact = useCallback( /* La fonction sendContact est définie à l'aide de useCallback. Elle est utilisée pour gérer l'envoi du formulaire lorsque celui-ci est soumis. Voici comment cela fonctionne : */
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(true); /* appel de la fonction CAUSE DE L'ERREUR */
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}; /* ajout point virgule */ 

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}; /* ajout point virgule */

export default Form;


/* e tri par date est bien par ordre décroissant ;
le slider envoie bien vers la slide suivante ;
le filtre par type d’évènement fonctionne ;
le helper getMonth renvoie le bon mois ;
la “callback” onSuccess est exécutée ;
la value last est bien implémentée pour que le bon évènement s’affiche dans le footer. */ 

/* Critères d’évaluation 
Débugger un site web grâce aux Chrome DevTools
Le code débuggé peut être validé si : 

❒ Tous les tests initialement implémentés sont valides :

When Event is created › and we select a category › a filtered list is displayed.
When an event card is created › a title, a label and a month are displayed.
When Slider is created › a list of cards is displayed.
When Form is created › and a click is triggered on the submit button › the success action is called.
When Form is created › and a click is triggered on the submit button › the success message is displayed.
❒ Aucune erreur n'est produite lors de l'utilisation du site.

❒ Le comportement de chaque composant est en adéquation avec les besoins du client.

❒ Les 6 bugs détaillés plus haut sont corrigés :

le tri par date est bien par ordre décroissant ;
le slider envoie bien vers la slide suivante ;
le filtre par type d’évènement fonctionne ;
le helper getMonth renvoie le bon mois ;
la “callback” onSuccess est exécuté */ 