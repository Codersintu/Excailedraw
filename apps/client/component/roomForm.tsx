import { BACKEND_URL } from "@repo/backend-common/config";
import axios from "axios";
import { Cross, Loader, Pencil } from "lucide-react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm,Controller } from "react-hook-form";
type FormValues={
  ReactDatepicker:string,
  Roomcreator:string
}
export default function RoomForm() {
 const router = useRouter();
 const {handleSubmit,control,formState:{isSubmitting}}=useForm<FormValues>()
 const onSubmit =async (data: FormValues) => {
       const session = await getSession();
       const res = await axios.post(`${BACKEND_URL}/api/v1/room`,{
               name:data.Roomcreator,
       },{
           headers:{
               Authorization: session?.user.accessToken || ""
           }
       }); 
       router.push(`/canvas/${res.data.room.id}`);
 };
  return (
    <div className="flex justify-center items-center absolute inset-0 z-50 bg-white/40 ">
      <div className="max-w-2xl flex shadow-2xl bg-white px-10 py-10 rounded-2xl">
        <form className="flex flex-col justify-center items-center gap-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center items-center gap-2">
          <Pencil className="w-12 h-12 text-blue-700"/>
          <p className="text-xl font-semibold text-gray-800">Name your workspace</p>
        </div>
        <div className="">
          <Controller
          control={control}
          name="Roomcreator"
          defaultValue=""
          rules={{required:"workspace name required",validate:(value)=>{if (value.startsWith(" ")) return "workspace cannot with space"}}}
          render={({field,fieldState})=>(
            <>
            <CustomInput {...field}/>
            {fieldState.error && (
              <p className="text-red-500">{fieldState.error.message}</p>
            )}
          </>
          )}
          />
        </div>
    
          <button disabled={isSubmitting}  className="bg-blue-700 px-30 py-4 text-white font-semibold rounded-2xl cursor-pointer" type="submit">{isSubmitting ?<Loader className="animate-spin"/>:"Create room" }</button>
        </form>
      </div>
    </div>
  )
}

const CustomInput=({value,onChange}:any)=>{
  return(
    <input
     value={value} 
     onChange={(e)=>onChange(e.target.value)}
     placeholder="name"
     className="px-6 py-4 border-2 border-gray-500 outline-none rounded-xl"
    />
  )
}