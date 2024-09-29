"use client";

import React, {useEffect, useState} from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default function SimpleGallery({ id, images, objectFit }) {
    const [imageSizes, setImageSizes] = useState([]);

    useEffect(() => {
        // 初始化Lightbox
        let lightbox = new PhotoSwipeLightbox({
            gallery: '#' + id,
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, [id]);

    useEffect(() => {
        // 當`images`變更時，讀取圖片寬度和高度
        const newImageSizes = images.map((image) => {
            const img = new Image();
            img.src = image.largeURL;

            return new Promise((resolve) => {
                img.onload = () => {
                    resolve({
                        largeURL: image.largeURL,
                        thumbnailURL: image.thumbnailURL,
                        width: img.width,
                        height: img.height,
                    });
                };
            });
        });

        Promise.all(newImageSizes).then((sizes) => {
            setImageSizes(sizes);
        });
    }, [images]);

    return (
        <div className="pswp-gallery w-full h-full" id={id}>
            {imageSizes.map((image, index) => (
                <a
                    className={index === 0 ? "" : "hidden"}
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={id + '-' + index}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img className={`object-${objectFit || "cover"} w-full h-full`} src={image.thumbnailURL || image.largeURL} alt=""/>
                </a>
            ))}
        </div>
    );
}
