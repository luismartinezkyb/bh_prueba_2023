export const handleHttpError = (res, message = "Something Happend", code = 403) =>{
    console.log(code, message)
    res.status(code);
    res.send({error: message});
}
