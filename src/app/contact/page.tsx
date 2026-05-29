import PageHero from '@/app/components/PageHero';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <>
      <PageHero
        src="/images/medic-hd.png"
        alt="Contacto Bihospharma"
        title="CONTACTO"
        heightClass="h-[35vh] min-h-[200px] sm:min-h-[260px]"
      />
      <ContactForm />
    </>
  );
}
