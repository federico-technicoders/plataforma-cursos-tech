import Image from "next/image";

export default function Home() {
    
    return (
        <main className="flex flex-col items-center justify-between w-full min-h-screen">
            <section className="relative felx flex-col justify-start items-start w-full h-screen overflow-hidden" id="hero">
                {/* <div className="absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2 z-10 ">
                    <h1 className="item text-9xl font-extrabold uppercase whitespace-nowrap text-center">TECHNICODERS - convierte tu sueño en empresa</h1>
                    
                </div> */}

                <div class="wrapper">
                    <h1 class="item item1">TECHNICODERS - </h1>
                    <h1 class="item item2">TECHNICODERS - </h1>
                    <h1 class="item item3">TECHNICODERS - </h1>
                    <h1 class="item item4">TECHNICODERS - </h1>
                    <h1 class="item item5">TECHNICODERS - </h1>
                    <h1 class="item item6">TECHNICODERS - </h1>
                    <h1 class="item item7">TECHNICODERS - </h1>
                    <h1 class="item item8">TECHNICODERS - </h1>
                
                </div> 
               
                <div className="flex gap-2 justyfy-center items-center h-1/3 w-full bg-slate-600 p-3">
                    {/* <div className="relative w-[20%] h-full">
                        <Image src="/pig.webp"alt="hero" layout="fill" objectFit="cover"  />
                    </div>
                    <div className="relative w-[20%] h-full">
                        <Image src="/pig.webp"alt="hero" layout="fill" objectFit="cover"  />
                    </div>
                    <div className="relative w-[20%] h-full">
                        <Image src="/pig.webp"alt="hero" layout="fill" objectFit="cover"  />
                    </div>
                    <div className="relative w-[20%] h-full">
                        <Image src="/pig.webp"alt="hero" layout="fill" objectFit="cover"  />
                    </div>
                    <div className="relative w-[20%] h-full">
                        <Image src="/pig.webp"alt="hero" layout="fill" objectFit="cover"  />
                    </div> */}
                </div>
                <div className="flex gap-2 justyfy-center items-center h-1/3 w-full bg-slate-400 p-3">
                
                </div> 
                <div className="flex gap-2 justyfy-center items-center h-1/3 w-full bg-slate-200 p-3">
                
                </div>
            </section>
        </main>
    );
}
