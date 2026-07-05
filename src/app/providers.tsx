import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

type Props={
    children:React.ReactNode
}

export function Providers({children}:Props){

    return(
        <BrowserRouter>

            {children}

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </BrowserRouter>
    )
}