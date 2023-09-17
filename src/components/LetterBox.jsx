/* eslint-disable react/prop-types */

export default function LetterBox({letter}) {
    return (
        <div className="border-2 h-10 w-10 flex justify-center items-center font-bold text-2xl text-blue-200">
            {letter}
        </div>
    )
}
