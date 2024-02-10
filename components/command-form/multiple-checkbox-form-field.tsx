import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

export default function MultipleCheckboxFormField({
  name,
  label,
  form,
  options,
}: MultipleCheckboxFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-base">{label}</FormLabel>
          <div
            className={`gap-2 flex ${
              name !== "category.type" ? "flex-wrap" : ""
            }`}
          >
            {options.map((opt, id) => (
              <div
                key={id}
                className="flex items-center gap-2 flex-row relative mr-2"
              >
                <Checkbox
                  checked={field.value === opt}
                  onCheckedChange={() => {
                    form.setValue(name, opt as any);
                  }}
                />
                <FormLabel className="font-normal">{opt}</FormLabel>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
