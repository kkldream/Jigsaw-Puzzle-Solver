import {useState} from "react";
import {ImageViewer} from "@/app/_components/ImageViewer";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchResult({resultImages}: { resultImages: { name: string; base64Url: string; }[] }) {
    const [currentTab, setCurrentTab] = useState<number>(0);

    function handleClick(index: number) {
        setCurrentTab(index);
    }

    const tabs = resultImages.map((resultImage, index) => ({
        name: resultImage.name,
        href: resultImage.base64Url,
        current: index === currentTab,
    }));
    return resultImages.length === 0 ? <div className="pb-4"></div> : (
        <div>
            <div className="px-6 pb-4">
                <div className="mt-4 mb-2 mx-auto max-w-2xl text-center">
                    <p className={`text-2xl sm:text-base font-bold tracking-tight text-gray-900`}>
                        {`結果${resultImages[currentTab].name}`}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="w-11/12">
                        <ImageViewer src={resultImages[currentTab].base64Url} alt=""/>
                        <div className={(resultImages.length <= 1 ? "hidden" : "mt-2")}>
                            <div className="sm:hidden">
                                <label htmlFor="tabs" className="sr-only">
                                    Select a tab
                                </label>
                                <select
                                    id="tabs"
                                    name="tabs"
                                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => handleClick(e.target.options.selectedIndex)}
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
            </div>


        </div>
    );
}
