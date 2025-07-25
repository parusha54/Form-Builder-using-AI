"use client";
import React,{useState,useEffect} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import { generateForm } from '@/actions/generateForm';
import { useFormState, useFormStatus } from 'react-dom';
import { useSession, signIn } from "next-auth/react";
type Props = {}
const initialState: {
  message: string;
  data?: any;
} = {
  message: ""
}
export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
}
//const FormGenerator = (props: Props) => 
export default function FormGenerator()
    {
      const [state, formAction] = useFormState(generateForm, initialState);
      const [open, setOpen] = useState(false);
      const session = useSession();
      useEffect(() => {
    if (state.message === "success") {
      setOpen(false);
    }
     console.log(state.message);
  }, [state.message])
      const onFormCreate = () => {
         if (session.data?.user) {
      setOpen(true);
    } else {
      signIn();
    }
        
      }
  return (
      <Dialog open={open} onOpenChange={setOpen}>
  <Button onClick={onFormCreate} >Create Form </Button>
  <DialogContent className='sm:max-w-[425px]'>
    <DialogHeader>
      <DialogTitle>Create New Form</DialogTitle>
    </DialogHeader>
    <form action={formAction}>
          <div className='grid gap-4 py-4'>
            <Textarea id="description" name="description" required placeholder='Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ✨' />
          </div>
    
    <DialogFooter>
      <SubmitButton />
        <Button variant="link">Create Manually</Button>
        </DialogFooter>
        </form>
  </DialogContent>
</Dialog>
  )
}