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
import { Input } from "@/components/ui/input";
import { PropsContent } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import "./login.css";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2).max(50),
});

const Login: React.FC<PropsContent> = ({ dictionary }) => {
  const router = useRouter();

  const { authState, loading, signInWithEmailAndPassword } = useFirebaseAuth();

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
        title: dictionary.success.notification,
        description: dictionary.login.success_login,
      });
      router.push("about");
    }
    if (errorMessage) {
      toast({
        title: dictionary.error.notification,
        description: errorMessage,
      });
    }
  };

  return (
    <div className="container login-content w-3/4 md:w-1/2  flex justify-center">
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
                <FormLabel>{dictionary.login.username}</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>{dictionary.login.des_user}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.login.password}</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormDescription>{dictionary.login.des_pass}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="flex justify-center w-full my-2.5" type="submit">
            {dictionary.login.login}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
