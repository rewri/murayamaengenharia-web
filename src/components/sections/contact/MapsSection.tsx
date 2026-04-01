import { contactsData } from "../../../config/contacts";

export default function MapsSection() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] rounded-xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-700/80">
      <iframe
        src={contactsData.external.googleMapsEmbedHref}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
