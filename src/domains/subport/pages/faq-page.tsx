import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useGetFaqList from '@/domains/subport/hooks/queries/use-get-faq-list';

function FaqPage() {
  const { data: faqList, isPending: isGetFaqListPneding } = useGetFaqList();

  if (isGetFaqListPneding)
    return (
      <>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-box-black h-15 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </>
    );
  if (!faqList)
    return (
      <p className="flex h-full items-center justify-center">
        데이터를 불러오지 못했습니다
      </p>
    );
  return (
    <Accordion type="multiple">
      {faqList.faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id.toString()}
          className="mb-3 last:mb-0"
        >
          <AccordionTrigger className="cursor-pointer">{`Q. ${faq.question}`}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FaqPage;
