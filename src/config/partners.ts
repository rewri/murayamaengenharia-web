/**
 * Lista de sponsors
 *
 * As imagens devem estar em: public/static/images/sponsors/
 * Nomeadas consistentemente com o padrão: [filename].png ou .jpg
 *
 * Para adicionar um novo sponsor:
 * 1. Coloque a imagem (PNG/JPG) em public/static/images/sponsors/
 * 2. Nomeie como: seu-nome.png (use kebab-case)
 * 3. Adicione aqui: { name: "Seu Nome", filename: "seu-nome", ext: "png" }
 *
 * Para remover um sponsor:
 * 1. Delete a imagem do diretório
 * 2. Remova a entrada abaixo
 */

interface Sponsor {
  name: string;
  filename: string;
  ext: "png" | "jpg";
}

const sponsorsList: Sponsor[] = [
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
  { name: "Seguralta", filename: "seguralta", ext: "jpg" },
  { name: "Shopping Botucatu", filename: "shopping_botucatu", ext: "png" },
  { name: "Taky RRV", filename: "taky_rrv", ext: "png" },
];

/**
 * Mapeia para os caminhos das imagens
 */
export const partners = sponsorsList.map((sponsor) => ({
  name: sponsor.name,
  src: `/static/images/sponsors/${sponsor.filename}.${sponsor.ext}`,
}));
