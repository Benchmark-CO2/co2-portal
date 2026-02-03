import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type GlossaryProps = {
  items: Record<string, {
    item: string;
    description: string;
  }[]>;
};
const alfabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export default function Glossary({ items }: GlossaryProps) {
  const [activeLetter, setActiveLetter] = useState<string | null>(alfabet[0]);

  const handleClickLetter = (letter: string) => {
    const acordionElement = document.getElementById(`letter-${letter}`);

    if (acordionElement) {
      acordionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      acordionElement.getElementsByTagName('button')[0].click();
    }
    setActiveLetter(letter);
  }

  return (
    <div>
      <div className='flex gap-3 text-secondary mt-4 text-xl cursor-pointer w-full flex-wrap'>
        {alfabet.map((letter) => (
          <div key={letter} onClick={() => handleClickLetter(letter)}>
            <h2>{letter}</h2>
          </div>
        ))}
      </div>
      <div className='mt-10 w-full'>
        <Accordion
          key={'all'}
          type="single"
          collapsible
          className="w-full mt-4"
          defaultValue={`item-${activeLetter}`}
        >
          {
            alfabet.map((letter) => (
              <AccordionItem value={`item-${letter}`} className="mb-4 border-b pb-4" key={letter} id={`letter-${letter}`}>
                <AccordionTrigger className='text-2xl font-bold text-primary'>{letter}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-6 text-balance mt-4">
                  {items[letter] && items[letter].map((item, index) => (
                    <div key={index}>
                      <h3 className='text-base font-bold mb-2 text-primary'>{item.item}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))
                  }
                  {
                    activeLetter && !items[letter] && (
                      <p className='mt-4'>Nenhum termo encontrado para a letra "{letter}".</p>
                    )
                  }
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>

        
      </div>
    </div>
  );
}