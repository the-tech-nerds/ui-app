
import React from "react";
import Image from "../../image/image";
import {Offer} from "../../../types";
import Link from "next/link";
import offers from "./offers";

type OfferProp = {
    offer: Offer;
}
export const OfferItem = (props: OfferProp) =>{
    const {offer} = props;
    return <div className="d-flex flex-row offer-item mb-3 mr-2">
        <div className="p-2 flex-column card hover-item">
            <Link
                href={{
                    pathname: "/views/offer/detail",
                    query: { offer: offer.slug },
                }}
                as={`/offer/detail/${offer?.slug}`}
            >
                <div className="front">
                    <Image
                        src= {offer?.image? offer.image : ""}
                        height={150}
                        alt= {offer.name}
                        fullWidth
                    />
                </div>
            </Link>

            <div className="text-center mt-2 ">
                <strong>{offer.name} </strong>
            </div>
            <div className="text-center mt-1">
                {offer.total_price} taka
            </div>
            <div className="text-center mt-2">
                <button className="btn btn-success btn-lg w-full">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
}
