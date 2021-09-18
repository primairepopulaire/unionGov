import { FunctionComponent, memo, useCallback } from 'react';
import Select, { defaultTheme } from 'react-select';
import handleError from '../../lib/error';
import { Candidate } from '../../redux/Candidates/state';
import theme from '../../theme';

type Option = {
  id: Candidate['id'];
  label: string;
  isDisabled: boolean;
}

export type Props = {
  current?: Option;
  options?: Option[];
  onChange: (newCandidateId: Option['id']) => void;
};

const selectTheme: typeof defaultTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary25: theme.palette.secondary.main,
    primary: theme.palette.primary.main
  }
};

const isOptionDisabled: Select<Option>['props']['isOptionDisabled'] = ({
  isDisabled
}) => isDisabled;

const CandidateSelect: FunctionComponent<Props> = memo(({ current, options, onChange }) => {
  const handleChange = useCallback<NonNullable<Select<Option>['props']['onChange']>>((event) => {
    if (!event?.id) {
      handleError({
        error: new Error('Select change return falsy id value'),
        context: { event: event, eventId: event?.id }
      })
    }
    event?.id && onChange(event.id);
  }, [onChange])

  return (
    <Select<Option>
      placeholder="Choisis..."
      options={options}
      onChange={handleChange}
      isOptionDisabled={isOptionDisabled}
      value={current || undefined}
      controlShouldRenderValue={!!current}
      theme={selectTheme}
      isSearchable={true}
    />
  );
});
CandidateSelect.displayName = 'CandidateSelect';

export default CandidateSelect;
