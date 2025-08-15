import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"
import { getUserByHandler } from "../api/DevTreeAPI";
import { HandleData } from "../components/HandleData";

const HandleView = () => {

  const params = useParams();
  const handle = params.handle!;

  const { data, error, isLoading } = useQuery({ 
    queryFn: () => getUserByHandler(handle),
    queryKey: [ 'handle', handle ],
    retry: 1,
   })

   if( isLoading ) return <div className="text-center text-white text-2xl" >Loading...</div>
   if( error ) return <Navigate to={'/404'} />
   
   if( data ) return <HandleData data={data} />
   
}

export default HandleView