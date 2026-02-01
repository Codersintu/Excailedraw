
import RoomCanvas from "@/component/RoomCanvas"
export default async function canvas({params}:{
    params:{
        roomId:string
    }
}){
    const roomId=(await params).roomId
    console.log(roomId)
    return <RoomCanvas roomId={roomId}/>
}