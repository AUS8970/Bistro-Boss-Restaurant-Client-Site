import React from 'react';
import { FaUtensils } from 'react-icons/fa6';
import SectionTitle from '../../components/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

// image hosting api
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItems = () => {

  // load data by id
  const {name, category, recipe, price, _id} = useLoaderData();

  // axios 
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // react-hook-form
  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  // submit form
  const onSubmit = async (data) => {
    console.log(data);

    // upload image in imgbb
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type' : 'multipart/form-data'
      }
    });

    if(res.data.success){
      // send data in server
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      }
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem)
      console.log('with url', menuRes.data)
      if(menuRes.data.modifiedCount > 0){
        // show success message by swal
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    console.log(res.data);

    reset();
  };

  return (
    <div>
      <SectionTitle heading={"Update ITEM"} subHeading={"Are you sure?"} />
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Recipe Name */}
          <div className="form-control w-full ">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text"> Recipe Name* </span>
              </div>
              <input
                {...register('name', {required: true})}
                defaultValue={name}
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered w-full" />
              {errors.name && <span className="text-red-500 ml-2 mt-1"> Name is required </span>}
            </label>
          </div>
          <div className="flex gap-8">
            {/* Category */}
            <div className="form-control w-full ">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text"> Category* </span>
                </div>
                <select
                  {...register('category', {required: true})}
                  type="text"
                  defaultValue={category}
                  placeholder="Category"
                  className="select select-bordered w-full" >
                  <option disabled value="default"> Select a category </option>
                  <option value="salad"> Salad </option>
                  <option value="pizza"> Pizza </option>
                  <option value="soup"> Soup </option>
                  <option value="dessert"> Dessert </option>
                  <option value="drinks"> Drinks </option>
                </select>
                {errors.category && <span className="text-red-500 ml-2 mt-1"> Category is required </span>}
              </label>
            </div>
            {/* Price */}
            <div className="form-control w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text"> Price* </span>
                </div>
                <input
                  {...register('price', {required: true})}
                  type="number"
                  defaultValue={price}
                  placeholder="Price"
                  className="input input-bordered w-full" />
                  {errors.price && <span className="text-red-500 ml-2 mt-1"> Price is required </span>}
              </label>
            </div>
          </div>
          {/* Recipe Details */}
          <div className="form-control w-full ">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text"> Recipe Details* </span>
              </div>
              <textarea
                {...register('recipe', {required: true})}
                type="text"
                defaultValue={recipe}
                placeholder="Recipe Details"
                className="textarea textarea-bordered w-full" />
              {errors.recipe && <span className="text-red-500 ml-2 mt-1"> Recipe is required </span>}
            </label>
          </div>
          {/* Image */}
          <div className="form-control w-full">
            <input 
              {
                ...register('image', {
                  required: "Image is required",
                  validate: {
                    fileType: (value) => value[0]?.type.startsWith("image/") || "File must be an image",
                    fileSize: (value) => value[0]?.size < 5 * 1024 * 1024 || "File size must be less than 5MB",
                  },
                })
              }
              type="file" 
              className="file-input w-full max-w-xs"
            />
            {errors.image && <span className="text-red-500 ml-2 mt-1">{errors.image.message}</span>}
          </div>
          <button className='btn'> 
            Update Items 
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItems;