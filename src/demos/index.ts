import { lazy } from 'react';

const CafeDemo = lazy(() => import('./CafeDemo'));
const RestaurantDemo = lazy(() => import('./RestaurantDemo'));
const SalonDemo = lazy(() => import('./SalonDemo'));
const GymDemo = lazy(() => import('./GymDemo'));
const DentalDemo = lazy(() => import('./DentalDemo'));

export const demos = [
  { path: '/demo/cafe', Component: CafeDemo },
  { path: '/demo/restaurant', Component: RestaurantDemo },
  { path: '/demo/salon', Component: SalonDemo },
  { path: '/demo/gym', Component: GymDemo },
  { path: '/demo/dental', Component: DentalDemo },
];
