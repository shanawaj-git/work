/**
 * Exposing Modules to the global scope, therefore can be accessible by a
 * named module in react app from the root of the library
 */

// Global CSS
import 'tailwind.css';
import 'react-spring-bottom-sheet/dist/style.css';
import { colorSelector } from './themes';

export { default as Button } from 'atoms/Button';
export { default as Typography } from 'atoms/Typography';
export { TypographyType } from 'atoms/Typography';
export { default as HeroSection } from 'molecules/HeroSection';
export { default as Input } from 'molecules/Input';
export { default as SwipeableDrawer } from 'organisms/SwipeableDrawer';
export { default as MedicineCard } from 'domains/health/MedicineCard';
export { default as Tabs } from 'organisms/Tabs';
export { default as Carousel } from 'organisms/Carousel';
export { default as Spinner } from 'atoms/Spinner';
export { default as MapWrapper } from 'organisms/MapWrapper';
export { default as Map } from 'organisms/Map';
export { default as Marker } from 'atoms/Marker';
export { default as Article } from 'organisms/Article';
export { default as ImageCardWithCta } from 'molecules/ImageCardWithCta';
export { default as useScript } from './utils/hook/useScript';
export {
  default as HorizontalScrollMenu,
} from 'organisms/HorizontalScrollMenu';
export { GlobalTheme } from './utils/globalTheme';
export { ThemeProvider } from 'styled-components';

export { default as BottomSheet, BottomSheetRef } from 'organisms/BottomSheet';
export { default as TimePicker } from 'organisms/TimePicker';

export const utils = {
  colorSelector,
};
