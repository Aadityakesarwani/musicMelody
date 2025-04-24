import { Accordion,AccordionContent,
    AccordionItem,
    AccordionTrigger, } from "./ui/accordion";

  export default function FAQ() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Frequently Asked Questions
          </h2>
          <Accordion className="w-full max-w-2xl mx-auto" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How does AI music generation work?</AccordionTrigger>
              <AccordionContent>
                AI music generation uses machine learning models trained on vast amounts of music data to create new, original compositions based on input parameters and prompts.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I use the generated music commercially?</AccordionTrigger>
              <AccordionContent>
                The licensing terms for AI-generated music can vary. Please refer to our terms of service for detailed information on commercial usage rights.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What file formats are available for download?</AccordionTrigger>
              <AccordionContent>
                Generated music is available for download in high-quality MP3 and WAV formats.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    )
  }