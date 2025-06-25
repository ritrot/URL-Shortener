import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { UrlState } from '../Contextapi';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Input } from './ui/input';
import * as yup from "yup";
import { Card } from './ui/card';
import { Button } from './ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import useFetch from '../hooks/UseFetch';
import { createUrl } from '../db/apiUrls';
import Error from './Error';
const CreateLink = () => {
    const { user } = UrlState();

    const navigate = useNavigate();
    const ref = useRef();

    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const {
        loading,
        error,
        data,
        fn: fnCreateUrl,
    } = useFetch(createUrl, { ...formValues, user_id: user.id });

    useEffect(() => {
        console.log("Error:", error, "Data:", data);

        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });
            const canvas = ref.current; 
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));
            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Dialog
            defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSearchParams({});
            }}
        >
            <DialogTrigger asChild>
                <Button variant="destructive">Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>
                {formValues?.longUrl && (
                    <QRCodeCanvas ref={ref} size={250} value={formValues?.longUrl} />
                )}

                <Input
                    id="title"
                    placeholder="Short Link's Title"
                    value={formValues.title}
                    onChange={handleChange}
                />
                {errors.title && <Error message={errors.title} />}
                <Input
                    id="longUrl"
                    placeholder="Enter your Loooong URL"
                    value={formValues.longUrl}
                    onChange={handleChange}
                />
                {errors.longUrl && <Error message={errors.longUrl} />}
                <div className="flex items-center gap-2">
                    <Card className="p-2">trimrr.in</Card> /
                    <Input
                        id="customUrl"
                        placeholder="Custom Link (optional)"
                        value={formValues.customUrl}
                        onChange={handleChange}
                    />
                </div>
                {error && <Error message={error.message || String(error)} />}

                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={createNewLink}
                        disabled={loading}
                    >
                        {"Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}







// import React, { useEffect, useRef, useState } from 'react'
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//     DialogFooter
// } from "@/components/ui/dialog"
// import { UrlState } from '../Contextapi';
// import { useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
// import { Input } from './ui/input';
// import * as yup from "yup";
// import { Card } from './ui/card';
// import { Button } from './ui/button';
// import { QRCode } from 'react-qrcode-logo';
// import { QRCodeCanvas } from 'qrcode.react';
// import useFetch from '../hooks/UseFetch';
// import { createUrl } from '../db/apiUrls';
// const CreateLink = () => {
//     const navigate = useNavigate();
//     const { user } = UrlState();
//     let [searchParams, setSearchParams] = useSearchParams();
//     const longLink = searchParams.get("createNew")
//     const ref = useRef();

//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         title: "",
//         longUrl: longLink ? longLink : "",
//         customUrl: "",
//     })

//     const schema = yup.object().shape({
//         title: yup.string().required("Title is required"),
//         longUrl: yup
//             .string()
//             .url("Must be a valid URL")
//             .required("Long URL is required"),
//         customUrl: yup.string(),
//     })

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.id]: e.target.value
//         })
//     }

//     const { loading, error, data, fn: createFn } = useFetch(createUrl, { ...formData, user_id: user.id })

//     const createLink = async () => {
//         setErrors({});
//         try {
//             await schema.validate(formData, { abortEarly: false });
//             const canvas = ref.current.canvasRef.current;
//             const blob = await new Promise((resolve) => {
//                 canvas.toBlob(resolve);
//             });
//             await createFn(blob);
//         } catch (e) {
//             const newErrors = {};

//             e?.inner?.forEach((err) => {
//                 newErrors[err.path] = err.message;
//             });

//             setErrors(newErrors);
//         }
//     }

//     useEffect(() => {
//         if (error === null && data) {
//             navigate(`/link/${data[0].id}`);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [error, data]);

//     return (
//         <Dialog
//             DefualtOpen={longLink}
//             onOpenChange={(res) => {
//                 if (!res) setSearchParams({});
//             }}
//         >
//             <DialogTrigger>Open</DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Create Link</DialogTitle>
//                 </DialogHeader>
//                 {formData?.longUrl && (
//                     // <QRCode ref={ref} size={250} value={formData?.longUrl} />
//                     <QRCodeCanvas ref={ref} size={250} value={formData?.longUrl} />
//                 )}
//                 <Input
//                     placeholder='Enter Title'
//                     id="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                 />
//                 {errors.title && <Error message={errors.title} />}
//                 <Input
//                     placeholder='Enter the Long URL'
//                     id="longUrl"
//                     value={formData.longUrl}
//                     onChange={handleChange}
//                 />
//                 {errors.longUrl && <Error message={errors.longUrl} />}
//                 <div className='flex items-center gap-2'>
//                     <Card className="p-2">trimrr.in</Card> /
//                     <Input
//                         placeholder='Enter the Custom URL (optional)'
//                         id="customUrl"
//                         value={formData.customUrl}
//                         onChange={handleChange}
//                     />
//                 </div >
//                 {/* {error.message && <Error message={error.message} />} */}
//                 <DialogFooter>
//                     <Button onClick={createLink} disabled={loading} variant="outline">New Link</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     )
// }

export default CreateLink
