"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GoPlus } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { convertToBase64, formatNumber, generateId } from "@/utils/functions";
import { useDropzone } from "react-dropzone";
import { useMediaStore } from "@/store/mediaStore";
import { shallow } from "zustand/shallow";
import {
  FetchCollectionResponseInterface,
  FilteredColorsInterface,
  FilteredSizesInterface,
  MediaUploadResponseInterface,
} from "@/utils/interface";
import { toast } from "sonner";
import { useCollectionStore } from "@/store/collectionStore";
import { colors, sizes } from "@/utils/constants";
import { useProductStore } from "@/store/productStore";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCurrencyDollar, BsThreeDots } from "react-icons/bs";

const NewProduct = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fetchedCollections, setFetchedCollections] =
    useState<FetchCollectionResponseInterface>();
  const [description, setDescription] = useState<string>("");
  const [dollarPrice, setDollarPrice] = useState<number>();
  const [saleDollarPrice, setSaleDollarPrice] = useState<number>();
  const [mainImageFile, setMainImageFile] = useState<File[] | null>([]);
  const [otherImage1File, setOtherImage1File] = useState<File[] | null>([]);
  const [otherImage2File, setOtherImage2File] = useState<File[] | null>([]);
  const [otherImage3File, setOtherImage3File] = useState<File[] | null>([]);
  const [isShowingMainOption, setIsShowingMainOption] =
    useState<boolean>(false);
  const [isShowingOther1Option, setIsShowingOther1Option] =
    useState<boolean>(false);
  const [isShowingOther2Option, setIsShowingOther2Option] =
    useState<boolean>(false);
  const [isShowingOther3Option, setIsShowingOther3Option] =
    useState<boolean>(false);
  const [mainImageFileBase64, setMainImageFileBase64] = useState<any>("");
  const [otherImage1FileBase64, setOtherImage1FileBase64] = useState<any>("");
  const [otherImage2FileBase64, setOtherImage2FileBase64] = useState<any>("");
  const [otherImage3FileBase64, setOtherImage3FileBase64] = useState<any>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [filteredColors, setFilteredColors] = useState<
    FilteredColorsInterface[]
  >([]);
  const [filteredSizes, setFilteredSizes] = useState<FilteredSizesInterface[]>(
    []
  );
  const [formValues, setFormValues] = useState({
    product_name: "",
    product_description: "",
    product_code: "",
    price: "",
    sale_price: "",
    collection: 0,
    quantity: 1,
    status: "",
    main_image: "",
    other_image_1: "",
    other_image_2: "",
    other_image_3: "",
  });

  const [errorFields, setErrorFields] = useState({
    product_name: false,
    product_description: false,
    product_code: false,
    price: false,
    sale_price: false,
    collection: false,
    quantity: false,
    status: false,
    main_image: false,
    other_image_1: false,
    other_image_2: false,
    other_image_3: false,
  });

  // Handle submission code ===========================================================================================================================
  const { createMedia } = useMediaStore(
    (state: any) => ({
      createMedia: state.createMedia,
    }),
    shallow
  );

  const { fetchCollections } = useCollectionStore(
    (state: any) => ({
      fetchCollections: state.fetchCollections,
    }),
    shallow
  );

  const { createProduct, fetchProducts } = useProductStore(
    (state: any) => ({
      createProduct: state.createProduct,
      fetchProducts: state.fetchProducts,
    }),
    shallow
  );

  useEffect(() => {
    if (colors?.length || selectedColors?.length) {
      const filterColorArray = colors?.filter(
        (fca) => !selectedColors.includes(fca?.name)
      );
      setFilteredColors(filterColorArray);
    }
  }, [colors, selectedColors]);

  useEffect(() => {
    if (sizes?.length || selectedSizes?.length) {
      const filterSizeArray = sizes?.filter(
        (fca) => !selectedSizes.includes(fca?.name)
      );
      setFilteredSizes(filterSizeArray);
    }
  }, [sizes, selectedSizes]);

  useEffect(() => {
    handleCollectionsFetch();
  }, []);

  useEffect(() => {
    if (formValues.price) {
      const formatted = formValues.price.split(",").join("");
      const updatedDollarPrice = (Number(formatted) / 1618.81).toFixed(2);
      setDollarPrice(+updatedDollarPrice);
    }

    if (formValues.sale_price) {
      const formattedSale = formValues.sale_price.split(",").join("");
      const updatedSaleDollarPrice = (Number(formattedSale) / 1618.81).toFixed(
        2
      );
      setSaleDollarPrice(+updatedSaleDollarPrice);
    }
  }, [formValues.price, formValues.sale_price]);

  const handleCollectionsFetch = async () => {
    const toastId = toast.loading("fetching collection...");
    startTransition(async () => {
      try {
        const payload = {
          page_id: "1",
          page_size: "10",
        };

        const response = await fetchCollections(payload);

        if (!response?.collection?.length) {
          return toast.error("Collection could not be fetched", {
            id: toastId,
          });
        }

        toast.success("Collection fetched successfully", {
          id: toastId,
        });

        setFetchedCollections(response);

        return response.collection;
      } catch (err) {
        return err;
      }
    });
  };

  // Drag n Drop code ========================================================================================================================
  const onDropMainImage = useCallback((acceptedFiles: any) => {
    const mappedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setMainImageFile(mappedFiles);
    setIsShowingMainOption(false);
  }, []);

  const {
    getRootProps: getRootPropsMainImage,
    getInputProps: getInputPropsMainImage,
  } = useDropzone({ onDrop: onDropMainImage });

  const onDropOtherImage1 = useCallback((acceptedFiles: any) => {
    const mappedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setOtherImage1File(mappedFiles);
    setIsShowingOther1Option(false);
  }, []);

  const {
    getRootProps: getRootPropsOtherImage1,
    getInputProps: getInputPropsOtherImage1,
  } = useDropzone({ onDrop: onDropOtherImage1 });

  const onDropOtherImage2 = useCallback((acceptedFiles: any) => {
    const mappedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setOtherImage2File(mappedFiles);
    setIsShowingOther2Option(false);
  }, []);

  const {
    getRootProps: getRootPropsOtherImage2,
    getInputProps: getInputPropsOtherImage2,
  } = useDropzone({ onDrop: onDropOtherImage2 });

  const onDropOtherImage3 = useCallback((acceptedFiles: any) => {
    const mappedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setOtherImage3File(mappedFiles);
    setIsShowingOther3Option(false);
  }, []);

  const {
    getRootProps: getRootPropsOtherImage3,
    getInputProps: getInputPropsOtherImage3,
  } = useDropzone({ onDrop: onDropOtherImage3 });

  // Function to handle key presses
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, and navigation keys
    if (
      !/^[0-9]$/.test(e.key) && // Disallow any non-numeric keys
      e.key !== "Backspace" && // Allow backspace for deletion
      e.key !== "ArrowLeft" && // Allow navigation left
      e.key !== "ArrowRight" && // Allow navigation right
      e.key !== "Tab" // Allow tab navigation
    ) {
      e.preventDefault(); // Prevent any other key from being entered
    }
  };

  // Handle change code ========================================================================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const rawValue = value.replace(/\D/g, "");
    const formattedValue = formatNumber(rawValue);

    setFormValues({
      ...formValues,
      [name]:
        name === "price" || name === "sale_price" ? formattedValue : value,
    });

    if (value.trim() !== "") {
      setErrorFields({
        ...errorFields,
        [name]: false,
      });
    }
  };

  // Handle submission code ===========================================================================================================================
  const handleFileUpload = async (
    selectedFile: string,
    filename: string
  ): Promise<MediaUploadResponseInterface | void> => {
    try {
      try {
        const response = await createMedia({
          image: selectedFile,
          filename,
        });

        if (response?.media) {
          return response?.media;
        }
      } catch (err: any) {
        return err;
      }
    } catch (error) {
      toast.error("Upload failed!");
      console.error("Error uploading file:", error);
      return;
    }
  };

  // Handle file to base64 code ========================================================================================================================
  useEffect(() => {
    const handleConvertToBase64 = async () => {
      if (mainImageFile?.length) {
        const base64 = await convertToBase64(mainImageFile[0]);
        // Do something with the base64 value if needed
        setMainImageFileBase64(base64);
      }

      if (otherImage1File?.length) {
        const base64 = await convertToBase64(otherImage1File[0]);
        // Do something with the base64 value if needed
        setOtherImage1FileBase64(base64);
      }

      if (otherImage2File?.length) {
        const base64 = await convertToBase64(otherImage2File[0]);
        // Do something with the base64 value if needed
        setOtherImage2FileBase64(base64);
      }

      if (otherImage3File?.length) {
        const base64 = await convertToBase64(otherImage3File[0]);
        // Do something with the base64 value if needed
        setOtherImage3FileBase64(base64);
      }
    };

    handleConvertToBase64();
  }, [mainImageFile, otherImage1File, otherImage2File, otherImage3File]);

  // Handle submission code ===========================================================================================================================
  const handleSubmit = async () => {
    try {
      const toastId = toast.loading("submitting product...");
      startTransition(async () => {
        try {
          let main_image = "";
          let other_image_1 = "";
          let other_image_2 = "";
          let other_image_3 = "";
          const id = generateId(8);

          const main_image_name =
            mainImageFile?.length &&
            `${formValues?.product_name
              .split(" ")
              .join("_")}_main_image_${id}_.${
              mainImageFile[0]?.type.split("/")[1]
            }`;
          const other_image_name_1 =
            otherImage1File?.length &&
            `${formValues?.product_name
              .split(" ")
              .join("_")}_other_image_1_${id}_.${
              otherImage1File[0]?.type.split("/")[1]
            }`;

          const other_image_name_2 =
            otherImage2File?.length &&
            `${formValues?.product_name
              .split(" ")
              .join("_")}_other_image_2_${id}_.${
              otherImage2File[0]?.type.split("/")[1]
            }`;

          const other_image_name_3 =
            otherImage3File?.length &&
            `${formValues?.product_name
              .split(" ")
              .join("_")}_other_image_3_${id}_.${
              otherImage3File[0]?.type.split("/")[1]
            }`;
          if (mainImageFileBase64 && main_image_name) {
            await handleFileUpload(mainImageFileBase64, main_image_name)
              .then((res) => {
                if (res?.url) {
                  return (main_image = res?.media_ref);
                }
              })
              .catch((err) => err);
          }
          if (otherImage1FileBase64 && other_image_name_1) {
            await handleFileUpload(otherImage1FileBase64, other_image_name_1)
              .then((res) => {
                if (res?.url) {
                  return (other_image_1 = res?.media_ref);
                }
              })
              .catch((err) => err);
          }
          if (otherImage2FileBase64 && other_image_name_2) {
            await handleFileUpload(otherImage2FileBase64, other_image_name_2)
              .then((res) => {
                if (res?.url) {
                  return (other_image_2 = res?.media_ref);
                }
              })
              .catch((err) => err);
          }
          if (otherImage3FileBase64 && other_image_name_3) {
            await handleFileUpload(otherImage3FileBase64, other_image_name_3)
              .then((res) => {
                if (res?.url) {
                  return (other_image_3 = res?.media_ref);
                }
              })
              .catch((err) => err);
          }
          const payload = {
            ...formValues,
            price: formValues.price.split(",").join(""),
            sale_price: formValues.sale_price.split(",").join(""),
            product_description: description,
            main_image,
            other_image_1,
            other_image_2,
            other_image_3,
            color: selectedColors,
            size: selectedSizes,
            status: "active",
          };

          const response = await createProduct(payload);

          if (!response?.product) {
            return toast.error("Product could not be created", {
              id: toastId,
            });
          }
          toast.success("Product created successfully", { id: toastId });
          setMainImageFile(null);
          setOtherImage1File(null);
          setOtherImage2File(null);
          setOtherImage3File(null);
          setMainImageFileBase64("");
          setOtherImage1FileBase64("");
          setOtherImage2FileBase64("");
          setOtherImage3FileBase64("");
          const prodPayload = {
            page_id: "1",
            page_size: "10",
          };
          await fetchProducts(prodPayload);
          router.push("/admin/product");
          return response?.product;
        } catch (err) {
          console.error("Error in:", err);
        }
      });
    } catch (err) {
      return err;
    }
  };

  const handleRemoveFromColorArray = (name: string) => {
    const removedColor = selectedColors?.filter((clr) => clr !== name);
    const replacedColor = colors?.filter((color) => color?.name === name).pop();

    setSelectedColors(removedColor);
    if (replacedColor) {
      setFilteredColors((clr) => [...clr, replacedColor]);
    }
  };

  const handleRemoveFromSizeArray = (name: string) => {
    const removedSize = selectedSizes?.filter((siz) => siz !== name);
    const replacedSize = sizes?.filter((size) => size?.name === name).pop();

    setSelectedSizes(removedSize);
    if (replacedSize) {
      setFilteredSizes((siz) => [...siz, replacedSize]);
    }
  };

  return (
    <div className="w-full z-10 mt-10 flex flex flex-col">
      <div className="w-full flex px-10 pt-4 pb-10 border-b-[1px] border-b-[#e0e0e0]">
        <FaArrowLeftLong
          color="#363435"
          className="mt-1 cursor-pointer"
          onClick={() => router.back()}
        />
        <p className="font-lato text-xl font-semibold text-[#363435] ml-4">
          Add new product
        </p>
      </div>

      <div className="w-full px-10 flex sm:flex-row flex-col justify-between">
        <div className="w-full sm:w-[50%] flex flex-col mt-12">
          <div className="mb-8">
            <Label
              htmlFor="product_name"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Product name
            </Label>
            <Input
              type="text"
              name="product_name"
              onChange={handleChange}
              value={formValues?.product_name}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
              )}
              // isError={errorFields.product_name}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="product_description"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Product description
            </Label>
            <textarea
              name="product_description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
              )}
              // isError={errorFields.product_description}
            ></textarea>
          </div>

          <div className="mb-8 space-y-1">
            <Label
              htmlFor="productCollection"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Product collection
            </Label>
            <Select
              onValueChange={(value: string) =>
                setFormValues({ ...formValues, collection: +value })
              }
            >
              <SelectTrigger
                className={twMerge(
                  "w-full sm:w-[80%] border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
                )}
              >
                <SelectValue
                  placeholder={
                    formValues?.collection ? formValues?.collection : ""
                  }
                />
              </SelectTrigger>
              <SelectContent className={twMerge("")}>
                <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#363435]/40 scrollbar-thin bg-[#4f4f4f] scrollbar-track-[#363435]-200 w-full sm:w-full">
                  {fetchedCollections?.collection?.length &&
                    fetchedCollections?.collection?.map((item, idx) => (
                      <SelectItem key={idx} value={item?.id}>
                        {item?.collection_name}
                      </SelectItem>
                    ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-8">
            <Label
              htmlFor="product_code"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Product code
            </Label>
            <Input
              type="text"
              name="product_code"
              onChange={handleChange}
              value={formValues?.product_code}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="flex justify-between w-full sm:w-[80%]">
            <div className="mb-8 w-[50%]">
              <Label
                htmlFor="price"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Product price naira
              </Label>
              <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                <TbCurrencyNaira size={20} className="mt-[9px] ml-2" />
                <Input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={formValues?.price}
                  onKeyDown={handleKeyDown}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                  )}
                  //   isError={errorFields.firstName}
                />
              </div>
            </div>

            <div className="mb-8 w-[50%]">
              <Label
                htmlFor="productPriceDollar"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Product price Dollar
              </Label>
              <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                <BsCurrencyDollar size={18} className="mt-[9px] ml-2" />
                <Input
                  type="number"
                  name="productSalesPriceDollar"
                  value={dollarPrice}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                  )}
                  readOnly
                />
              </div>
            </div>
          </div>

          <h2 className="font-medium text-xl font-lato text-[#363435] mb-6">
            Sales
          </h2>

          <div className="flex justify-between w-full sm:w-[80%]">
            <div className="mb-8 w-[50%]">
              <Label
                htmlFor="sale_price"
                className={twMerge(
                  "font-lato font-medium text-xs sm:text-sm text-[#363435]"
                )}
              >
                Product sales price naira
              </Label>
              <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                <TbCurrencyNaira size={20} className="mt-[9px] ml-2" />
                <Input
                  type="text"
                  name="sale_price"
                  onChange={handleChange}
                  value={formValues?.sale_price}
                  onKeyDown={handleKeyDown}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                  )}
                />
              </div>
            </div>

            <div className="mb-8 w-[50%]">
              <Label
                htmlFor="productSalesPriceDollar"
                className={twMerge(
                  "font-lato font-medium text-xs sm:text-sm text-[#363435]"
                )}
              >
                Product sales price Dollar
              </Label>
              <div className="flex mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-[80%] text-[#363435] w-[90%]">
                <BsCurrencyDollar size={18} className="mt-[9px] ml-2" />
                <Input
                  type="number"
                  name="productSalesPriceDollar"
                  value={saleDollarPrice}
                  className={twMerge(
                    "placeholder:text-[#363435] placeholder:text-sm rounded-lg w-[80%] p-2 text-[#363435] w-[90%] outline-none"
                  )}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-[50%] sm:bg-[#fafafa] sm:pt-8 sm:pb-12 sm:px-12 text-[#363435] mt-4 mb-12">
          <div className="flex flex-col">
            <p className="font-lato text-sm font-medium text-[#4f4f4f] mb-2">
              Main Image
            </p>
            {mainImageFile && mainImageFile?.length ? (
              <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9]">
                {isShowingMainOption ? (
                  <div className="absolute z-10 mb-[2.15rem] ml-[8.5rem] cursor-pointer">
                    <BsThreeDots
                      color="#ffffff"
                      onClick={() => setIsShowingMainOption(false)}
                    />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                    <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                      <p
                        onClick={() => setMainImageFile(null)}
                        className="font-lato text-sm font-normal text-[#ffffff]"
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                    <BsThreeDots
                      color="#ffffff"
                      onClick={() => setIsShowingMainOption(true)}
                    />
                  </div>
                )}
                <Image
                  src={URL.createObjectURL(mainImageFile[0])}
                  alt="section_img"
                  width={180}
                  height={180}
                />
              </div>
            ) : (
              <div
                {...getRootPropsMainImage()}
                className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] cursor-pointer"
              >
                <input {...getInputPropsMainImage()} />
                <GoPlus color="#363435" />
                <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                  Upload
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col mt-6">
            <p className="font-lato text-sm font-medium text-[#4f4f4f] mb-2">
              Other Images
            </p>
            <div className="flex">
              {otherImage1File && otherImage1File?.length ? (
                <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center mr-4 border-[#d9d9d9]">
                  {isShowingOther1Option ? (
                    <div className="absolute z-10 mb-[2.15rem] ml-[8.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() => setIsShowingOther1Option(false)}
                      />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                      <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                        <p
                          onClick={() => setOtherImage1File(null)}
                          className="font-lato text-sm font-normal text-[#ffffff]"
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() => setIsShowingOther1Option(true)}
                      />
                    </div>
                  )}
                  <Image
                    src={URL.createObjectURL(otherImage1File[0])}
                    alt="section_img"
                    width={180}
                    height={180}
                  />
                </div>
              ) : (
                <div
                  {...getRootPropsOtherImage1()}
                  className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4 cursor-pointer"
                >
                  <GoPlus color="#363435" />
                  <input {...getInputPropsOtherImage1()} />
                  <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                    Upload
                  </p>
                </div>
              )}

              {otherImage2File && otherImage2File?.length ? (
                <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center mr-4 border-[#d9d9d9]">
                  {isShowingOther2Option ? (
                    <div className="absolute z-10 mb-[2.15rem] ml-[8.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() => setIsShowingOther2Option(false)}
                      />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                      <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                        <p
                          onClick={() => setOtherImage2File(null)}
                          className="font-lato text-sm font-normal text-[#ffffff]"
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() => setIsShowingOther2Option(true)}
                      />
                    </div>
                  )}
                  <Image
                    src={URL.createObjectURL(otherImage2File[0])}
                    alt="section_img"
                    width={180}
                    height={180}
                  />
                </div>
              ) : (
                <div
                  {...getRootPropsOtherImage2()}
                  className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4 cursor-pointer"
                >
                  <GoPlus color="#363435" />
                  <input {...getInputPropsOtherImage2()} />
                  <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                    Upload
                  </p>
                </div>
              )}

              {otherImage3File && otherImage3File?.length ? (
                <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center mr-4 border-[#d9d9d9]">
                  {isShowingOther3Option ? (
                    <div className="absolute z-10 mb-[2.15rem] ml-[8.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() => setIsShowingOther3Option(false)}
                      />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                      <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                        <p
                          onClick={() => setOtherImage3File(null)}
                          className="font-lato text-sm font-normal text-[#ffffff]"
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-10 mb-[5rem] ml-[4.5rem] cursor-pointer">
                      <BsThreeDots
                        color="#ffffff"
                        onClick={() => setIsShowingOther3Option(true)}
                      />
                    </div>
                  )}
                  <Image
                    src={URL.createObjectURL(otherImage3File[0])}
                    alt="section_img"
                    width={180}
                    height={180}
                  />
                </div>
              ) : (
                <div
                  {...getRootPropsOtherImage3()}
                  className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4 cursor-pointer"
                >
                  <GoPlus color="#363435" />
                  <input {...getInputPropsOtherImage3()} />
                  <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                    Upload
                  </p>
                </div>
              )}

              {/* <div
                {...getRootPropsOtherImage2()}
                className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4 cursor-pointer"
              >
                <input {...getInputPropsOtherImage2()} />
                <GoPlus color="#363435" />
                {otherImage2File && otherImage2File[0]?.name ? (
                  <p className="text-sm text-[#363435]">
                    {otherImage2File[0]?.name.slice(0, 5)}
                  </p>
                ) : (
                  <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                    Upload
                  </p>
                )}
              </div> */}
              {/* <div
                {...getRootPropsOtherImage3()}
                className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] mr-4 cursor-pointer"
              >
                <input {...getInputPropsOtherImage3()} />
                <GoPlus color="#363435" />
                {otherImage3File && otherImage3File[0]?.name ? (
                  <p className="text-sm text-[#363435]">
                    {otherImage3File[0]?.name.slice(0, 5)}
                  </p>
                ) : (
                  <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                    Upload
                  </p>
                )}
              </div> */}
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="mb-8">
              <Label
                htmlFor="quantity"
                className={twMerge(
                  "font-lato font-medium text-sm text-[#363435]"
                )}
              >
                Input Quantity
              </Label>
              <Input
                type="text"
                name="quantity"
                onChange={handleChange}
                value={formValues?.quantity}
                className={twMerge(
                  "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full p-2 text-[#363435]"
                )}
              />
            </div>
          </div>

          <div className="mb-8 space-y-1">
            <Label
              htmlFor="color"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Select Color
            </Label>
            <Select
              onValueChange={(value: string) =>
                setSelectedColors((col) => [...col, value])
              }
            >
              <SelectTrigger
                className={twMerge(
                  "w-full border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
                )}
              >
                <SelectValue placeholder={"Select Colors"} />
              </SelectTrigger>
              <SelectContent className={twMerge("")}>
                <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#363435]/40 scrollbar-thin bg-[#4f4f4f] scrollbar-track-[#363435]-200 w-full sm:w-full">
                  {filteredColors?.length &&
                    filteredColors?.map((color, idx) => (
                      <SelectItem key={idx} value={color?.name}>
                        {color?.name}
                      </SelectItem>
                    ))}
                </div>
              </SelectContent>
            </Select>
            <div className="flex">
              {selectedColors && selectedColors?.length
                ? selectedColors?.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleRemoveFromColorArray(color)}
                      className="cursor-pointer text-xs text-[#363435] border-[0.5px] border-[#bdbdbd] p-1 rounded mr-2 mt-2"
                    >
                      {color}
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="mb-8 space-y-1">
            <Label
              htmlFor="size"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Select Size
            </Label>
            <Select
              onValueChange={(value: string) =>
                setSelectedSizes((siz) => [...siz, value])
              }
            >
              <SelectTrigger
                className={twMerge(
                  "w-full border-[#bdbdbd] bg-transparent text-[#363435] focus:ring-grocedy_primary_color focus-visible:ring-[1.5px]"
                )}
              >
                <SelectValue placeholder={"Select Sizes"} />
              </SelectTrigger>
              <SelectContent className={twMerge("")}>
                <div className="h-full max-h-60 overflow-y-scroll scrollbar-thumb-[#363435]/40 scrollbar-thin bg-[#4f4f4f] scrollbar-track-[#363435]-200 w-full sm:w-full">
                  {filteredSizes?.length &&
                    filteredSizes?.map((size, idx) => (
                      <SelectItem key={idx} value={size?.name}>
                        {size?.name}
                      </SelectItem>
                    ))}
                </div>
              </SelectContent>
            </Select>
            <div className="flex">
              {selectedSizes && selectedSizes?.length
                ? selectedSizes?.map((size, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleRemoveFromSizeArray(size)}
                      className="cursor-pointer text-xs text-[#363435] border-[0.5px] border-[#bdbdbd] p-1 rounded mr-2 mt-2"
                    >
                      {size}
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="flex">
            <div className="flex w-[120px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] cursor-pointer">
              <MdOutlineCancel color="#363435" />
              <p className="font-lato font-normal text-base text-[#4f4f4f] ml-2">
                Cancel
              </p>
            </div>

            <div
              onClick={() => handleSubmit()}
              className="flex w-[180px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] bg-[#4f4f4f] ml-6 cursor-pointer"
            >
              <Image
                src="/assets/save.svg"
                alt="avatar_img"
                width={20}
                height={22}
              />
              <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                Save new product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
