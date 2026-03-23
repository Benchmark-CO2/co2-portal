import { useDeferredValue, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './ui/input';

type FaqListProps = {
  items: Array<{
    question: string;
    response: string;
  }>;
};
export default function FaqList({ items }: FaqListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredTerm = useDeferredValue(searchTerm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.value) {
      setSearchTerm('');
      return;
    }
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 500);
  };

  const escapeRegExp = (value: string) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  const highlightText = (text: string) => {
    const query = searchTerm.trim();
    if (!query) return text;

    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');

    return text.split(regex).map((part, index) => (
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={`${part}-${index}`} className="bg-yellow-200 text-inherit px-0.5 rounded">{part}</mark>
        : <span key={`${part}-${index}`}>{part}</span>
    ));
  };
  
  return (
    <>
      <div className='w-1/2 flex justify-between'>
        <h1 className="text-3xl font-bold text-primary">Perguntas Frequentes</h1>
        <Input className='w-1/3 ml-auto' placeholder='Buscar...' onChange={handleChangeText} />
      </div>
      <Accordion
        type="multiple"
        className="w-full mt-10"
        value={items.map((_, idx) => `item-${idx + 1}`)}
      >
        {items.map((item, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index} className="mb-4 border-b pb-4">
            <AccordionTrigger className='text-xl font-semibold text-primary flex justify-start gap-[2px]'>{highlightText(item.question)}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                {highlightText(item.response)}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

