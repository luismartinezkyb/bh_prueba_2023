import { toast } from "react-toastify"

const generateError = (err) => toast.error(err, {
    position:"bottom-right",
})

const generateSuccess = (msg) => toast.success(msg, {
    position:"bottom-right",
    
})


export {generateError, generateSuccess}