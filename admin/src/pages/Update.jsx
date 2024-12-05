import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Update = ({ token }) => {
    const { id } = useParams();

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    // Fetch existing product data when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/product/single`,
                    { productId: id },
                    { headers: { token } }
                );

                if (response.data.success) {
                    const product = response.data.product;
                    setImage1(product.image[0])
                    setImage2(product.image[1])
                    setImage3(product.image[2])
                    setImage4(product.image[3])

                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price);
                    setCategory(product.category);
                    setSubCategory(product.subCategory);
                    setBestseller(product.bestseller);
                    setSizes(product.sizes || []);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch product data");
            }
        };

        fetchProduct();
    }, [id, token]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("productId", id); // Include the product ID for the update
            name && formData.append("name", name);
            description && formData.append("description", description);
            price && formData.append("price", price);
            category && formData.append("category", category);
            subCategory && formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            sizes.length > 0 && formData.append("sizes", JSON.stringify(sizes));

            if (image1 instanceof File) formData.append("image1", image1);
            if (image2 instanceof File) formData.append("image2", image2);
            if (image3 instanceof File) formData.append("image3", image3);
            if (image4 instanceof File) formData.append("image4", image4);
            
            const response = await axios.post(
                `${backendUrl}/api/product/update`,
                formData,
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    <label htmlFor="image1">
                        <img
                            className="w-20"
                            src={
                                image1
                                    ? image1 instanceof File // Check if it's a File object
                                        ? URL.createObjectURL(image1) // Create object URL for the uploaded file
                                        : image1 // Use the string value (assumed to be a valid URL)
                                    : assets.upload_area // Fallback to default
                            }
                            alt="Uploaded or default placeholder"
                        />

                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img
                            className="w-20"
                            src={
                                image3
                                    ? image2 instanceof File // Check if it's a File object
                                        ? URL.createObjectURL(image2) // Create object URL for the uploaded file
                                        : image2 // Use the string value (assumed to be a valid URL)
                                    : assets.upload_area // Fallback to default
                            }
                            alt="Uploaded or default placeholder"
                        />

                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img
                            className="w-20"
                            src={
                                image3
                                    ? image3 instanceof File // Check if it's a File object
                                        ? URL.createObjectURL(image3) // Create object URL for the uploaded file
                                        : image3 // Use the string value (assumed to be a valid URL)
                                    : assets.upload_area // Fallback to default
                            }
                            alt="Uploaded or default placeholder"
                        />

                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img
                            className="w-20"
                            src={
                                image4
                                    ? image4 instanceof File // Check if it's a File object
                                        ? URL.createObjectURL(image4) // Create object URL for the uploaded file
                                        : image4 // Use the string value (assumed to be a valid URL)
                                    : assets.upload_area // Fallback to default
                            }
                            alt="Uploaded or default placeholder"
                        />

                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            {/* Other input fields for name, description, category, subCategory, price, sizes, etc. */}
            <div className="w-full">
                <p className="mb-2">Product name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Type here"
                />
            </div>

            <div className="w-full">
                <p className="mb-2">Product description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Write content here"
                />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                <div>
                    <p className='mb-2'>Product category</p>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Sub category</p>
                    <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
                </div>

            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3'>
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                        <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
                <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
            </div>

            {/* Add remaining form fields (category, subCategory, price, sizes, bestseller) */}
            <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
                UPDATE
            </button>
        </form>
    );
};

export default Update;
