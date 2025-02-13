import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_RESET;

export default function AttendeeDetails() {
    const [imageUrl, setImageUrl] = useState(null);
    const [credential, setCredential] = useState({
        name: "",
        email: "",
        specialRequest: "",
    });
    const [state, setState] = useState<{ loading: boolean; errorMessage: string | null }>({
        loading: false,
        errorMessage: null
    })
    const { errorMessage, loading } = state;
    const navigate = useNavigate()
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().required("Email is required").email("Invalid email"),
        specialRequest: yup.string().required("Special request is required")
    })

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const { name, email, specialRequest } = credential;

    interface FileWithPreview extends File {
        preview: string;
    }

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
            setState(prev => ({ ...prev, loading: true }))
            const file = acceptedFiles[0] as FileWithPreview;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", UPLOAD_PRESET);

            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData);

            console.log("Successful upload", data)
            setImageUrl(data.secure_url);
            setState(prev => ({ ...prev, loading: false }))
            return data.secure_url;
        } catch (error: any) {
            console.error("Could not submit file", error.message)
            if (error) {
                setState(prev => ({ ...prev, errorMessage: "Could not submit file" }))
            }
        }

    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCredential(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } });

    const onSubmit = () => {
        console.log("submitting")
        setState(prev => ({ ...prev, loading: true }))
        try {

            if (!credential || !imageUrl) {
                console.log("fill in all the form")
                setState(prev => ({ ...prev, errorMessage: "Fill in the form" }))
            }
            const data = {
                name,
                email,
                specialRequest,
                imageUrl,
            }
            localStorage.setItem("personInfo", JSON.stringify(data))
            navigate('/book-ticket')
        } catch (err: any) {
            setState(prev => ({ ...prev, loading: false, errorMessage: err.message }))
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl relative z-10  p-4 md:p-8 min-h-[38rem] grid gap-4 md:gap-8 border-[#0E464F] w-[90%] md:w-[48rem] bg-[#04272e] mx-auto border">
    
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl">Ticket Selection</h2>
                <p className="text-sm md:text-base">Step 2/3</p>
            </div>


            <span className="w-full h-1 relative after:bottom-0 after:left-0 after:absolute after:top-0 after:right-[50%] after:bg-[#24A0B5] after:content-[''] bg-[#2C545B]"></span>

            <div className="border-[#0E464F] relative grid gap-4 rounded-2xl p-2 md:p-4 border">
                <h1 className="text-lg md:text-xl w-fit inline-block">Upload Profile Photo</h1>
                <small className="text-red-500 text-center md:text-left md:relative md:-top-10 md:left-[16rem] md:mx-auto md:w-fit md:ml-8">{errorMessage}</small>

           
                <div className="bg-[#041E23] h-[8rem] sm:h-[10rem] md:h-[12rem] relative">
                    <div {...getRootProps()} className="border-2 absolute w-[80%] sm:w-[60%] md:w-[15rem] border-[#24A0B5] h-fit min-h-[10rem] p-4 bg-[#249fb54b] rounded-[2rem] -top-5 left-1/2 -translate-x-1/2 text-center cursor-pointer">
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
                                        <span className="animate-spin inline-block"><RiLoader2Fill /></span> : 
                                        "Drag & drop or click to upload"
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>

    
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
                            />
                        </label>
                        {errors?.name?.message && (
                            <small className="text-red-600 block mt-1">{errors.name.message}</small>
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
                                />
                            </div>
                        </label>
                        {errors?.email?.message && (
                            <small className="text-red-600 block mt-1">{errors.email.message}</small>
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
                            />
                        </label>
                        {errors?.specialRequest?.message && (
                            <small className="text-red-600 block mt-1">{errors.specialRequest.message}</small>
                        )}
                    </div>
                </div>

           
                <div className="flex relative z-10 gap-4 flex-col md:flex-row">
                    <button onClick={() => navigate(-1)} className="w-full transition-colors cursor-pointer p-3 md:p-4 border border-[#24A0B5] bg-[#041E23] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-[#f4f4f4] rounded-md text-sm md:text-base">
                        Back
                    </button>
                    <button disabled={loading} type="submit" className="w-full p-3 md:p-4 bg-[#24A0B5] border-[#24A0B5] text-[#f4f4f4] hover:bg-[#041E23] hover:text-[#24A0B5] rounded-md text-sm md:text-base">
                        {loading ? "Wait..." : "Get My Free Ticket"}
                    </button>
                </div>
            </div>
        </form>
    );
}
