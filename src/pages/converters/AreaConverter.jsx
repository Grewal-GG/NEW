import PageWrapper from '../../components/layout/PageWrapper';
import ConverterTemplate from '../../components/calculator/ConverterTemplate';
import { AREA } from '../../utils/converters';

export default function AreaConverter() {
  return <PageWrapper><ConverterTemplate table={AREA} title="Area Converter" description="Convert between square meters, acres, hectares and more." /></PageWrapper>;
}
