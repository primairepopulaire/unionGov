import { FunctionComponent, memo } from 'react';
import { EmptyRecord } from '../../types';

const About: FunctionComponent<EmptyRecord> = memo(() => (
    <div className="about">
      <p>
        Ce site est un projet parallèle à la
        <a href="https://primairepopulaire.fr/">Primaire Populaire</a>. Sur le
        site principal vous pouvez voir la démarche du projet en détail.
      </p>

      <p>
        <a href="http://mariecasays.com/">Marie Casaÿs</a> a réalisé les
        illustrations des candidats.
      </p>
    </div>
));
About.displayName = 'About';

export default About;
