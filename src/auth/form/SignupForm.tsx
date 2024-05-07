import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { createUserAccount, signInAccount } from "@/lib/appwrite/api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "@/context/AuthContext";

// const A = z.string();
// type A = z.infer<typeof A>;

// type x = z.infer<typeof SignupValidation>;

const SignupForm = () => {
  //const isLoading = false;

  const {
    mutateAsync: createUserAccountMutateAsync,
    isPending: createUserAccountPending,
  } = useMutation({
    mutationFn: createUserAccount,
  });

  const {
    mutateAsync: signInAccountMutateAsync,
    isPending: signInAccountPending,
  } = useMutation({
    mutationFn: signInAccount,
  });

  const { checkAuthUser, isLoading } = useUserContext();
  const navigate = useNavigate();

  const signupFormFields: ["name", "username", "email", "password"] = [
    "name",
    "username",
    "email",
    "password",
  ];

  const formInputType = (fieldName: string) => {
    if (fieldName === "password") return "password";
    else return "text";
  };

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    //error shown on onchange using mode property generally avoid this(performance issue every time re-render)
    //by default validation check on submit

    //mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
    const newUser = await createUserAccountMutateAsync(values);
    if (!newUser) {
      toast.error("Something Went wrong");
      return;
    }
    const session = await signInAccountMutateAsync({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      toast.error("Something Went wrong");
      //navigate("/sign-in");
      return;
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast.error("Something Went wrong");
      return;
    }
  };

  return (
    <div className="sm:w-420 flex-center flex-col py-5">
      <img src="/src/assets/images/logo.svg"></img>
      <p className="h3-bold md:h2-bold pt-5 sm:pt-10">Create a new account</p>
      <p className="text-light-3 small-medium md:base-regular my-4">
        To use snapgram, Please enter your details
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {signupFormFields.map((signupFormField) => (
            <FormField
              key={signupFormField}
              control={form.control}
              name={signupFormField}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{signupFormField}</FormLabel>
                  <FormControl>
                    <Input
                      type={formInputType(signupFormField)}
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="shad-button_primary">
            {createUserAccountPending || signInAccountPending || isLoading ? (
              <div className="flex-center gap-1">
                <Loader></Loader> Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1 cursor-pointer"
            >
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
