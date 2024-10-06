export default function ImageHeaderText(props: { text: string; }) {
    return (
        <div className="mt-4 mb-2 mx-auto max-w-2xl text-center">
            <p className={`text-2xl sm:text-base font-bold tracking-tight text-gray-900`}>
                {props.text}
            </p>
        </div>
    );
}
