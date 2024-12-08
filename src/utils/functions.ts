export const isNotEmpty = (value: string) =>
  value != null && value != "" && value != undefined && value?.length > 0;

export const isEmpty = (value: string) =>
  value == null || value == "" || value == undefined || value?.length == 0;

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      // Check if result is a string
      if (typeof reader.result === "string") {
        // Split the result to remove the metadata (like 'data:image/png;base64,')
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };

    reader.onerror = (error) => reject(error);
  });
};

export const generateId = (length: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const formatNumber = (num: string) => {
  return new Intl.NumberFormat("en-US").format(Number(num.replace(/,/g, "")));
};

export const increment = (
  setQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
  setQuantity((prevQuantity) => prevQuantity + 1);
};

export const decrement = (
  setQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
  setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
};

export const wait = (
  ms: number,
  setTimeout: (callback: () => void, delay: number) => void
): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const CurrencyComponent = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
};
