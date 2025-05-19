import { useAppSelector } from '../../store/hooks';
import { getSelectedCountry } from '../../store/slices/root.slice';

interface ExportToPNGProps {
  base64Image: string;
}

function ExportToPNG({ base64Image }: ExportToPNGProps) {
  const selectedCountry = useAppSelector(getSelectedCountry);
  const filename = `${selectedCountry?.name}.png`;

  return (
    <a href={base64Image} download={filename}>
      PNG
    </a>
  );
}

export default ExportToPNG;
