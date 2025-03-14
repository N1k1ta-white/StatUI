type Props = {
  message: string
}

export default function ErrorPage({message}: Props) {
    return (
        <div>Грешка: {message}</div>
    )
}