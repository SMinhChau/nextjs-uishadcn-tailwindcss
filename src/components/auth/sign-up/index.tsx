"use client";
import React from "react";
import AuthLayout from "../layout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Locale } from "../../../../i18n-config";
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  lang: Locale;
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2).max(50),
});

const SignUp: React.FC<Props> = ({ lang }) => {
  const router = useRouter();
  const { dictionary } = useAppSelector((state: RootState) => state.languages);
  const { authState, loading, createUserWithEmailAndPassword } =
    useFirebaseAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { username, password } = values;
    const { result, errorMessage } = await createUserWithEmailAndPassword(
      username,
      password
    );
    if (result) {
      toast({
        title: dictionary?.success?.notification,
        description: dictionary?.login?.success_register,
      });
      router.push("login");
    }
    if (errorMessage) {
      toast({
        title: dictionary?.error?.notification,
        description: errorMessage,
      });
    }
  };
  return (
    <AuthLayout title={dictionary?.login?.register}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container w-full m-0 "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{dictionary?.login?.username}</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>{dictionary?.login?.des_user}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary?.login?.password}</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormDescription>{dictionary?.login?.des_pass}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex justify-center w-full my-2.5" type="submit">
            {dictionary?.login?.register}
          </Button>
          <h2 className="container w-full flex justify-center">
            <div className="pr-2">{dictionary?.login.sign_in}</div>
            {lang && (
              <Link href={`/${lang}/login`}>{dictionary.login.login}</Link>
            )}
          </h2>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignUp;
