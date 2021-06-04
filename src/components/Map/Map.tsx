import React, { useEffect } from 'react';

import styled from 'styled-components';
import dynamic from 'next/dynamic';
import BugReport from '@material-ui/icons/BugReport';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useBoolState } from '../helpers';
import { MapFooter } from './MapFooter';
import { SHOW_PROTOTYPE_UI } from '../../config';
import { LayerSwitcherButton } from '../LayerSwitcher/LayerSwitcherButton';

const BrowserMap = dynamic(() => import('./BrowserMap'), {
  ssr: false,
  loading: () => <div />,
});

const LayerSwitcher = dynamic(() => import('../LayerSwitcher/LayerSwitcher'), {
  ssr: false,
  loading: () => <LayerSwitcherButton />,
});

const Spinner = styled(CircularProgress)`
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
`;

const BottomRight = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1000;
  text-align: right;
`;

const TopCenter = styled.div`
  position: absolute;
  top: 0;
  left: 48%;
  z-index: 1000;
  padding: 10px;
`;

const WhatIsOsmButton = () => (
  <Button variant="outlined">Co je OpenStreetMap?</Button>
);

const BugReportButton = () => (
  <Button size="small">
    <BugReport width="10" height="10" />
    Nahlásit chybu v mapě
  </Button>
);

const NoscriptMessage = () => (
  <noscript>
    <span style={{ position: 'absolute', left: '50%', top: '50%' }}>
      This map needs Javascript.
    </span>
  </noscript>
);

const Map = () => {
  const [mapLoaded, setLoaded, setNotLoaded] = useBoolState(true);

  useEffect(setNotLoaded, []);

  return (
    <>
      <BrowserMap onMapLoaded={setLoaded} />
      {!mapLoaded && <Spinner color="secondary" />}
      <NoscriptMessage />
      {SHOW_PROTOTYPE_UI && (
        <TopCenter>
          <WhatIsOsmButton />
        </TopCenter>
      )}
      {SHOW_PROTOTYPE_UI && <LayerSwitcher />}
      <BottomRight>
        {SHOW_PROTOTYPE_UI && <BugReportButton />}
        <MapFooter />
      </BottomRight>
    </>
  );
};

export default Map;
