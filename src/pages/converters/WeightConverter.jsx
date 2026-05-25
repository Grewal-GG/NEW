import PageWrapper from '../../components/layout/PageWrapper';
import ConverterTemplate from '../../components/calculator/ConverterTemplate';
import { WEIGHT } from '../../utils/converters';

export default function WeightConverter() {
  return <PageWrapper><ConverterTemplate table={WEIGHT} title="Weight Converter" description="Convert between kilograms, pounds, ounces and more." /></PageWrapper>;
}
