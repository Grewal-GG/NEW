import PageWrapper from '../../components/layout/PageWrapper';
import ConverterTemplate from '../../components/calculator/ConverterTemplate';
import { VOLUME } from '../../utils/converters';

export default function VolumeConverter() {
  return <PageWrapper><ConverterTemplate table={VOLUME} title="Volume Converter" description="Convert between liters, gallons, cups and more." /></PageWrapper>;
}
