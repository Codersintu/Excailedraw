import { BACKEND_URL } from "@repo/backend-common/config";
import axios from "@/lib/axios";
import { Cross, CrossIcon, Loader, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
type FormValues = {
  ReactDatepicker: string,
  Roomcreator: string
}
export default function RoomForm({setShow}:any) {
  const router = useRouter();
  const { handleSubmit, control, formState: { isSubmitting } } = useForm<FormValues>()
  const onSubmit = async (data: FormValues) => {
    const res = await axios.post(`${BACKEND_URL}/api/v1/room`, {
      name: data.Roomcreator,
    });
    router.push(`/canvas/${res.data.room.id}`);
  };
  return (
    <div className="flex justify-center items-center absolute inset-0 z-50 bg-white/40 ">
      <div className="max-w-2xl flex shadow-2xl bg-white px-10 py-10 rounded-2xl">

        <form className="flex flex-col justify-center items-center gap-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center w-full">
            <Pencil className="w-12 h-12 text-blue-700" />
            <svg onClick={()=>setShow(false)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6 flex items-end justify-end cursor-pointer" viewBox="0 0 50 50">
              <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold">Name your workspace:</div>
          <div className="">
            <Controller
              control={control}
              name="Roomcreator"
              defaultValue=""
              rules={{ required: "workspace name required", validate: (value) => { if (value.startsWith(" ")) return "workspace cannot with space" } }}
              render={({ field, fieldState }) => (
                <>
                  <CustomInput {...field} />
                  {fieldState.error && (
                    <p className="text-red-500">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <button disabled={isSubmitting} className="bg-blue-700 px-30 py-4 text-white font-semibold rounded-2xl cursor-pointer" type="submit">{isSubmitting ? <Loader className="animate-spin" /> : "Create room"}</button>
        </form>
      </div>
    </div>
  )
}

const CustomInput = ({ value, onChange }: any) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="name"
      className="px-6 py-4 border-2 border-cyan-500 outline-none rounded-xl"
    />
  )
}