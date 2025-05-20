import bookItLogo from '../assets/BookIt.png'

export default function NavBar() {
    return <div className="bg-slate-800 flex align-middle justify-between p-4">
        <h2 className=''><img width={70} src={bookItLogo} alt="BookIt logo" /></h2>
        <div className="flex align-middle justify-center">
        Some other content
        </div>
    </div>
}