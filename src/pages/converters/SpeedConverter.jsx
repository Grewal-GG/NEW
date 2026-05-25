import PageWrapper from '../../components/layout/PageWrapper';
import ConverterTemplate from '../../components/calculator/ConverterTemplate';
import { SPEED } from '../../utils/converters';

export default function SpeedConverter() {
  return <PageWrapper><ConverterTemplate table={SPEED} title="Speed Converter" description="Convert between mph, kph, m/s, knots and more." /></PageWrapper>;
}
