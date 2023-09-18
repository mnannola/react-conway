function Button({text, bgColor, handleClick}: {text: string, bgColor: string, handleClick: () => void}) {
    return (
        <button
            className={`bg-${bgColor} py-2 px-4 my-2 mx-2 rounded`}
            onClick={() => handleClick()}
            >{text}</button>
    )
}

export { Button };