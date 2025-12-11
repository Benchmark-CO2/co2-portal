import React from 'react'
const stackeholders = [
  {
    name: "FDTE",
    logo: '/fdte.png',
    website: "https://www.fdte.org.br/",
  },
  {
    name: "USP",
    logo: '/usp.png',
    website: "https://www5.usp.br/",
  },
  {
    name: "caixa",
    logo: '/caixa.png',
    website: "https://www.caixa.gov.br/",
  },
];



export const TopSection = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6">
        <img
          src={'/images/assets/logo_full.svg'}
          alt="logo completa do BIPC"
          className="w-full max-w-[420px] mb-6 lg:mb-10"
          width={420}
          height={100}
        />
        <div className="w-full flex flex-col gap-4 md:gap-6 text-sm md:text-base">
          <p>
            Em contraposição à matriz elétrica brasileira, uma das mais limpas
            do mundo, a nossa construção civil é uma importante emissora de CO2,
            representando uma oportunidade de mitigação.
          </p>
          <p>
            Materiais como cimento, o aço e vidro carregam consigo uma pegada de
            carbono significativa para o canteiro de obras, pois já emitiram
            carbono durante a sua produção. Para entender como se dão essas
            emissões nas construções formais e informais precisamos de um
            diagnóstico apurado, que reflita a complexidade da construção civil
            brasileira.
          </p>
          <p>
            Por esse motivo foi desenvolvido o Benchmark Iterativo para Projetos
            de baixo Carbono: a plataforma BIPc – onde é possível estimar o
            consumo de materiais e a pegada de CO2 embutido nas moradias, de
            forma prática, inteligente e escalável. Projetistas e construtoras
            podem comparar o desempenho estimado de seu projeto com o de outros
            projetos já executados.
          </p>

          <p>
            A ferramenta permite à equipe ter uma ideia do impacto de carbono da
            construção na emissao de carbono, verificar em tempo real o
            benchmark dos projetos existentes no mercado e conhecer as
            tendências de evolução das emissões de carbono, tudo antes de
            concluir o projeto.
          </p>

          <p>
            A plataforma integra o processo de projeto à ferramenta de cálculo,
            fornecendo estimativas instantâneas sobre o impacto ambiental de
            cada decisão.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <img src={'/images/assets/city-about.png'} alt="about image" width={520} height={520} />
      </div>
    </section>
  );
}

export const StackeholderSection = () => {
  return (
    <section className="w-full mt-20 mb-10 flex flex-col items-center gap-6 md:gap-10">
      <h1 className="text-primary font-semibold text-xl md:text-2xl">
        Realização
      </h1>
      <div className="w-full flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
        {stackeholders.map((stakehoder) => (
          <a
            key={stakehoder.name}
            href={stakehoder.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src={stakehoder.logo}
              alt="caixa logo"
              className="h-12 md:h-16 lg:h-20"
              width={200}
              height={20}
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export const TeamSection = ({
  people,
  title,
}: {
  people: Array<{ name: string; role: string; photo?: string }>;
  title: string;
}) => {
  return (
    <section className="w-full mt-20 flex flex-col items-start gap-6 md:gap-10">
      <h1 className="text-primary font-semibold text-xl md:text-2xl">
        {title}
      </h1>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 justify-items-center">
        {people.map(
          (member: { name: string; role: string; photo?: string }) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-3 md:gap-4 w-full max-w-[200px]"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 md:w-40 md:h-40 aspect-square rounded-full object-cover flex-shrink-0"
                  width={100}
                  height={20}
                />
              ) : null}

              <div className="w-full px-2">
                <h2 className="text-sm md:text-base font-semibold text-center text-primary break-words line-clamp-2">
                  {member.name}
                </h2>
                <p className="text-xs sm:text-sm text-primary text-center line-clamp-2">
                  {member.role}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};
