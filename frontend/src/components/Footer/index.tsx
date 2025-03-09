export function Footer(){
    const currentYear: number = new Date().getFullYear();

    return(
        <footer className="p-3 text-center bg-gray-200 border-t border-gray-300">
            <span className="m-0 text-sm font-semibold">Copyright &copy; <time>{currentYear}</time> Gabriel Marreiros - Todos os direitos reservados.</span>
        </footer>
    )
}