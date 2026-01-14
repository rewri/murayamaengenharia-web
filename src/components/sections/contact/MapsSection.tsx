export default function MapsSection() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] rounded-xl overflow-hidden shadow-sm border border-gray-200/80 dark:border-gray-700/80">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1588.0502829665872!2d-48.446511593242015!3d-22.89418044388343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c6df7904c53613%3A0x61f06d34c501d51c!2sMurayama%20Engenharia!5e0!3m2!1spt-BR!2sbr!4v1768411445477!5m2!1spt-BR!2sbr"
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
