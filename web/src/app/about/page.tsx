export default function Page() {
    return (
        <div className="px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-base font-semibold leading-7 text-indigo-600">About the project</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        About Jigsaw Puzzle Solver
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Jigsaw Puzzle Solver is a puzzle-assistance web app built for the moment when you have one
                        loose piece in hand and need help figuring out where it belongs. Instead of scanning the entire
                        puzzle by eye, you upload a photo of the partial piece and compare it against a saved image of
                        the complete puzzle.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">What it does</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            Each project begins with a reference image of the full puzzle. Once that image is saved,
                            you can upload a partial-piece photo and let the app generate visual matching outputs that
                            help narrow down the piece location.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Who it is for</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            The app is useful for puzzle hobbyists, families working on large puzzles together, and
                            anyone who wants a repeatable workflow for checking difficult pieces without losing track of
                            progress.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Why it is practical</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            Instead of relying on memory alone, the project keeps your reference image, project list,
                            and result images together so you can return to the same puzzle later and continue from the
                            browser.
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
                    <section className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">How the workflow works</h3>
                        <ol className="mt-6 space-y-4 text-sm leading-6 text-gray-600">
                            <li>1. Create a project and upload the complete puzzle image.</li>
                            <li>2. Open the project when you want to inspect a specific puzzle piece.</li>
                            <li>3. Upload a photo of the partial puzzle piece or local puzzle area.</li>
                            <li>4. Review the generated result images, including feature distribution and matching.</li>
                            <li>5. Use those visual cues to decide where the piece most likely belongs.</li>
                        </ol>
                    </section>

                    <section className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">Technical approach</h3>
                        <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-600">
                            <li>Next.js powers the web interface and API routes.</li>
                            <li>MongoDB stores project records and image metadata.</li>
                            <li>AWS S3 stores uploaded puzzle images.</li>
                            <li>Python with OpenCV and SIFT performs the image feature analysis.</li>
                            <li>Docker, GitHub Actions, and Kubernetes support build and deployment workflows.</li>
                        </ul>
                    </section>
                </div>

                <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">What you can expect from the results</h3>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        The solver does not simply return a single text answer. It produces result images that make the
                        matching process easier to inspect, including views that show how image features are distributed
                        and how the uploaded piece aligns with the reference puzzle. That makes the app useful both as a
                        practical helper and as a transparent visual aid when the match is not obvious at first glance.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        In short, Jigsaw Puzzle Solver is designed to turn a frustrating manual search task into a
                        structured, repeatable workflow that combines image processing with a lightweight project
                        management interface.
                    </p>
                </div>
            </div>
        </div>
    );
}
