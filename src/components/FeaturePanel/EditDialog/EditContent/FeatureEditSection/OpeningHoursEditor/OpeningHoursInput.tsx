import { useEditDialogContext } from '../../../../helpers/EditDialogContext';
import { TextField } from '@mui/material';
import { t, Translation } from '../../../../../../services/intl';
import { encodeUrl } from '../../../../../../helpers/utils';
import React from 'react';
import { useFeatureEditData } from '../SingleFeatureEditContext';

const CantEditText = () => {
  const { tags } = useFeatureEditData();
  const url = encodeUrl`https://projets.pavie.info/yohours/?oh=${tags['opening_hours']}`;

  return (
    <Translation
      id="opening_hours.editor.cant_edit_here"
      tags={{
        link: `a href="${url}" target="_blank"`,
      }}
    />
  );
};

export const OpeningHoursInput = ({ cantEdit }: { cantEdit?: boolean }) => {
  const { focusTag } = useEditDialogContext();
  const { tags, setTag } = useFeatureEditData();

  return (
    <TextField
      label={t('tags.opening_hours')}
      value={tags.opening_hours ?? ''}
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      margin="normal"
      onChange={(e) => setTag('opening_hours', e.target.value)}
      fullWidth
      autoFocus={focusTag === 'opening_hours'}
      helperText={cantEdit ? <CantEditText /> : undefined}
    />
  );
};
