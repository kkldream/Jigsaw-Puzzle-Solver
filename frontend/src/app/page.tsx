import ProjectSelectImages from "@/app/_components/ProjectSelectImages";

export default function Home() {
    return (
        <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        <span className="text-red-600">J</span>
                        igsaw P
                        <span className="text-red-600">u</span>
                        zz
                        <span className="text-red-600">l</span>
                        e S
                        <span className="text-red-600">o</span>
                        lver
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo Julo.
                    </p>
                </div>
                <div className="mt-16 flow-root sm:mt-24">
                    <div
                        className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <ProjectSelectImages max={4}/>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/project" className="text-sm font-semibold leading-6 text-gray-900">
                        View More Projects <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
