

interface ErrorMessage {
    children: React.ReactNode 
}

export default function ErrorMessage({children}: ErrorMessage) {
  return (
    <p className="bg-red-50 text-red-600 p-2 text-sm uppercase font-bold rounded-lg">{children}</p>
  )
}
