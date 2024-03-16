"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import AuthLayout from "../layout";
import Link from "next/link";
import { Locale } from "../../../../i18n-config";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2).max(50),
});

interface Props {
  lang: Locale;
}

const Login: React.FC<Props> = ({ lang }) => {
  const router = useRouter();

  const { authState, loading, signInWithEmailAndPassword } = useFirebaseAuth();

  const { dictionary } = useAppSelector((state: RootState) => state.languages);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (authState?.email && !loading) {
      router.push("about");
    }
  }, [authState?.email, loading]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { username, password } = values;
    const { result, errorMessage } = await signInWithEmailAndPassword(
      username,
      password
    );
    if (result) {
      toast({
        title: dictionary?.success?.notification,
        description: dictionary?.login?.success_login,
      });
      router.push("about");
    }
    if (errorMessage) {
      toast({
        title: dictionary?.error?.notification,
        description: errorMessage,
      });
    }
  };

  return (
    <AuthLayout title={dictionary?.login?.login}>
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
                  <Input
                    placeholder="shadcn"
                    {...field}
                    className="input-text"
                  />
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
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    className="input-text"
                  />
                </FormControl>
                <FormDescription>{dictionary?.login?.des_pass}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="button-conform flex justify-center w-full my-2.5 "
            type="submit"
          >
            {dictionary?.login?.login}
          </Button>
          <h2 className="container w-full flex justify-center">
            <div className="pr-2">{dictionary.login.sign_up}</div>
            {lang && (
              <Link href={lang && `/${lang}/sign-up`}>
                {dictionary?.login?.register}
              </Link>
            )}
          </h2>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;
