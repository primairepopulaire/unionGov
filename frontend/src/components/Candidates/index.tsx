import { FunctionComponent, memo } from 'react';
import Item, { Props as _ItemProps } from '../CandidateItem';

export type ItemProps = _ItemProps;

type Props = {
  candidates?: _ItemProps[];
}

const EMPTY_CANDIDATES: NonNullable<Props['candidates']> = []

/** @TODO handle placeholder / loading states */
const Candidates: FunctionComponent<Props> = memo(({
  candidates = EMPTY_CANDIDATES
}) => (
    <div className="row">
      <div className="col-md-6 col-sm-10 mx-auto p-0">
        <div className="card p-3">
          <ul className="list-group list-group-flush border-top-0">{candidates.map((item, index) => <Item key={`candidates-item-${index}`} {...item} />)}</ul>
        </div>
      </div>
    </div>
));
Candidates.displayName = 'Candidates';

export default Candidates;
