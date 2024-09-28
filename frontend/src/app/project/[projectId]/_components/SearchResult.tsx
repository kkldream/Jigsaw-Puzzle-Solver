import {Image, ImageHeaderText} from "@/app/project/[projectId]/page";
import {useState} from "react";

const tabs = [
    {name: 'My Account', href: '#', current: false},
    {name: 'Company', href: '#', current: false},
    {name: 'Team Members', href: '#', current: true},
    {name: 'Billing', href: '#', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const resultImages = [
    {
        name: "原始圖",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png",
    },
    {
        name: "分布圖",
        src: "https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA=",
    },
];

export default function SearchResult() {
    const [currentTab, setCurrentTab] = useState<number>(0);

    function handleClick(index: number) {
        setCurrentTab(index);
    }

    const tabs = resultImages.map((resultImage, index) => ({
        name: resultImage.name,
        href: resultImage.src,
        current: index === currentTab,
    }));
    return (
        <div>
            <div className="px-6 pb-4">
                <ImageHeaderText text={`結果${resultImages[currentTab].name}`}/>
                <Image src={resultImages[currentTab].src}/>
                <div className={(resultImages.length <= 1 ? "hidden" : "mt-2")}>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                            Select a tab
                        </label>
                        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                        <select
                            id="tabs"
                            name="tabs"
                            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <nav className="flex space-x-4" aria-label="Tabs">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab.name}
                                    className={classNames(
                                        tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={() => handleClick(index)}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>


        </div>
    );
}
