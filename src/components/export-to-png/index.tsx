import { useAppSelector } from '../../store/hooks';
import {
  getDateFrom,
  getDateTo,
  getSelectedCountry,
} from '../../store/slices/root.slice';

interface ExportToPNGProps {
  base64Image: string;
}

function ExportToPNG({ base64Image }: ExportToPNGProps) {
  const selectedCountry = useAppSelector(getSelectedCountry);
  const dateFrom = useAppSelector(getDateFrom);
  const dateTo = useAppSelector(getDateTo);
  const filename = `${selectedCountry?.name}_${dateFrom}_${dateTo}.png`;

  return (
    <a href={base64Image} download={filename}>
      PNG
    </a>
  );
}

export default ExportToPNG;
