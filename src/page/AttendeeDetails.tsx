import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import useErrorTImeout from "../hook/useTImeout";
import { motion } from "framer-motion";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_RESET;


interface FormErrorType {
    name?: string;
    email?: string;
    specialRequest?: string;
}

interface ErrorState {
    message: string;
    type?: string;
}
export default function AttendeeDetails() {
    const [imageUrl, setImageUrl] = useState(() => {
        const saved = localStorage.getItem('userUrl');
        return saved ? saved : null
    });
    const [credential, setCredential] = useState<{ name: string; email: string; specialRequest: string }>(() => {
        const saved = localStorage.getItem("userInfo")
        return saved ? JSON.parse(saved) : {
            name: "",
            email: "",
            specialRequest: "",
        }
    });
    const [state, setState] = useState<{ loading: boolean; errorMessage: string | null }>({
        loading: false,
        errorMessage: null
    })
    const [timeoutError, setTimeoutError] = useErrorTImeout<ErrorState | null>(null)
    const [formError, setFormError] = useErrorTImeout<FormErrorType | null | ErrorState>(null)



    const { loading } = state;
    const navigate = useNavigate()
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required").email("Invalid email"),
        specialRequest: yup.string().required("Special request is required")
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (errors?.name?.message || errors?.email?.message || errors?.specialRequest?.message) {
            setFormError({
                name: errors?.name?.message,
                email: errors?.email?.message,
                specialRequest: errors?.specialRequest?.message,
            })
        }

    }, [errors, setFormError])

    useEffect(() => {
        if (imageUrl) {
            localStorage.setItem("userUrl", imageUrl)
        }
    }, [imageUrl])
    useEffect(() => {

        localStorage.setItem("userInfo", JSON.stringify(credential))

    }, [credential])

    const clearTempStorage = () => {
        localStorage.removeItem('userUrl');
        localStorage.removeItem('userInfo');
    };




    const { name, email, specialRequest } = credential;

    interface FileWithPreview extends File {
        preview: string;
    }

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const file = acceptedFiles[0] as FileWithPreview;

            const maxSize = 5 * 1024 * 1024;

            if (file.size > maxSize) {
                throw new Error("File size exceeds 5MB limit");
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);

            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData);

            console.log("Successful upload", data)
            setImageUrl(data.secure_url);
            setState(prev => ({ ...prev, loading: false, errorMessage: "" }))
            return data.secure_url;
        } catch (error: any) {
            console.error("Could not submit file", error?.message)
            if (error) {
                setState(prev => ({ ...prev, errorMessage: "Could not submit file" }))
                setTimeoutError({ message: "Could not submit file" })
            }
        }

    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setCredential(prevState => {
            const newState = { ...prevState, [name]: value } as { name: string; email: string; specialRequest: string };
            localStorage.setItem("userInfo", JSON.stringify(newState))
            return newState
        })
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } });

    const onSubmit = () => {
        console.log("submitting")
        setState(prev => ({ ...prev, loading: true }))

        try {

            if (imageUrl === "" || imageUrl === null || !imageUrl) {
                const errorMsg = "Provide your image";
                setState(prev => ({ ...prev, loading: false, errorMessage: errorMsg }));
                setTimeoutError({ message: errorMsg });
                return;
            }

            if (!credential || !imageUrl) {
                const errorMsg = "Fill in the form";
                setState(prev => ({ ...prev, loading: false, errorMessage: errorMsg }));
                setTimeoutError({ message: errorMsg });
                return;
            }

            setState(prev => ({ ...prev, loading: true, errorMessage: "" }));
            const data = {
                name,
                email,
                specialRequest,
                imageUrl,
            };
            localStorage.setItem("personInfo", JSON.stringify(data));
            clearTempStorage();
            navigate('/book-ticket');
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "An unknown error occurred";
            setTimeoutError({ message: errorMsg });
            setState(prev => ({ ...prev, loading: false, errorMessage: errorMsg }));
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="attendee-details-title" className="rounded-2xl animate__animated animate__fadeInDown relative z-10  p-4 md:p-8 min-h-[38rem] grid gap-4 md:gap-8 border-[#0E464F] w-[90%] md:w-[48rem] bg-[#04272e] mx-auto border">
            <h1 id="attendee-details-title" className="sr-only">Attendee Details Form</h1>
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="flex justify-between items-center"
            >
                <h2 className="text-base md:text-lg font-semibold">Ready</h2>
                <p className="text-sm md:text-base ">Step 2/3</p>
            </motion.div>


            <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="w-full h-1 mb-8 relative after:bottom-0 after:left-0 after:absolute after:top-0 after:right-[55%] after:bg-[#24A0B5] after:content-[''] bg-[#2C545B]"
            />

            <div className="border-[#0E464F] relative grid gap-4 rounded-2xl p-2 md:p-4 border">
                <h1 className="text-lg md:text-xl w-fit inline-block">Upload Profile Photo</h1>


                <div className="bg-[#041E23] h-[8rem] sm:h-[10rem] md:h-[10rem] relative">
                    <div {...getRootProps()} role="button" tabIndex={0} aria-label="Upload profile photo. Click or drag and drop an image file here." className="border-2 absolute w-[80%] sm:w-[60%] md:w-[15rem] border-[#24A0B5] h-fit min-h-[10rem] md:h-[12rem] p-4 bg-[#249fb54b]  rounded-[2rem] -top-5 left-1/2 -translate-x-1/2 text-center cursor-pointer">
                        <input type="file" {...getInputProps()} />
                        {imageUrl ? (
                            <img src={imageUrl} alt="Uploaded" className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md" />
                        ) : (
                            <div className="text-center p-4">
                                <span className="inline-block mx-auto mb-2">
                                    <AiOutlineCloudDownload size={24} className="mx-auto" />
                                </span>
                                <p className="text-sm md:text-base">
                                    {loading ?
                                        <span className="animate-spin inline-block"><RiLoader2Fill /></span> : (<>
                                            <p> Drag & drop or click to upload</p>
                                            <small className="text-red-500 absolute left-8 bottom-2 text-[.4rem] ">image of [jpg,png,jpeg,webp] and max size of 5MB</small>
                                        </>)

                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <small role="alert" className="text-red-500 text-center">
                    {timeoutError?.message}
                </small>

                <div className="grid gap-6">

                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm md:text-base">
                            Enter Your Name
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                name="name"
                                className="mt-2 p-3 border border-[#0E464F] outline-[#24A0B5] rounded text-white w-full text-sm md:text-base"
                                value={name}
                                onChange={onChange}
                                aria-invalid={errors.name ? "true" : "false"}
                                aria-describedby={errors.name ? "name-error" : undefined}
                            />
                        </label>
                        {formError && "name" in formError && formError?.name && (
                            <small id="name-error" role="alert" className="text-red-600 animate-pulse block mt-1">{formError.name}</small>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm md:text-base">
                            Enter your email *
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                                    <MdOutlineEmail />
                                </span>
                                <input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-2 pl-10 p-3 border border-[#0E464F] outline-[#24A0B5] rounded text-white w-full text-sm md:text-base"
                                    value={email}
                                    onChange={onChange}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                            </div>
                        </label>
                        {formError && "email" in formError && formError.email && (
                            <small id="email-error" role="alert" className="text-red-600 animate-pulse block mt-1">{formError?.email}</small>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="specialRequest" className="block text-sm md:text-base">
                            Special request?
                            <textarea
                                {...register("specialRequest")}
                                id="specialRequest"
                                name="specialRequest"
                                placeholder="Any special requirements?"
                                className="mt-2 p-3 border border-[#0E464F] h-[8rem] md:h-[10rem] outline-[#24A0B5] rounded text-white w-full text-sm md:text-base"
                                value={specialRequest}
                                onChange={onChange}
                                aria-invalid={errors.specialRequest ? "true" : "false"}
                                aria-describedby={errors.specialRequest ? "specialRequest-error" : undefined}
                            />
                        </label>
                        {formError && "specialRequest" in formError && formError.specialRequest && (
                            <small id="specialRequest-error" role="alert" className="text-red-600 animate-pulse  block mt-1">{formError.specialRequest}</small>
                        )}
                    </div>
                </div>


                <div className="flex relative  z-10 gap-4 flex-col md:flex-row">
                    <button onClick={() => {
                        clearTempStorage();
                        navigate(-1)
                    }} className="w-full transition-colors cursor-pointer p-3 md:p-4 border border-[#24A0B5] bg-[#041E23] text-[#24A0B5] hover:scale-[1.05]  hover:bg-[#24A0B5] hover:text-[#f4f4f4] rounded-md text-sm md:text-base">
                        Back
                    </button>
                    <button disabled={loading} type="submit" className="w-full p-3 md:p-4 bg-[#24A0B5] border-[#24A0B5] text-[#f4f4f4] hover:scale-[1.05] cursor-pointer border  hover:bg-[#041E23] hover:text-[#24A0B5] rounded-md text-sm md:text-base">
                        {loading ? "Wait..." : "Get My Free Ticket"}
                    </button>
                </div>
            </div>
        </form>
    );
}
