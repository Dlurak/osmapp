import React from 'react';
import { Bolt } from './Points/Bolt';
import { Piton } from './Points/Piton';
import { Point } from './Points/Point';
import { PulsedPoint } from './Points/PulsedPoint';
import { Sling } from './Points/Sling';
import { useClimbingContext } from '../contexts/ClimbingContext';
import { Anchor } from './Points/Anchor';
import { ClimbingRoute } from '../types';
import { UnfinishedPoint } from './Points/UnfinishedPoint';

type Props = {
  route: ClimbingRoute;
  routeNumber: number;
  onPointInSelectedRouteClick: (event: React.MouseEvent<any>) => void;
};

export const RouteMarks = ({
  route,
  routeNumber,
  onPointInSelectedRouteClick,
}: Props) => {
  const {
    getPixelPosition,
    isPointSelected,
    getMachine,
    getPathForRoute,
    isRouteSelected,
    pointElement,
    isPointMoving,
    setPointElement,
    setPointSelectedIndex,
    setIsPointMoving,
    setIsPointClicked,
    isOtherRouteSelected,
  } = useClimbingContext();
  const isSelected = isRouteSelected(routeNumber);
  const isOtherSelected = isOtherRouteSelected(routeNumber);
  return (
    <>
      {getPathForRoute(route).map(({ x, y, type }, index) => {
        const handleClick = (e: any) => {
          // @TODO unify with Point.tsx
          if (!isPointMoving) {
            setPointSelectedIndex(null);
            onPointInSelectedRouteClick(e);
            setPointElement(pointElement !== null ? null : e.currentTarget);
            setPointSelectedIndex(index);
            setIsPointMoving(false);
            setIsPointClicked(false);
            e.stopPropagation();
            e.preventDefault();
          }
        };

        const isBoltVisible = !isOtherSelected && type === 'bolt';
        const isAnchorVisible = !isOtherSelected && type === 'anchor';
        const isSlingVisible = !isOtherSelected && type === 'sling';
        const isPitonVisible = !isOtherSelected && type === 'piton';
        const isUnfinishedPointVisible =
          !isOtherSelected && type === 'unfinished';

        const position = getPixelPosition({ x, y, units: 'percentage' });
        const isActualPointSelected = isSelected && isPointSelected(index);
        const pointerEvents = isSelected ? 'auto' : 'none';
        const machine = getMachine();
        const isThisRouteEditOrExtendMode =
          (machine.currentStateName === 'extendRoute' ||
            machine.currentStateName === 'pointMenu' ||
            machine.currentStateName === 'editRoute') &&
          isSelected;

        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`${routeNumber}-${index}-${x}-${y}`}>
            {isThisRouteEditOrExtendMode && <PulsedPoint x={x} y={y} />}
            {isBoltVisible && (
              <Bolt
                x={position.x}
                y={position.y}
                isPointSelected={isActualPointSelected}
                pointerEvents={pointerEvents}
                onClick={handleClick}
              />
            )}
            {isPitonVisible && (
              <Piton
                x={position.x}
                y={position.y}
                isPointSelected={isActualPointSelected}
                pointerEvents={pointerEvents}
                onClick={handleClick}
              />
            )}
            {isSlingVisible && (
              <Sling
                x={position.x}
                y={position.y}
                isPointSelected={isActualPointSelected}
                pointerEvents={pointerEvents}
                onClick={handleClick}
              />
            )}
            {isAnchorVisible && (
              <Anchor
                x={position.x}
                y={position.y}
                isPointSelected={isActualPointSelected}
                pointerEvents={pointerEvents}
                onClick={handleClick}
              />
            )}
            {isUnfinishedPointVisible && (
              <UnfinishedPoint
                x={position.x}
                y={position.y}
                isPointSelected={isActualPointSelected}
                pointerEvents={pointerEvents}
                onClick={handleClick}
              />
            )}
            {isThisRouteEditOrExtendMode && (
              <Point
                x={position.x}
                y={position.y}
                type={type}
                onPointInSelectedRouteClick={onPointInSelectedRouteClick}
                index={index}
                routeNumber={routeNumber}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
