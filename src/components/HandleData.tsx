import { SocialNetwork, UserHandler } from "../types"

type HandleDataProps = {
    data: UserHandler
}

export const HandleData = ( {data}: HandleDataProps ) => {

    const links : SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);

    console.log(links);
    
  return (
    <div className="space-y-6 text-white">
        <p className="text-5xl text-center font-black" >{data.handle}</p>
        {data.image && <img className="w-32 h-32 mx-auto" src={data.image} alt={data.handle} />}
        <p className="text-lg text-center font-bold" >{data.description}</p>
        <div className="mt-20 flex flex-col gap-6" >
            {links.length ?
            links.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noreferrer noopener" className="bg-white px-5 py-2 flex items-center rounded-lg">
                    <img src={`/social/icon_${link.name}.svg`} alt="image red social"  className="w-10 pr-3"/>
                    <p className="text-black capitalize font-bold text-lg" >Visita mi: {link.name}</p>
                </a>
            ))
            : <p className="text-center">No hay enlaces</p> 
        }
        </div>
    </div>
  )
}
