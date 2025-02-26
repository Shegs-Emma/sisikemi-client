import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onSubmitError = (errors: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFirstErrorMessage: any = (errorObject: any) => {
    const firstErrorKey = Object.keys(errorObject)[0];
    const firstErrorValue = errorObject[firstErrorKey];

    if (
      firstErrorValue &&
      typeof firstErrorValue === "object" &&
      !firstErrorValue.message
    ) {
      // If the error value is an object and doesn't have a 'message' property, it's a nested error
      return getFirstErrorMessage(firstErrorValue);
    } else {
      // If it's a direct error or the nested error with a 'message' property
      return { key: firstErrorKey, message: firstErrorValue.message };
    }
  };
  const firstError = getFirstErrorMessage(errors);
  // const firstErrorKey = Object.keys(errors)?.[0];

  toast.error(` ${firstError.message}`);
};

export const capitalizeFirstLetter = (name: string) => {
  if (!name) return name; // Handle empty or null strings
  return name.charAt(0)?.toUpperCase() + name.slice(1);
};
