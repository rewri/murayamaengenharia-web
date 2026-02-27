interface Partner {
  name: string;
  filename: string;
  ext: "png" | "jpg";
}

const partnersList: Partner[] = [
  { name: "AAF", filename: "aaf", ext: "png" },
  { name: "Caio", filename: "caio", ext: "png" },
  { name: "Central Bela Vista", filename: "central_bela_vista", ext: "png" },
  { name: "Colégio Ipê", filename: "colegio_ipe", ext: "png" },
  { name: "Eucatex", filename: "eucatex", ext: "png" },
  { name: "Momentum", filename: "momentum", ext: "png" },
  { name: "Moura Leite", filename: "moura_leite", ext: "png" },
  { name: "Prefeitura de Avaré", filename: "prefeitura_de_avare", ext: "png" },
  {
    name: "Prefeitura de Botucatu",
    filename: "prefeitura_de_botucatu",
    ext: "png",
  },
  { name: "Rotary", filename: "rotary", ext: "png" },
  { name: "SABESP", filename: "sabesp", ext: "png" },
  { name: "Seguralta", filename: "seguralta", ext: "png" },
  { name: "Shopping Botucatu", filename: "shopping_botucatu", ext: "png" },
  { name: "Taky RRV", filename: "taky_rrv", ext: "png" },
];

export const partners = partnersList.map((sponsor) => ({
  name: sponsor.name,
  src: `/static/images/partners/${sponsor.filename}.${sponsor.ext}`,
}));
