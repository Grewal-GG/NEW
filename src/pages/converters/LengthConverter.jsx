import PageWrapper from '../../components/layout/PageWrapper';
import ConverterTemplate from '../../components/calculator/ConverterTemplate';
import { LENGTH } from '../../utils/converters';

export default function LengthConverter() {
  return <PageWrapper><ConverterTemplate table={LENGTH} title="Length Converter" description="Convert between meters, feet, miles, inches and more." /></PageWrapper>;
}
