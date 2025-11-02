import  {type RawAxiosRequestHeaders} from "axios";

export const axiosConfig = () => {
    return {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } as RawAxiosRequestHeaders
    }
};
