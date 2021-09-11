import { Typography } from '@material-ui/core';
import { FunctionComponent, memo } from 'react';
import Item, { Props as ItemProps } from '../../containers/GovernmentItem';
import ShareButton from '../../containers/ShareButton';

export type Props = {
  items?: ItemProps[];
};

const EMPTY_ITEMS: NonNullable<Props['items']> = [];

/** @TODO handle loading state (placeholders would be great) */
const Government: FunctionComponent<Props> = memo(({ items = EMPTY_ITEMS }) => (
  <div className="container mt-4 p-0">
    <Typography variant="body1" className="flex-fill text-center pb-4" color="textSecondary">
      Compose ton gouvernement et fais le tourner sur les réseaux pour soutenir la cause !
    </Typography>
    <div className="row col-md-8 col-sm-10 mx-auto p-0">
      <div className="card px-3">
        <ul className="list-group list-group-flush border-top-0">
          {items.map((item, index) => (
            <Item key={`governement-item-${index}`} {...item} />
          ))}
        </ul>
      </div>
    </div>
    <div className="row align-items-center justify-content-center mt-4">
      <ShareButton />
    </div>
  </div>
));
Government.displayName = 'Government';

export default Government;
