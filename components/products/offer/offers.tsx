import React from "react";
import {Offer} from "../../../types";
import {OfferItem} from "./offer-item";
type OfferProps = {
     offers: Offer[];
}
const ActiveOffers =(props: OfferProps) =>{
     let {offers } = props;
     const items = offers
         .map((offer) =>
             <OfferItem
                 key={offer.slug}
                 offer={offer}
             />
         );
     return <div>
          <section className="ratio_asos section-b-space top-spacing--lg">
               <div className="container">
                    <div className="d-flex">
                         <div className="flex-fill"><hr/></div>
                         <div className="ml-4 mr-4 font-weight-bold">Offers</div>
                         <div className="flex-fill"><hr/></div>
                    </div>
                    <div className= "row">
                         {items}
                    </div>

               </div>
          </section>
     </div>
}

export default  ActiveOffers;
