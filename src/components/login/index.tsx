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
import signUp from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/singnin";
import { LoginProps, ErrorType } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2).max(50),
});

const Login: React.FC<LoginProps> = ({ dictionary }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const { username, password } = values;

    const { result, error } = await signIn(username, password);
    if (result) {
      console.log(" result >>>", result);
      toast({
        title: dictionary.success.notification,
        description: dictionary.login.success_login,
      });
    }
    if (error) {
      console.log(" error >>", error);

      toast({
        title: dictionary.error.notification,
        description: dictionary.login.error_login,
      });
    }
  };

  return (
    <div className="container w-1/2  flex justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
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
          <Button className="flex justify-center" type="submit">
            {dictionary.login.login}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
