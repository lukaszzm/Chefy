"use client";

import { useForm } from "react-hook-form";

import { BadgeCheckbox } from "@/components/ui/badge-checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { Category } from "@/types";

const mockedCategories = [
  { id: "clcjo266a0002pwmvkgxh4ody", name: "Beef" },
  { id: "clcjo266a0003pwmv1k1c0cfk", name: "Breakfast" },
  { id: "clcjo266a0004pwmv94hgx0sf", name: "Chicken" },
  { id: "clcjo266a0005pwmvhj58fchr", name: "Dessert" },
  { id: "clcjo266a0006pwmvdxgh2gja", name: "Goat" },
  { id: "clcjo266a0007pwmvytn7z6du", name: "Lamb" },
  { id: "clcjo266a0008pwmvbpyi5qia", name: "Miscellaneous" },
  { id: "clcjo266a0009pwmvsd1k1sqy", name: "Pasta" },
  { id: "clcjo266a000apwmvys0oohx9", name: "Pork" },
  { id: "clcjo266a000bpwmvqc15k33w", name: "Seafood" },
  { id: "clcjo266a000cpwmvmy4ipt9n", name: "Side" },
  { id: "clcjo266a000dpwmvqw0ubxf1", name: "Starter" },
  { id: "clcjo266a000epwmvha2i00tt", name: "Vegan" },
  { id: "clcjo266a000fpwmvaavegohn", name: "Vegetarian" },
] satisfies Array<Category>;

export const CategoriesForm = () => {
  const form = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="flex flex-wrap gap-2">
          {mockedCategories.map((category) => (
            <FormField
              control={form.control}
              key={category.id}
              name={category.id}
              render={({ field }) => (
                <FormItem>
                  <BadgeCheckbox id={field.name} label={category.name} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </fieldset>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
