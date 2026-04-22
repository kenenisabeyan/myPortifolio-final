import { clientLogos } from '../data/data';

const ClientsLogos = () => {
  return (
    <section className="py-12 border-t border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clientLogos.map((client, idx) => (
            <img
              key={idx}
              src={client.logo}
              alt={client.name}
              className="h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsLogos;