
import type { CollectionEntry } from 'astro:content';
import { useState } from 'react';
// import FormattedDate from '../components/FormattedDate.astro';


type Props = CollectionEntry<'notices'>

export default function NoticePost({data, body}: Props) {
  const content = body;
  const { title, pubDate, heroImage } = data;
  const [contentIsExpanded, setContentIsExpanded] = useState(false);
  const toggleContent = () => {
    setContentIsExpanded(!contentIsExpanded);
  };

  return (
   
<main className="w-full">
  <article
    className="w-full flex max-md:flex-col justify-center md:justify-between items-start gap-4"
  >
    {/* <!-- case mobile --> */}
    <div className="md:hidden w-full flex justify-between items-center">
      <h1 className="w-1/2">{title}</h1>
      <div className="date w-1/2 text-right">
        {/* <FormattedDate date={pubDate} /> */}
        {new Date(pubDate).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
      <hr />
    </div>
    <div className="md:w-1/3 w-fit h-[480px] max-md:h-fit max-md:w-full">
      {
        heroImage && (
          <img
            className="max-w-full w-full h-full max-md:max-h-[220px] object-cover rounded-md shadow-lg shadow-zinc-500/80"
            src={heroImage}
            alt=""
          />
        )
      }
    </div>
    <div
      className="flex-1 text-foreground/90 max-md:w-full max-md:text-base text-md"
    >
      {/* <!-- case desktop open--> */}
      <div className="text-2xl font-bold mb-10 max-md:hidden">
        <h1>{title}</h1>
        <div className="date text-base">
          {/* <FormattedDate date={pubDate} /> */}
          {new Date(pubDate).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
        </div>
      </div>
      {/* <!-- case desktop close --> */}
      <div className="w-full pl-2 text-foreground/90">
       <div id={`${title}-content`} className={`prose max-w-none transition ${contentIsExpanded ? '' : 'line-clamp-10'}`}>
          {content}
        </div>
        <button
          id={`${title}-button`}
          className="text-base mt-4 text-blue-500 hover:underline"
          onClick={toggleContent}
        >
          {contentIsExpanded ? 'Ver menos' : 'Ver mais'}
        </button>
      </div>
    </div>
  </article>
</main>
  );
}
