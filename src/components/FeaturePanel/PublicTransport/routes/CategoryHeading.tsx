import React from 'react';
import { t } from '../../../../services/intl';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  MoreHoriz,
  Search,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

// TODO: Do this using the id-tagging-presets
const fmtCategory = (category: string) => {
  switch (category) {
    case 'tourism':
      return t('publictransport.tourism');
    case 'night':
      return t('publictransport.night');
    case 'car_shuttle':
      return t('publictransport.car_shuttle');
    case 'car':
      return t('publictransport.car');
    case 'commuter':
      return t('publictransport.commuter');
    case 'regional':
      return t('publictransport.regional');
    case 'long_distance':
      return t('publictransport.long_distance');
    case 'high_speed':
      return t('publictransport.high_speed');
    case 'bus':
      return t('publictransport.bus');
    case 'subway':
      return t('publictransport.subway');
    case 'unknown':
      return t('publictransport.unknown');
    default:
      return category;
  }
};

const ToggleCategory = ({
  shown,
  onClick,
}: {
  shown: boolean;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}) => (
  <MenuItem onClick={onClick}>
    <ListItemIcon>
      {shown && <VisibilityOff fontSize="small" />}
      {!shown && <Visibility fontSize="small" />}
    </ListItemIcon>
    <ListItemText>{shown ? 'Hide' : 'Show'} this category</ListItemText>
  </MenuItem>
);

type Props = {
  category: string;
  onShow: () => void;
  onHide: () => void;
  onExclusiveShow: () => void;
  shown?: boolean;
};

export const CategoryHeading = ({
  category,
  onShow,
  onHide,
  onExclusiveShow,
  shown = true,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLButtonElement>(
    null,
  );

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <h4>{fmtCategory(category)}</h4>
        <IconButton
          onClick={({ currentTarget }) => {
            setAnchorEl(currentTarget);
          }}
        >
          <MoreHoriz />
        </IconButton>
      </Stack>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <ToggleCategory
          shown={shown}
          onClick={() => {
            if (shown) {
              onHide();
            } else {
              onShow();
            }
            setAnchorEl(null);
          }}
        />
        <MenuItem
          onClick={() => {
            onExclusiveShow();
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <Search fontSize="small" />
          </ListItemIcon>
          <ListItemText>Show only this category</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
