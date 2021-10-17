import { Typography } from '@material-ui/core';
import { FunctionComponent } from 'react';
import { EmptyRecord } from '../types';

const About: FunctionComponent<EmptyRecord> = () => {
  return <div className="container mt-4 p-0">
    <Typography variant="body1" className="" color="textSecondary">
      Ce site propose d&apos;explorer sur un mode heuristique
    les possibilités de coalition au sein des institutions actuelles -
    en attendant de les renouveler !

  Pour des raisons d&apos;ergonomie, nous ne pouvons proposer qu&apos;un nombre
  réduit de ministères - ce qui exclut la constitution d&apos;un gouvernement &quot;complet&quot;.

  Pour un vrai changement, soutenez la <a href="https://primairepopulaire.fr">Primaire Populaire !</a>
  </Typography></div>
}

export default About;
