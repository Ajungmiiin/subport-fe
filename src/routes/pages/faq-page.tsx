import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useGetFaqList from '@/hooks/queries/use-get-faq-list';

function FaqPage() {
  const { data: faqList, isPending: isGetFaqListPneding } = useGetFaqList();

  //   fallback, error 처리
  if (isGetFaqListPneding) return <p>로딩</p>;
  if (!faqList) return <p>데이터를 불러오지 못했습니다</p>;
  console.log(faqList);
  return (
    <Accordion type="multiple">
      {faqList.faqs.map((faq) => (
        <AccordionItem value={faq.id.toString()} className="mb-3 last:mb-0">
          <AccordionTrigger className="cursor-pointer">{`Q. ${faq.question}`}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FaqPage;
