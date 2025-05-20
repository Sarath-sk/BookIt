import NavBar from "./NavBar";

interface IMainProps {
      children: React.ReactNode;
    }

export function Main({children}: IMainProps){
    return <div className='flex flex-col'>
                <NavBar />
                {children}
    </div>
}