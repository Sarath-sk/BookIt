// import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
// import type { AppDispatch } from "../store/store";

interface IMainProps {
      children: React.ReactNode;
    }

export function Main({children}: IMainProps){
    //   const dispatch = useDispatch<AppDispatch>();


    
    return <div className='flex flex-col'>
                <NavBar />
                {children}
    </div>
}