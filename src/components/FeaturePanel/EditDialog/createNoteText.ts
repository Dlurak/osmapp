import { Feature, FeatureTags } from '../../../services/types';
import { getFullOsmappLink, getUrlOsmId } from '../../../services/helpers';

export const createNoteText = (
  feature: Feature,
  newTags: FeatureTags,
  placeCancelled: boolean,
  location: string,
  note: string,
  isUndelete: boolean,
) => {
  const isAdded = ([k, v]) => v && !feature.tags[k];
  const isRemoved = ([k, v]) => v && !newTags[k];
  const addedTags = Object.entries(newTags).filter(isAdded);
  const removedTags = Object.entries(feature.tags).filter(isRemoved);
  const changedTags = Object.entries(newTags).filter(
    ([k, v]) => !isAdded([k, v]) && v && v !== feature.tags[k],
  );
  const changeOrAddedTags = [...addedTags, ...changedTags];

  if (
    !changeOrAddedTags.length &&
    !removedTags.length &&
    !placeCancelled &&
    !location &&
    !note &&
    !isUndelete
  ) {
    return null;
  }

  const noteText = [];
  if (!feature.point) {
    noteText.push(getUrlOsmId(feature.osmMeta));
  }
  if (isUndelete) {
    noteText.push('! Suggested undelete');
  }
  if (placeCancelled) {
    noteText.push('! Place was marked permanently closed.');
  }
  if (note) {
    noteText.push('');
    noteText.push(note);
  }
  if (location) {
    noteText.push('');
    noteText.push('Suggested location change:');
    noteText.push(location);
  }
  if (changeOrAddedTags.length) {
    noteText.push('');
    noteText.push('Suggested changes:');
    noteText.push(changeOrAddedTags.map(([k, v]) => `${k}=${v}`).join('\n'));
  }
  if (removedTags.length) {
    noteText.push('');
    noteText.push(`Removed tags:`);
    noteText.push(removedTags.map(([k]) => k).join(', '));
  }
  noteText.push('\n');
  noteText.push(`Submitted from ${getFullOsmappLink(feature)}`);
  return noteText.join('\n');
};
