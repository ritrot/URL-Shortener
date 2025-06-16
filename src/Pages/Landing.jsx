import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const Landing = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen  '>
      <h1 className=' sm:text-5xl lg:text-7xl text-3xl w-3/4 text-center sm:my-20 my-14 font-bold'>Shorten The Loooooong Link in Seconds!!!</h1>
      <form className='flex-col sm:h-12 justify-center sm:flex-row flex md:w-1/2 items-center gap-4'>
        <Input placeholder="Enter your URL" className='flex-1 h-full  p-4' type="url" />
        <Button variant="destructive" className="h-full">Shorten!</Button>
      </form>
      <img className='w-200 my-10 md:px-10' src="./luffy.jpg" alt="showimg" />
      <Accordion className=" w-full px-10" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Landing
