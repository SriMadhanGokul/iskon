import { Helmet } from 'react-helmet-async';
import DonationCard from '../components/DonationCard.jsx';
export default function Donate() {
  return (
    <>
      <Helmet>
        <title>Donate – Gupt Vrindavan Dham</title>
        <meta name="description" content="Offer seva to Gupt Vrindavan Dham by UPI, bank transfer or the online portal. Official details only." />
      </Helmet>
      <div className="container-page max-w-3xl py-12"><DonationCard /></div>
    </>
  );
}
