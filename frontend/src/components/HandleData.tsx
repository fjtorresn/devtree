import type { UserHandle, SocialNetwork } from "../types";

type HandleDataProps = {
    data: UserHandle;
};
export default function HandleData({ data }: HandleDataProps) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter(
        (link: SocialNetwork) => link.enabled
    );
    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center"> {data.handle} </p>
            {data.image && (
                <img src={data.image} className="max-w-[250px] mx-auto" />
            )}

            <p className="text-center text-lg font-boldk">
                {data.description}{" "}
            </p>
            <div className="mt-20 flex flex-col gap-6">
                {links.length ? (
                    links.map((link) => (
                        <a
                            className="bg-white px-5 py-2 flex items-center rounded-lg gap-5"
                            href={link.url}
                            key={link.id}
                            target="_blank"
                            rel="nonreferrer noopener"
                        >
                            <img
                                src={`/social/icon_${link.name}.svg`}
                                className="w-12"
                                alt="Imagen red social"
                            />
                            <p className="text-black capitalize font-bold text-lg">
                                Visita mi: {link.name}
                            </p>
                        </a>
                    ))
                ) : (
                    <p className="text-center text-white">
                        No hay enlaces disponibles.
                    </p>
                )}
            </div>
        </div>
    );
}
