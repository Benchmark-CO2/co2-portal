import { ChevronDown, ChevronUp } from 'lucide-react';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './ui/input';

type GlossaryProps = {
  items: Record<string, {
    item: string;
    description: string;
  }[]>;
};
const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export default function Glossary({ items }: GlossaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [committedTerm, setCommittedTerm] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredSections = useMemo(() => {
    const term = committedTerm.toLowerCase().trim();
    if (!term) return alfabet;
    return alfabet.filter(letter =>
      items[letter]?.some(item =>
        item.item.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      )
    );
  }, [committedTerm, items]);

  const [manualFilteredSections, setManualFilteredSections] = useState<string[] | null>(null);
  const effectiveSections = manualFilteredSections ?? filteredSections;

  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const totalMatches = useMemo(() => {
    const term = committedTerm.toLowerCase().trim();
    if (!term) return 0;
    const regex = new RegExp(escapeRegExp(term), 'gi');
    let count = 0;
    filteredSections.forEach(letter => {
      items[letter]?.forEach(item => {
        count += (item.item.match(regex)?.length ?? 0);
        count += (item.description.match(regex)?.length ?? 0);
      });
    });
    return count;
  }, [committedTerm, filteredSections, items]);

  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [committedTerm]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setSearchTerm('');
      setCommittedTerm('');
      setManualFilteredSections(null);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    setSearchTerm(value);
    setManualFilteredSections(null);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setCommittedTerm(value);
    }, 400);
  };

  const handleClickLetter = (letter: string) => {
    const letterIndex = alfabet.indexOf(letter);
    const acordionElement = document.getElementById(`letter-${alfabet[letterIndex]}`);
    if (acordionElement) {
      const scrollContainer = document.getElementById('main-scroll-container');
      const headerHeight = document.getElementById('glossary-header')?.offsetHeight ?? 64;
      if (scrollContainer) {
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const elementTop = acordionElement.getBoundingClientRect().top;
        const top = scrollContainer.scrollTop + (elementTop - containerTop) - headerHeight;
        scrollContainer.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const itemsThatContainsSearchedTerm = () => {
    const term = committedTerm.toLowerCase();
    const foundedItems = alfabet.filter(letter => items[letter]?.some(item => item.item.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)));
    setManualFilteredSections(foundedItems);
  };

  const navigateToMatch = (index: number) => {
    const marks = Array.from(document.querySelectorAll('#glossary-accordion mark')) as HTMLElement[];
    marks.forEach(m => {
      m.classList.remove('bg-orange-300', 'outline', 'outline-orange-400');
      m.classList.add('bg-yellow-200');
    });
    const target = marks[index];
    if (!target) return;
    target.classList.remove('bg-yellow-200');
    target.classList.add('bg-orange-300', 'outline', 'outline-orange-400');
    const scrollContainer = document.getElementById('main-scroll-container');
    const headerHeight = document.getElementById('glossary-header')?.offsetHeight ?? 64;
    if (scrollContainer) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const elementTop = target.getBoundingClientRect().top;
      const top = scrollContainer.scrollTop + (elementTop - containerTop) - headerHeight - 24;
      scrollContainer.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const next = totalMatches === 0 ? 0 : (currentMatchIndex + 1) % totalMatches;
    setCurrentMatchIndex(next);
    navigateToMatch(next);
  };

  const handlePrev = () => {
    const prev = totalMatches === 0 ? 0 : (currentMatchIndex - 1 + totalMatches) % totalMatches;
    setCurrentMatchIndex(prev);
    navigateToMatch(prev);
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
    if (effectiveSections.includes(letter)) {
      setManualFilteredSections(effectiveSections.filter(el => el !== letter));
    } else {
      setManualFilteredSections([...effectiveSections, letter]);
    }
  };

  return (
    <div className='w-full overflow-x-hidden'>
      <div className='fixed flex justify-center items-center left-0 top-7 h-30 bg-white w-full gap-4 max-md:h-50' id='glossary-header'>
        <div className='absolute left-0 top-10 z-10 w-2/3 max-sm:w-11/12 flex justify-center flex-col px-4'>
            <div className='flex justify-between w-full items-center flex-wrap '>
              <h1 className="text-3xl font-bold text-primary">Glossário</h1>
              <div className='w-full md:w-1/2'>
                <div className='flex items-center gap-2 mt-4'>
                  <Input id='search' placeholder='Buscar termo...' className='bg-white' onChange={handleChangeText} value={searchTerm} />
                  {committedTerm && (
                    <div className='flex items-center gap-1 shrink-0'>
                      <span className='text-sm text-muted-foreground whitespace-nowrap'>
                        {totalMatches === 0 ? '0 resultados' : `${currentMatchIndex + 1} / ${totalMatches}`}
                      </span>
                      <button
                        onClick={handlePrev}
                        disabled={totalMatches === 0}
                        className='p-1 rounded hover:bg-muted disabled:opacity-40'
                        aria-label='Resultado anterior'
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={totalMatches === 0}
                        className='p-1 rounded hover:bg-muted disabled:opacity-40'
                        aria-label='Próximo resultado'
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='flex gap-3 text-secondary text-xl cursor-pointer w-full flex-wrap mt-2'>
              {alfabet.map((letter) => (
                <div key={letter} onClick={() => handleClickLetter(letter)}>
                  <h2 className='max-md:text-base'>{letter}</h2>
                </div>
              ))}
            </div>
        </div>
      </div>
      <div className='mt-25 max-md:mt-45'>
        <Accordion
          id='glossary-accordion'
          key={'all'}
          type="multiple"
          className="w-full mt-4"
          value={effectiveSections.map(el => `item-${el}`)}
        >
          <Suspense fallback={<p>Procurando...</p>}>
            {
              alfabet.map((letter) => (
                <AccordionItem value={`item-${letter}`} className="mb-4 border-b pb-4" key={letter} id={`letter-${letter}`}>
                  <AccordionTrigger className='text-2xl font-bold text-primary' onClick={(e) => e.preventDefault()}>{letter}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-6 text-balance break-words mt-4">
                    {items[letter] && items[letter].map((item, index) => (
                      <div key={index}>
                        <h3 className='text-base font-bold mb-2 text-primary'>{highlightText(item.item, committedTerm)}</h3>
                        <p>{highlightText(item.description, committedTerm)}</p>
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