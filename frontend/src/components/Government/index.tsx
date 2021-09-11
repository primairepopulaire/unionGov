import { FunctionComponent, memo } from 'react';
import Item, { Props as ItemProps } from '../../containers/GovernmentItem';

export type Props = {
  items?: ItemProps[];
};

const EMPTY_ITEMS: NonNullable<Props['items']> = [];

/** @TODO handle loading state (placeholders would be great) */
const Government: FunctionComponent<Props> = memo(({ items = EMPTY_ITEMS }) => (
  <div className="row mt-4">
    <div className="col-md-8 col-sm-10 mx-auto p-0">
      <div className="card px-3">
        <ul className="list-group list-group-flush border-top-0">
          {items.map((item, index) => (
            <Item key={`governement-item-${index}`} {...item} />
          ))}
        </ul>
      </div>
    </div>
  </div>
));
Government.displayName = 'Government';

export default Government;
