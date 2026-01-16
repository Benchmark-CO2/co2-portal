import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type FaqListProps = {
  items: Array<{
    question: string;
    response: string;
  }>;
};
export default function FaqList({ items }: FaqListProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mt-10"
      defaultValue="item-1"
    >
      {items.map((item, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index} className="mb-4 border-b pb-4">
          <AccordionTrigger className='text-xl font-semibold text-primary'>{item.question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              {item.response}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

