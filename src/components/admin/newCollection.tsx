"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { shallow } from "zustand/shallow";
import { Input } from "../ui/input";
import { useDropzone } from "react-dropzone";
import { GoPlus } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { convertToBase64, generateId } from "@/utils/functions";
import { MediaUploadResponseInterface } from "@/utils/interface";
import { toast } from "sonner";
import { useMediaStore } from "@/store/mediaStore";
import { useCollectionStore } from "@/store/collectionStore";
import { BsThreeDots } from "react-icons/bs";

const NewCollection = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File[] | null>([]);
  const [isShowingThumbnailFileOption, setIsShowingThumbnailFileOption] =
    useState<boolean>(false);
  const [headerFile, setHeaderFile] = useState<File[] | null>([]);
  const [isShowingHeaderFileOption, setIsShowingHeaderFileOption] =
    useState<boolean>(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [thumbnailFileBase64, setThumbnailFileBase64] = useState<any>("");
  const [headerFileBase64, setHeaderFileBase64] = useState<any>("");
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const [formValues, setFormValues] = useState({
    collection_name: "",
    collection_description: "",
    thumbnail_image: "",
    header_image: "",
  });
  const [errorFields, setErrorFields] = useState({
    collection_name: false,
    collection_description: false,
    thumbnail_image: false,
    header_image: false,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Drag n Drop code ========================================================================================================================
  const onDropFirst = useCallback((acceptedFiles: any) => {
    const mappedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setThumbnailFile(mappedFiles);
  }, []);

  const onDropSecond = useCallback((acceptedFiles: any) => {
    const mappedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setHeaderFile(mappedFiles);
  }, []);

  const { getRootProps: getRootPropsFirst, getInputProps: getInputPropsFirst } =
    useDropzone({ onDrop: onDropFirst });

  const {
    getRootProps: getRootPropsSecond,
    getInputProps: getInputPropsSecond,
  } = useDropzone({ onDrop: onDropSecond });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Handle change code ========================================================================================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (value.trim() !== "") {
      setErrorFields({
        ...errorFields,
        [name]: false,
      });
    }
  };

  // Handle file to base64 code ========================================================================================================================
  useEffect(() => {
    const handleConvertToBase64 = async () => {
      if (thumbnailFile?.length) {
        const base64 = await convertToBase64(thumbnailFile[0]);
        // Do something with the base64 value if needed
        setThumbnailFileBase64(base64);
      }

      if (headerFile?.length) {
        const base64 = await convertToBase64(headerFile[0]);
        // Do something with the base64 value if needed
        setHeaderFileBase64(base64);
      }
    };

    handleConvertToBase64();
  }, [thumbnailFile, headerFile]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Handle submission code ===========================================================================================================================
  const { createMedia } = useMediaStore(
    (state: any) => ({
      createMedia: state.createMedia,
    }),
    shallow
  );

  const { createCollection, fetchCollections } = useCollectionStore(
    (state: any) => ({
      createCollection: state.createCollection,
      fetchCollections: state.fetchCollections,
    }),
    shallow
  );

  /* eslint-enable @typescript-eslint/no-explicit-any */

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        return err;
      }
    } catch (error) {
      toast.error("Upload failed!");
      console.error("Error uploading file:", error);
      return;
    }
  };

  // Handle submission code ===========================================================================================================================
  const handleSubmit = async () => {
    try {
      const toastId = toast.loading("submitting collection...");
      startTransition(async () => {
        try {
          let thumbnail_image = "";
          let header_image = "";
          const id = generateId(8);

          const thumbnail_image_name =
            thumbnailFile?.length &&
            `${formValues?.collection_name
              .split(" ")
              .join("_")}_thumbnail_${id}_.${
              thumbnailFile[0]?.type.split("/")[1]
            }`;
          const header_image_name =
            headerFile?.length &&
            `${formValues?.collection_name
              .split(" ")
              .join("_")}_header_${id}_.${headerFile[0]?.type.split("/")[1]}`;

          if (thumbnailFileBase64 && thumbnail_image_name) {
            await handleFileUpload(thumbnailFileBase64, thumbnail_image_name)
              .then((res) => {
                if (res?.url) {
                  return (thumbnail_image = res?.url);
                }
              })
              .catch((err) => err);
          }

          if (headerFileBase64 && header_image_name) {
            await handleFileUpload(headerFileBase64, header_image_name)
              .then((res) => {
                if (res?.url) {
                  return (header_image = res?.url);
                }
              })
              .catch((err) => err);
          }

          const payload = {
            ...formValues,
            collection_description: description,
            thumbnail_image,
            header_image,
          };

          const response = await createCollection(payload);

          if (!response?.collection) {
            return toast.error("Collection could not be created", {
              id: toastId,
            });
          }
          toast.success("Collection created successfully", { id: toastId });
          setThumbnailFile(null);
          setHeaderFile(null);
          setThumbnailFileBase64("");
          setHeaderFileBase64("");

          const collPayload = {
            page_id: "1",
            page_size: "10",
          };

          await fetchCollections(collPayload);

          router.push("/admin/collection");
          return response?.collection;
        } catch (err) {
          console.error("Error in:", err);
        }
      });
    } catch (err) {
      return err;
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
          Create new collection
        </p>
      </div>

      <div className="w-full px-10 flex sm:flex-row flex-col justify-between">
        <div className="w-full sm:w-[50%] flex flex-col mt-12">
          <div className="mb-8">
            <Label
              htmlFor="collection_name"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Collection name
            </Label>
            <Input
              type="text"
              name="collection_name"
              onChange={handleChange}
              value={formValues?.collection_name}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
              )}
              //   isError={errorFields.firstName}
            />
          </div>

          <div className="mb-8">
            <Label
              htmlFor="collection_description"
              className={twMerge(
                "font-lato font-medium text-sm text-[#363435]"
              )}
            >
              Description Text/Paragraph
            </Label>
            <textarea
              name="collection_description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={twMerge(
                "mt-2 placeholder:text-[#363435] placeholder:text-sm rounded-lg border-[0.6px] border-[#bdbdbd] w-full sm:w-[80%] p-2 text-[#363435]"
              )}
              // isError={errorFields.collection_description}
            ></textarea>
          </div>

          <div className="flex flex-col mb-8">
            <p className="font-lato text-sm font-medium text-[#4f4f4f] mb-2">
              Thumbnail Image
            </p>
            {thumbnailFile && thumbnailFile?.length ? (
              <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center mr-4 border-[#d9d9d9]">
                {isShowingThumbnailFileOption ? (
                  <div className="absolute z-10 mb-[2.15rem] ml-[8.5rem] cursor-pointer">
                    <BsThreeDots
                      color="#ffffff"
                      onClick={() => setIsShowingThumbnailFileOption(false)}
                    />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                    <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                      <p
                        onClick={() => setThumbnailFile(null)}
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
                      onClick={() => setIsShowingThumbnailFileOption(true)}
                    />
                  </div>
                )}
                <Image
                  src={URL.createObjectURL(thumbnailFile[0])}
                  alt="section_img"
                  width={180}
                  height={180}
                />
              </div>
            ) : (
              <div
                {...getRootPropsFirst()}
                className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] cursor-pointer"
              >
                <input {...getInputPropsFirst()} />
                <GoPlus color="#363435" />
                <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                  Upload
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col mb-8">
            <p className="font-lato text-sm font-medium text-[#4f4f4f] mb-2">
              Header Image
            </p>
            {headerFile && headerFile?.length ? (
              <div className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center mr-4 border-[#d9d9d9]">
                {isShowingHeaderFileOption ? (
                  <div className="absolute z-10 mb-[2.15rem] ml-[8.5rem] cursor-pointer">
                    <BsThreeDots
                      color="#ffffff"
                      onClick={() => setIsShowingHeaderFileOption(false)}
                    />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#333333]-50 relative bottom-[5px] left-[3px]"></div>
                    <div className="w-[80px] py-2 rounded bg-[#333333] flex flex-col items-center justify-center relative right-[4rem] bottom-[5px]">
                      <p
                        onClick={() => setHeaderFile(null)}
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
                      onClick={() => setIsShowingHeaderFileOption(true)}
                    />
                  </div>
                )}
                <Image
                  src={URL.createObjectURL(headerFile[0])}
                  alt="section_img"
                  width={180}
                  height={180}
                />
              </div>
            ) : (
              <div
                {...getRootPropsSecond()}
                className="flex flex-col w-[104px] h-[104px] rounded-sm justify-center border-[1px] items-center border-[#d9d9d9] cursor-pointer"
              >
                <input {...getInputPropsSecond()} />
                <GoPlus color="#363435" />

                <p className="font-lato font-normal text-sm text-[#000000] text-opacity-[45%]">
                  Upload
                </p>
              </div>
            )}
          </div>

          <div className="flex mt-4 mb-8">
            <div className="flex w-[120px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] cursor-pointer">
              <MdOutlineCancel color="#363435" />
              <p className="font-lato font-normal text-base text-[#4f4f4f] ml-2">
                Cancel
              </p>
            </div>

            {isPending ? (
              <div className="flex w-[180px] h-[48px] rounded-sm justify-center border-[0.8px] items-center border-[#4f4f4f] bg-[#4f4f4f] ml-6 cursor-pointer">
                <p className="font-lato font-normal text-sm text-[#ffffff] ml-2">
                  Loading...
                </p>
              </div>
            ) : (
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
                  Save new collection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
