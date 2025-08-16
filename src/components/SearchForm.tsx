import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { searchByHandler } from "../api/DevTreeAPI";
import { Link } from "react-router-dom";


export const SearchForm = () => {

    const { register, formState: { errors }, handleSubmit, watch } = useForm(
        {
            defaultValues: {
                handle: "",
            },
        }
    );

    const mutation = useMutation({
        mutationFn: searchByHandler
    })

    const handle = watch("handle");

    const handleSearch = () => {

        const slug = slugify(handle)

        mutation.mutate(slug)

    }   

    console.log(mutation);
    
        
    return (
        <>
            <form
                onSubmit={handleSubmit(handleSearch)}
                className="space-y-5">
                <div className="relative flex items-center  bg-white  px-2">
                    <label
                        htmlFor="handle"
                    >devtree.com/</label>
                    <input
                        type="text"
                        id="handle"
                        className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                        placeholder="elonmusk, zuck, jeffbezos"
                        {...register("handle", {
                            required: "Un Nombre de Usuario es obligatorio",
                        })}
                    />

                </div>
                {errors.handle && (
                    <ErrorMessage>{errors.handle.message}</ErrorMessage>
                )}

                <div className="mt-10">
                    {mutation.isPending && <p className="text-center" >Loading...</p>}
                    {mutation.error && <p className="text-center text-red-600 font-black" >{mutation.error.message}</p>}
                    {mutation.data && <p className="text-center text-cyan-500 font-black" >{mutation.data} go to <Link state={{handle: slugify(handle)}} className="cursor-pointer" to={'/auth/register'}>Register</Link></p>}

                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Obtener mi DevTree'
                />
            </form>
        </>
    )
}
