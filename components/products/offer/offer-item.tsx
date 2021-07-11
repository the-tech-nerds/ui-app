
import React from "react";
import Image from "../../image/image";
import {Offer} from "../../../types";

type OfferProp = {
    offer: Offer;
}
export const OfferItem = (props: OfferProp) =>{
    const {offer} = props;
    const item = <div className="d-flex flex-row offer-item mb-3 mr-2">
        <div className="p-2 flex-column card hover-item">
            <Image
                src= {offer.image}
                height={200}
                width={250}
                alt= {offer.name}
            />
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
    return item;
}
