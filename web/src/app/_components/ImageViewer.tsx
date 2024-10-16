"use client";

import 'photoswipe/dist/photoswipe.css'
import {Gallery, Item} from 'react-photoswipe-gallery'
import Link from "next/link";
import NextImg from "next/image";
import {useEffect, useState} from "react";

export function ImageViewer(props: { src: string; width?: number; height?: number; alt: string; href?: string; }) {
    const [imageSize, setImageSize] = useState<{ width: number; height: number; } | null>(
        !!props.width && !!props.height ? {width: props.width, height: props.height} : null);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageSize({width: img.width, height: img.height});
        img.src = props.src;
    }, [props.src]);

    const element = (
        <div className="group aspect-w-10 aspect-h-7 overflow-hidden rounded-lg bg-gray-100">
            <div className="flex flex-col justify-center">
                {imageSize ? (
                    <button className="group-hover:opacity-90">
                        {props.href ? (
                            <NextImg className="w-full"
                                     src={props.src}
                                     width={imageSize.width}
                                     height={imageSize.height}
                                     alt={props.alt}/>
                        ) : (
                            <Gallery>
                                <Item original={props.src} width={imageSize.width} height={imageSize.height}>
                                    {({ref, open}) => (
                                        <NextImg className="w-full"
                                                 ref={ref}
                                                 onClick={open}
                                                 src={props.src}
                                                 width={imageSize.width}
                                                 height={imageSize.height}
                                                 alt={props.alt}/>
                                    )}
                                </Item>
                            </Gallery>
                        )}
                    </button>
                ) : (
                    <div className="text-center">圖片載入中...</div>
                )}
            </div>
        </div>
    );

    return props.href ? (
        <Link href={props.href}>
            {element}
        </Link>
    ) : element;
}
