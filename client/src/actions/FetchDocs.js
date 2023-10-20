import axios from "axios";


export const fetchDocs = async(setState,user)=>{
    // api call to backend for fetching saved docs in db.
    try {
        const response = await axios.get('http://localhost:8001/qrcodes',{
            params:{
                email:user
            }
        });
        setState(response.data.data);
        console.log(response.data.data);
    } catch (error) {
        console.log("Error : ",error);
    }

}
