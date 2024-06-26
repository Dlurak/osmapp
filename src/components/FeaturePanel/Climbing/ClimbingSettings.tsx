import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Switch,
  Slider,
} from '@mui/material';
import { useClimbingContext } from './contexts/ClimbingContext';
import { GradeSystemSelect } from './GradeSystemSelect';

export const ClimbingSettings = ({ isSettingsOpened, setIsSettingsOpened }) => {
  const {
    areRoutesVisible,
    setAreRoutesVisible,
    setSelectedRouteSystem,
    selectedRouteSystem,
    isDifficultyHeatmapEnabled,
    setIsDifficultyHeatmapEnabled,
  } = useClimbingContext();

  return (
    <Dialog
      onClose={() => {
        setIsSettingsOpened(false);
      }}
      open={isSettingsOpened}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemText>Show difficulties as heatmap</ListItemText>
            <Switch
              color="primary"
              edge="end"
              onChange={(e) => {
                setIsDifficultyHeatmapEnabled(e.target.checked);
              }}
              checked={isDifficultyHeatmapEnabled}
            />
          </ListItem>
          <ListItem>
            <ListItemText>Show routes on photo</ListItemText>
            <Switch
              color="primary"
              edge="end"
              onChange={(e) => {
                setAreRoutesVisible(e.target.checked);
              }}
              checked={areRoutesVisible}
            />
          </ListItem>
          <ListItem>
            <ListItemText>Default grade system</ListItemText>
            <GradeSystemSelect
              setGradeSystem={setSelectedRouteSystem}
              selectedGradeSystem={selectedRouteSystem}
            />
          </ListItem>
          <ListItem>
            <ListItemText>Filter difficulty</ListItemText>
            <Slider
              value={[0, 1]}
              min={0}
              max={10}
              onChange={() => {}}
              valueLabelDisplay="auto"
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};
