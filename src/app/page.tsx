import Image from "next/image";
import { Button } from "@/components/ui/button";
import FormGenerator from "./form-generator";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import { db } from "@/db";
import { forms } from "@/db/schema";
import  FormList from "./forms/FormsList";

export default async function Home() {
  const forms = await db.query.forms.findMany();
  console.log(forms);
  return (
    <SessionProvider><Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <FormGenerator />
      <FormList forms={forms} />
      </main>
    </SessionProvider>
    
  )
}
