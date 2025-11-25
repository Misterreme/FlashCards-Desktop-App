type Card = {
    id: string
    title: string
    text: string
}

type Props = {
    currentCard: Card
}

function StudyCard({ currentCard }: Props) {
    return (
        <div className="w-150 h-90 max-[700px]:h-[70dvh] perspective-[1000px] bg-transparent cursor-pointer group">
            <div className="hover:rotate-y-180 w-full h-full transition-all duration-1000 transform-3d relative rounded-xl shadow-sm">
                <div className="w-full h-full bg-white dark:bg-dark-card dark:text-dark-text-primary shadow-xl absolute backface-hidden rounded-xl px-8 py-5 flex flex-col items-center justify-center gap-2 overflow-y-auto overflow-x-hidden">
                    { currentCard && (
                        <p className="mt-10 w-full text-center text-wrap wrap-break-word">
                            { currentCard.title }
                        </p>
                    ) }
                </div>
                <div className="rotate-y-180 w-full h-full bg-blue-50 dark:bg-brand-200 dark:text-black border-2 border-blue-200 absolute backface-hidden rounded-xl p-8 flex flex-col items-center justify-center gap-2">
                    { currentCard && (
                        <p className="mt-10 w-full text-center text-wrap wrap-break-word">
                            { currentCard.text }
                        </p>
                    ) }
                </div>
            </div>
        </div>
    );
}

export default StudyCard;