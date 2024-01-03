export const checkError = (data:any,setIsError:any) => {
    for (const item of data ){
        if(item?.isError){
            setIsError(true)
           return
        }
    }
}