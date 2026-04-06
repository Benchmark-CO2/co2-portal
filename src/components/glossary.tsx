import { Suspense, useDeferredValue, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './ui/input';
import { Label } from './ui/label';

type GlossaryProps = {
  items: Record<string, {
    item: string;
    description: string;
  }[]>;
};
const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export default function Glossary({ items }: GlossaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredTerm = useDeferredValue(searchTerm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [filteredSections, setFilteredSections] = useState(alfabet.map(el => el));

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.value) {
      setSearchTerm('');
      setFilteredSections(alfabet.map(el => el));
      return;
    }
    setSearchTerm(e.target.value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      itemsThatContainsSearchedTerm();
    }, 500);
  };

  const handleClickLetter = (letter: string) => {
    const letterIndex = alfabet.indexOf(letter);
    const acordionElement = document.getElementById(`letter-${alfabet[letterIndex]}`);

    if (acordionElement) {
      acordionElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const itemsThatContainsSearchedTerm = () => {
    const term = deferredTerm.toLowerCase();

    const foundedItems = alfabet.filter(letter => items[letter]?.some(item => item.item.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)));
    setFilteredSections(foundedItems);
  };

  const escapeRegExp = (value: string) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  const highlightText = (text: string, term: string) => {
    const query = term.trim();
    if (!query) return text;

    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');

    return text.split(regex).map((part, index) => (
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={`${part}-${index}`} className="bg-yellow-200 text-inherit px-0.5 rounded">{part}</mark>
        : <span key={`${part}-${index}`}>{part}</span>
    ));
  };

  const handleClickSection = (letter: string) => {
    if (filteredSections.includes(letter)) {
      setFilteredSections(old => old.filter(el => el !== letter));
    } else {
      setFilteredSections(old => [...old, letter]);
    }
  };

  return (
    <div>
      <div className='sticky flex justify-center items-center top-7 h-30 w-full gap-4 max-md:h-58'>
        <div className='h-64 w-screen max-sm:w-full absolute backdrop-blur-xl'></div>
        <div className='absolute left-0 top-10 z-10 w-2/3 max-sm:w-5/6 flex justify-center flex-col'>
          <div>
            <h1 className="text-3xl font-bold text-primary">Glossário</h1>
            <div className='flex gap-3 text-secondary text-xl cursor-pointer w-full flex-wrap mt-2'>
              {alfabet.map((letter) => (
                <div key={letter} onClick={() => handleClickLetter(letter)}>
                  <h2>{letter}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 z-10 mb-2'>
            <Label htmlFor='search' className='text-secondary text-sm'>Buscar </Label>
            <Input id='search' placeholder='Buscar termo...' className='w-full mt-4 bg-white' onChange={handleChangeText} value={deferredTerm} />
          </div>
        </div>
      </div>
      <div className='mt-45 w-full max-md:mt-52'>
        <Accordion
          key={'all'}
          type="multiple"
          className="w-full mt-4"
          value={filteredSections.map(el => `item-${el}`)}
        >
          <Suspense fallback={<p>Procurando...</p>}>
            {
              alfabet.map((letter) => (
                <AccordionItem value={`item-${letter}`} className="mb-4 border-b pb-4" key={letter} id={`letter-${letter}`}>
                  <AccordionTrigger className='text-2xl font-bold text-primary' onClick={() => handleClickSection(letter)}>{letter}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-6 text-balance mt-4">
                    {items[letter] && items[letter].map((item, index) => (
                      <div key={index}>
                        <h3 className='text-base font-bold mb-2 text-primary'>{highlightText(item.item, deferredTerm)}</h3>
                        <p>{highlightText(item.description, deferredTerm)}</p>
                      </div>
                    ))
                    }
                    {
                      !items[letter] && (
                        <p className='mt-4'>Nenhum termo encontrado para a letra "{letter}".</p>
                      )
                    }
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Suspense>
        </Accordion>


      </div>
    </div>
  );
}