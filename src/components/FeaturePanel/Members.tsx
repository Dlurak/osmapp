import Link from 'next/link';
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { getUrlOsmId } from '../../services/helpers';
import { useFeatureContext } from '../utils/FeatureContext';

export const Members = () => {
  const {
    feature: { members },
  } = useFeatureContext();

  return members?.length ? (
    <Box mt={4}>
      <Typography variant="overline" display="block" color="textSecondary">
        Relation members
      </Typography>
      <ul>
        {members
          .filter((item) => item.role)
          .map((item) => {
            const urlOsmId = getUrlOsmId({ type: item.type, id: item.ref });
            return (
              <li>
                <Link href={`/${urlOsmId}`}>
                  {`${item.role} – ${urlOsmId}`}
                </Link>
              </li>
            );
          })}
      </ul>
    </Box>
  ) : null;
};
