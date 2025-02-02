import { Link } from "react-router-dom";

export default function LoginView() {
    return (
        <>

            <h1 className="text-4xl text-white font-bold" >Inciar Sesion</h1>

            <nav className="mt-10">

                <Link to="/auth/register" className="text-center text-white text-lg block">
                    No tienes cuenta? Registrate
                </Link>

            </nav>

        </>
    );
}